import { list } from "@keystone-6/core";
import { allowAll } from "@keystone-6/core/access";
import { integer, relationship, timestamp } from "@keystone-6/core/fields";

const CartItem = list({
    access: allowAll,
    ui: {
        listView: {
            initialColumns: ['product', 'quantity', 'user'],
        },
    },
    fields: {
        quantity: integer({
            defaultValue: 1,
            validation: {
                isRequired: true
            }
        }),
        product: relationship({ ref: 'Product' }),
        user: relationship({ ref: 'User.cart' }),
    },
});

export default CartItem