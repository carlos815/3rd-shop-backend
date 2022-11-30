import { graphql, list } from "@keystone-6/core";
import { allowAll, allOperations } from "@keystone-6/core/access";
import { integer, relationship, text, timestamp, virtual } from "@keystone-6/core/fields";
import { isSignedIn, permissions } from "../access";
import formatMoney from "../lib/formatMoney";

const Order = list({
    access: {
        filter: {
            query: async ({ session, context, listKey, operation }) => {
                if (isSignedIn(session)) return false
                if (permissions.canManageOrders(session)) return true
                return { user: { id: { equals: session.itemId } } };
            },
            update: ({ session, context, listKey, operation }) => {
                if (!isSignedIn(session)) return false
                if (permissions.canManageOrders) return true
                return { user: { id: { equals: session.itemId } } };
            },
            delete: async ({ session, context, listKey, operation }) => {
                if (!isSignedIn(session)) return false
                if (permissions.canManageOrders) return true
                return { user: { id: { equals: session.itemId } } };
            },
        },
        operation: {
            query: ({ session, context, listKey, operation }) => true,
            create: ({ session, context, listKey, operation }) => true,
            update: ({ session, context, listKey, operation }) => true,
            delete: ({ session, context, listKey, operation }) => true,
        },

    },
    fields: {
        label: virtual({
            field: graphql.field({
                type: graphql.String,
                resolve(item) {
                    return `${formatMoney(item.total)}`;
                },
            })
        }),
        total: integer(),
        items: relationship({ ref: 'OrderItem.order', many: true }),
        user: relationship({ ref: 'User.orders' }),
        charge: text(),
        createdAt: timestamp(),
    },
})

export default Order