import { list } from '@keystone-6/core';
import {
    text,
    relationship,
    password,
    timestamp,
    select,
    integer,
} from '@keystone-6/core/fields';

import { allowAll } from '@keystone-6/core/access';


// import { rules, isSignedIn } from '../access';

const Product = list({
    access: allowAll,

    fields: {
        
        name: text({ validation: { isRequired: true } }),
        subtitle: text(),
        description:
            text(
                {
                    ui: {
                        displayMode: 'textarea',
                    },
                }),
        photo: relationship({
            many: true,
            ref: 'ProductImage.product',
            ui: {
                displayMode: 'cards',
                cardFields: ['image', 'altText'],
                inlineCreate: { fields: ['image', 'altText'] },
                inlineEdit: { fields: ['image', 'altText'] },
            },
        }),
        status: select({
            options: [
                { label: 'Draft', value: 'DRAFT' },
                { label: 'Available', value: 'AVAILABLE' },
                { label: 'Unavailable', value: 'UNAVAILABLE' },
            ],
            defaultValue: 'DRAFT',
            ui: {
                displayMode: 'segmented-control',
                createView: { fieldMode: 'hidden' },
            },
        }),
        price: integer(),
        user: relationship({
            ref: 'User.products',
        }),
    },
});

export default Product