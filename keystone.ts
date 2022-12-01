// @ts-nocheck
// Welcome to Keystone!
//
// This file is what Keystone uses as the entry-point to your headless backend
//
// Keystone imports the default export of this file, expecting a Keystone configuration object
//   you can find out more at https://keystonejs.com/docs/apis/config


// to keep this file tidy, we define our schema in a different file
import { lists } from './schema';

// authentication is configured separately here too, but you might move this elsewhere
// when you write your list-level access control functions, as they typically rely on session data

import { withAuth, session } from './auth';


import { graphql, config } from '@keystone-6/core';
import { Context } from '.keystone/types';
import addToCart from './mutations/addToCart';
import removeFromCart from './mutations/removeFromCart';
import checkout from './mutations/checkout';
import { permissionsList } from './schemas/fields';

export default withAuth(
  config({
    server: {
      cors: {
        origin: [process.env.FRONTEND_URL, "https://3rd-shop.vercel.app", /\.3rd-shop.vercel\.app$/, /[\w\-\/\:]*carlos815.vercel.app/],
        credentials: true,
        methods: ['GET', 'PUT', 'POST']
      },

      port: 3000,
      maxFileSize: 200 * 1024 * 1024,
      healthCheck: true,
    },
    db: {
      // we're using sqlite for the fastest startup experience
      //   for more information on what database might be appropriate for you
      //   see https://keystonejs.com/docs/guides/choosing-a-database#title
      provider: 'sqlite',
      url: 'file:./keystone.db',



    },
    lists,
    session,
    startSession: () => {
      return {
        // GraphQL Query
        User: `id name email role { ${permissionsList.join(' ')} }`,
      }
    },

    extendGraphqlSchema: graphql.extend(base => {
      return {
        mutation: {
          addToCart: addToCart(base),
          removeFromCart: removeFromCart(base),
          checkout: checkout(base)
        },
      }
    })
  })
);

