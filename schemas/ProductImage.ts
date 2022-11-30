import { list } from '@keystone-6/core';
import { allowAll } from '@keystone-6/core/access';
import { relationship, text } from '@keystone-6/core/fields';
import 'dotenv/config';
// import { isSignedIn, permissions } from '../access';
import { cloudinaryImage } from '@keystone-6/cloudinary';

const ProductImage = list({
    // access: {
    //   create: isSignedIn,
    //   read: () => true,
    //   update: permissions.canManageProducts,
    //   delete: permissions.canManageProducts,
    // },

    access: allowAll,

    fields: {
        image: cloudinaryImage({
            cloudinary: {
                cloudName: process.env.CLOUDINARY_CLOUD_NAME || "",
                apiKey: process.env.CLOUDINARY_KEY || "",
                apiSecret: process.env.CLOUDINARY_SECRET || "",
                folder: '3rd-shop',
            },
            label: 'Source',
        }),
        altText: text(),
        product: relationship({ ref: 'Product.photo' }),
    },
    ui: {
        listView: {
            initialColumns: ['image', 'altText', 'product'],
        },
    },
});

export default ProductImage
