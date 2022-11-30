import { graphql, config } from '@keystone-6/core';
import { Context } from '.keystone/types';
import { relationship } from '@keystone-6/core/fields';
import stripeConfig from '../lib/stripe';

const checkout = (base) => graphql.field({
    type: base.object('CartItem'),
    args: { token: graphql.arg({ type: graphql.nonNull(graphql.String) }) },
    // 1. Make sure they are signed in
    async resolve(source, { token }, context: Context) {
        //check if the user is logged in. If not, return an error
        const session = context.session;
        if (!session.itemId) {
            throw new Error('You must be logged in to create an order. Sorry not sorry.');
        }

        //Query the current user
        const user = await context.query.User.findOne({
            where: { id: session.itemId },
            query: `id
                    name
                    email
                    orders {
                        id
                    }
                    cart {
                        id
                        quantity
                        product {
                        name
                        price
                        description
                        id
                        photo {
                            id
                            image {
                            id
                            publicUrlTransformed
                            }
                        }
                        }
                    }`,
        });

        // 2. calc the total price for their order
        const totalOrder = user.cart.reduce((accumulator, cartItem) => {
            const amountCartItem = cartItem.quantity * cartItem.product.price
            return accumulator + amountCartItem
        }, 0)

        // 3. create the charge with the stripe library

        const charge = await stripeConfig.paymentIntents.create({
            amount: totalOrder,
            currency: 'USD',
            confirm: true,
            payment_method: token,
        }).catch(err => {
            //  console.log(err);
            throw new Error(err.message);
        });

        //Create an order based on the cart item
        const orderItems = user.cart.map((cartItem) => {
            return {
                name: cartItem.product.name,
                description: cartItem.product.description,
                price: cartItem.product.price,
                quantity: cartItem.quantity,
                productId: cartItem.product.id,
                photo: { connect: { id: cartItem.product.photo[0].id } },
            }
        })
        const now = new Date
        const order = await context.db.Order.createOne({
            data: {
                total: charge.amount,
                items: { create: orderItems },
                user: { connect: { id: user.id } },
                charge: charge.id,
                createdAt: now.toISOString(),
            },
        });
        // //Clean up! Delete all cart items
        await context.db.CartItem.deleteMany({
            where: user.cart.map(cartItem => { return { id: cartItem.id } })
        })
        return order
    }
})
export default checkout