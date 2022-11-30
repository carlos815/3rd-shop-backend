import { graphql, list } from "@keystone-6/core";
import { allowAll } from "@keystone-6/core/access";
import { integer, relationship, text, virtual } from "@keystone-6/core/fields";
import formatMoney from "../lib/formatMoney";

const OrderItem = list({
    access: allowAll,
    fields: {
        name: text({ validation: { isRequired: true } }),
        description: text({
            ui: {
                displayMode: 'textarea',
            },
        }),
        photo: relationship({
            ref: 'ProductImage',
            ui: {
                displayMode: 'cards',
                cardFields: ['image', 'altText'],
                inlineCreate: { fields: ['image', 'altText'] },
                inlineEdit: { fields: ['image', 'altText'] },
            },
        }),
        price: integer(),
        quantity: integer(),
        productId: text(),
        order: relationship({ ref: 'Order.items' }),
    },
})

export default OrderItem