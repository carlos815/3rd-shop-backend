"use strict";
var __create = Object.create;
var __defProp = Object.defineProperty;
var __getOwnPropDesc = Object.getOwnPropertyDescriptor;
var __getOwnPropNames = Object.getOwnPropertyNames;
var __getProtoOf = Object.getPrototypeOf;
var __hasOwnProp = Object.prototype.hasOwnProperty;
var __export = (target, all) => {
  for (var name in all)
    __defProp(target, name, { get: all[name], enumerable: true });
};
var __copyProps = (to, from, except, desc) => {
  if (from && typeof from === "object" || typeof from === "function") {
    for (let key of __getOwnPropNames(from))
      if (!__hasOwnProp.call(to, key) && key !== except)
        __defProp(to, key, { get: () => from[key], enumerable: !(desc = __getOwnPropDesc(from, key)) || desc.enumerable });
  }
  return to;
};
var __toESM = (mod, isNodeMode, target) => (target = mod != null ? __create(__getProtoOf(mod)) : {}, __copyProps(
  isNodeMode || !mod || !mod.__esModule ? __defProp(target, "default", { value: mod, enumerable: true }) : target,
  mod
));
var __toCommonJS = (mod) => __copyProps(__defProp({}, "__esModule", { value: true }), mod);

// keystone.ts
var keystone_exports = {};
__export(keystone_exports, {
  default: () => keystone_default
});
module.exports = __toCommonJS(keystone_exports);

// schemas/Product.ts
var import_core = require("@keystone-6/core");
var import_fields = require("@keystone-6/core/fields");
var import_access = require("@keystone-6/core/access");
var Product = (0, import_core.list)({
  access: import_access.allowAll,
  fields: {
    name: (0, import_fields.text)({ validation: { isRequired: true } }),
    subtitle: (0, import_fields.text)(),
    description: (0, import_fields.text)(
      {
        ui: {
          displayMode: "textarea"
        }
      }
    ),
    photo: (0, import_fields.relationship)({
      many: true,
      ref: "ProductImage.product",
      ui: {
        displayMode: "cards",
        cardFields: ["image", "altText"],
        inlineCreate: { fields: ["image", "altText"] },
        inlineEdit: { fields: ["image", "altText"] }
      }
    }),
    status: (0, import_fields.select)({
      options: [
        { label: "Draft", value: "DRAFT" },
        { label: "Available", value: "AVAILABLE" },
        { label: "Unavailable", value: "UNAVAILABLE" }
      ],
      defaultValue: "DRAFT",
      ui: {
        displayMode: "segmented-control",
        createView: { fieldMode: "hidden" }
      }
    }),
    price: (0, import_fields.integer)(),
    user: (0, import_fields.relationship)({
      ref: "User.products"
    })
  }
});
var Product_default = Product;

// schemas/User.ts
var import_core2 = require("@keystone-6/core");
var import_access2 = require("@keystone-6/core/access");
var import_fields2 = require("@keystone-6/core/fields");
var User = (0, import_core2.list)({
  access: import_access2.allowAll,
  fields: {
    name: (0, import_fields2.text)({ validation: { isRequired: true } }),
    email: (0, import_fields2.text)({
      validation: { isRequired: true },
      isIndexed: "unique"
    }),
    password: (0, import_fields2.password)({ validation: { isRequired: true } }),
    orders: (0, import_fields2.relationship)({ ref: "Order.user", many: true }),
    products: (0, import_fields2.relationship)({ ref: "Product.user", many: true }),
    cart: (0, import_fields2.relationship)({ ref: "CartItem.user", many: true }),
    role: (0, import_fields2.relationship)({
      ref: "Role.assignedTo"
    }),
    createdAt: (0, import_fields2.timestamp)({
      defaultValue: { kind: "now" }
    })
  }
});
var User_default = User;

// schemas/ProductImage.ts
var import_core3 = require("@keystone-6/core");
var import_access3 = require("@keystone-6/core/access");
var import_fields3 = require("@keystone-6/core/fields");
var import_config = require("dotenv/config");
var import_cloudinary = require("@keystone-6/cloudinary");
var ProductImage = (0, import_core3.list)({
  access: import_access3.allowAll,
  fields: {
    image: (0, import_cloudinary.cloudinaryImage)({
      cloudinary: {
        cloudName: process.env.CLOUDINARY_CLOUD_NAME || "",
        apiKey: process.env.CLOUDINARY_KEY || "",
        apiSecret: process.env.CLOUDINARY_SECRET || "",
        folder: "3rd-shop"
      },
      label: "Source"
    }),
    altText: (0, import_fields3.text)(),
    product: (0, import_fields3.relationship)({ ref: "Product.photo" })
  },
  ui: {
    listView: {
      initialColumns: ["image", "altText", "product"]
    }
  }
});
var ProductImage_default = ProductImage;

// schemas/CartItem.ts
var import_core4 = require("@keystone-6/core");
var import_access4 = require("@keystone-6/core/access");
var import_fields4 = require("@keystone-6/core/fields");
var CartItem = (0, import_core4.list)({
  access: import_access4.allowAll,
  ui: {
    listView: {
      initialColumns: ["product", "quantity", "user"]
    }
  },
  fields: {
    quantity: (0, import_fields4.integer)({
      defaultValue: 1,
      validation: {
        isRequired: true
      }
    }),
    product: (0, import_fields4.relationship)({ ref: "Product" }),
    user: (0, import_fields4.relationship)({ ref: "User.cart" })
  }
});
var CartItem_default = CartItem;

// schemas/OrderItem.ts
var import_core5 = require("@keystone-6/core");
var import_access5 = require("@keystone-6/core/access");
var import_fields5 = require("@keystone-6/core/fields");
var OrderItem = (0, import_core5.list)({
  access: import_access5.allowAll,
  fields: {
    name: (0, import_fields5.text)({ validation: { isRequired: true } }),
    description: (0, import_fields5.text)({
      ui: {
        displayMode: "textarea"
      }
    }),
    photo: (0, import_fields5.relationship)({
      ref: "ProductImage",
      ui: {
        displayMode: "cards",
        cardFields: ["image", "altText"],
        inlineCreate: { fields: ["image", "altText"] },
        inlineEdit: { fields: ["image", "altText"] }
      }
    }),
    price: (0, import_fields5.integer)(),
    quantity: (0, import_fields5.integer)(),
    productId: (0, import_fields5.text)(),
    order: (0, import_fields5.relationship)({ ref: "Order.items" })
  }
});
var OrderItem_default = OrderItem;

// schemas/Order.ts
var import_core6 = require("@keystone-6/core");
var import_fields8 = require("@keystone-6/core/fields");

// schemas/fields.ts
var import_fields6 = require("@keystone-6/core/fields");
var permissionFields = {
  canManageProducts: (0, import_fields6.checkbox)({
    defaultValue: false,
    label: "User can Update and delete any product"
  }),
  canSeeOtherUsers: (0, import_fields6.checkbox)({
    defaultValue: false,
    label: "User can query other users"
  }),
  canManageUsers: (0, import_fields6.checkbox)({
    defaultValue: false,
    label: "User can Edit other users"
  }),
  canManageRoles: (0, import_fields6.checkbox)({
    defaultValue: false,
    label: "User can CRUD roles"
  }),
  canManageCart: (0, import_fields6.checkbox)({
    defaultValue: false,
    label: "User can see and manage cart and cart items"
  }),
  canManageOrders: (0, import_fields6.checkbox)({
    defaultValue: false,
    label: "User can see and manage orders"
  })
};
var permissionsList = Object.keys(
  permissionFields
);

// access.ts
function isSignedIn({ session: session2 }) {
  return !!session2;
}
var generatedPermissions = Object.fromEntries(
  permissionsList.map((permission) => [
    permission,
    function({ session: session2 }) {
      return !!session2?.data.role?.[permission];
    }
  ])
);
var permissions = {
  ...generatedPermissions
};

// lib/formatMoney.ts
var formatter = new Intl.NumberFormat("en-US", {
  style: "currency",
  currency: "USD"
});
function formatMoney(cents) {
  const dollars = cents / 100;
  return formatter.format(dollars);
}

// schemas/Order.ts
var Order = (0, import_core6.list)({
  access: {
    filter: {
      query: async ({ session: session2, context, listKey, operation }) => {
        if (isSignedIn(session2))
          return false;
        if (permissions.canManageOrders(session2))
          return true;
        return { user: { id: { equals: session2.itemId } } };
      },
      update: ({ session: session2, context, listKey, operation }) => {
        if (!isSignedIn(session2))
          return false;
        if (permissions.canManageOrders)
          return true;
        return { user: { id: { equals: session2.itemId } } };
      },
      delete: async ({ session: session2, context, listKey, operation }) => {
        if (!isSignedIn(session2))
          return false;
        if (permissions.canManageOrders)
          return true;
        return { user: { id: { equals: session2.itemId } } };
      }
    },
    operation: {
      query: ({ session: session2, context, listKey, operation }) => true,
      create: ({ session: session2, context, listKey, operation }) => true,
      update: ({ session: session2, context, listKey, operation }) => true,
      delete: ({ session: session2, context, listKey, operation }) => true
    }
  },
  fields: {
    label: (0, import_fields8.virtual)({
      field: import_core6.graphql.field({
        type: import_core6.graphql.String,
        resolve(item) {
          return `${formatMoney(item.total)}`;
        }
      })
    }),
    total: (0, import_fields8.integer)(),
    items: (0, import_fields8.relationship)({ ref: "OrderItem.order", many: true }),
    user: (0, import_fields8.relationship)({ ref: "User.orders" }),
    charge: (0, import_fields8.text)(),
    createdAt: (0, import_fields8.timestamp)()
  }
});
var Order_default = Order;

// schemas/Role.ts
var import_core7 = require("@keystone-6/core");
var import_access7 = require("@keystone-6/core/access");
var import_fields9 = require("@keystone-6/core/fields");
var Role = (0, import_core7.list)({
  access: import_access7.allowAll,
  fields: {
    name: (0, import_fields9.text)({ validation: { isRequired: true } }),
    ...permissionFields,
    assignedTo: (0, import_fields9.relationship)({
      ref: "User.role",
      many: true,
      ui: {
        itemView: { fieldMode: "read" }
      }
    })
  }
});
var Role_default = Role;

// schema.ts
var lists = {
  Product: Product_default,
  ProductImage: ProductImage_default,
  User: User_default,
  CartItem: CartItem_default,
  OrderItem: OrderItem_default,
  Order: Order_default,
  Role: Role_default
};

// auth.ts
var import_crypto = require("crypto");
var import_auth = require("@keystone-6/auth");
var import_session = require("@keystone-6/core/session");
var sessionSecret = process.env.COOKIE_SECRET;
if (!sessionSecret && process.env.NODE_ENV !== "production") {
  sessionSecret = (0, import_crypto.randomBytes)(32).toString("hex");
}
console.log(sessionSecret);
var { withAuth } = (0, import_auth.createAuth)({
  listKey: "User",
  identityField: "email",
  sessionData: `id name email role { ${permissionsList.join(" ")} }`,
  secretField: "password",
  initFirstItem: {
    fields: ["name", "email", "password"]
  }
});
var sessionMaxAge = 60 * 60 * 24 * 30;
var session = (0, import_session.statelessSessions)({
  maxAge: sessionMaxAge,
  secret: sessionSecret
});

// keystone.ts
var import_core11 = require("@keystone-6/core");

// mutations/addToCart.ts
var import_core8 = require("@keystone-6/core");
var addToCart = (base) => import_core8.graphql.field({
  type: base.object("CartItem"),
  args: { id: import_core8.graphql.arg({ type: import_core8.graphql.nonNull(import_core8.graphql.ID) }) },
  async resolve(source, { id }, context) {
    const session2 = context.session;
    if (!session2.itemId) {
      throw new Error("No user logged in");
    }
    const cartItems = await context.db.CartItem.findMany({
      where: { user: { id: { equals: session2.itemId } }, product: { id: { equals: id } } }
    });
    const [cartItem] = cartItems;
    if (cartItem) {
      return context.db.CartItem.updateOne({
        where: { id: cartItem.id },
        data: { quantity: cartItem.quantity + 1 }
      });
    } else {
      return context.db.CartItem.createOne({
        data: {
          product: {
            connect: { id }
          },
          user: {
            connect: { id: session2.itemId }
          }
        }
      });
    }
  }
});
var addToCart_default = addToCart;

// mutations/removeFromCart.ts
var import_core9 = require("@keystone-6/core");
var removeFromCart = (base) => import_core9.graphql.field({
  type: base.object("CartItem"),
  args: { id: import_core9.graphql.arg({ type: import_core9.graphql.nonNull(import_core9.graphql.ID) }) },
  async resolve(source, { id }, context) {
    const session2 = context.session;
    if (!session2.itemId) {
      throw new Error("No user logged in");
    }
    const cartItems = await context.db.CartItem.findMany({
      where: { user: { id: { equals: session2.itemId } }, product: { id: { equals: id } } }
    });
    const [cartItem] = cartItems;
    if (!cartItem)
      return;
    if (cartItem.quantity == 1) {
      return context.db.CartItem.deleteOne({
        where: { id: cartItem.id }
      });
    } else {
      return context.db.CartItem.updateOne({
        where: { id: cartItem.id },
        data: { quantity: cartItem.quantity - 1 }
      });
    }
  }
});
var removeFromCart_default = removeFromCart;

// mutations/checkout.ts
var import_core10 = require("@keystone-6/core");

// lib/stripe.ts
var import_stripe = __toESM(require("stripe"));
var stripeConfig = new import_stripe.default(process.env.STRIPE_SECRET || "", {
  apiVersion: "2022-11-15"
});
var stripe_default = stripeConfig;

// mutations/checkout.ts
var checkout = (base) => import_core10.graphql.field({
  type: base.object("CartItem"),
  args: { token: import_core10.graphql.arg({ type: import_core10.graphql.nonNull(import_core10.graphql.String) }) },
  async resolve(source, { token }, context) {
    const session2 = context.session;
    if (!session2.itemId) {
      throw new Error("You must be logged in to create an order. Sorry not sorry.");
    }
    const user = await context.query.User.findOne({
      where: { id: session2.itemId },
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
                    }`
    });
    const totalOrder = user.cart.reduce((accumulator, cartItem) => {
      const amountCartItem = cartItem.quantity * cartItem.product.price;
      return accumulator + amountCartItem;
    }, 0);
    const charge = await stripe_default.paymentIntents.create({
      amount: totalOrder,
      currency: "USD",
      confirm: true,
      payment_method: token
    }).catch((err) => {
      throw new Error(err.message);
    });
    const orderItems = user.cart.map((cartItem) => {
      return {
        name: cartItem.product.name,
        description: cartItem.product.description,
        price: cartItem.product.price,
        quantity: cartItem.quantity,
        productId: cartItem.product.id,
        photo: { connect: { id: cartItem.product.photo[0].id } }
      };
    });
    const now = new Date();
    const order = await context.db.Order.createOne({
      data: {
        total: charge.amount,
        items: { create: orderItems },
        user: { connect: { id: user.id } },
        charge: charge.id,
        createdAt: now.toISOString()
      }
    });
    await context.db.CartItem.deleteMany({
      where: user.cart.map((cartItem) => {
        return { id: cartItem.id };
      })
    });
    return order;
  }
});
var checkout_default = checkout;

// keystone.ts
var keystone_default = withAuth(
  (0, import_core11.config)({
    server: {
      cors: {
        origin: [process.env.FRONTEND_URL],
        credentials: true
      },
      port: 3e3,
      maxFileSize: 200 * 1024 * 1024,
      healthCheck: true
    },
    db: {
      provider: "sqlite",
      url: "file:./keystone.db"
    },
    lists,
    session,
    startSession: () => {
      return {
        User: `id name email role { ${permissionsList.join(" ")} }`
      };
    },
    extendGraphqlSchema: import_core11.graphql.extend((base) => {
      return {
        mutation: {
          addToCart: addToCart_default(base),
          removeFromCart: removeFromCart_default(base),
          checkout: checkout_default(base)
        }
      };
    })
  })
);
// Annotate the CommonJS export names for ESM import in node:
0 && (module.exports = {});
