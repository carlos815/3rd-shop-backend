import { graphql, config } from '@keystone-6/core';
import { Context } from '.keystone/types';
import { relationship } from '@keystone-6/core/fields';

const addToCart = (base) => graphql.field({
    type: base.object('CartItem'),
    args: { id: graphql.arg({ type: graphql.nonNull(graphql.ID) }) },
    async resolve(source, { id }, context: Context) {
        //check if the user is logged in. If not, return an error
        const session = context.session;
        if (!session.itemId) {
            throw new Error('No user logged in');
        }

        //Find a cart item that matches the product Id AND the logged in user
        const cartItems = await context.db.CartItem.findMany({
            where: { user: { id: { equals: session.itemId } }, product: { id: { equals: id } } },
        });

        //It should return either an array with a single element OR undefined
        const [cartItem] = cartItems

        if (cartItem) {
            //Item found. Increase the quantity by one
            return context.db.CartItem.updateOne({
                where: { id: cartItem.id },
                data: { quantity: cartItem.quantity + 1 },
            });

        } else {
            //Item not found. Create one. 
            return context.db.CartItem.createOne({
                data: {
                    product: {
                        connect: { id: id }
                    },
                    user: {
                        connect: { id: session.itemId }
                    },
                    // quantity: 1 //Optional. Default is 1
                }
            })
        }
    },
})
export default addToCart