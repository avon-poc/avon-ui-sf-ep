module.exports = {
  integrations: {
    ct: {
      location: '@vue-storefront/commercetools-api/server',
      extensions: (existing) =>
        existing.concat('@vsf-enterprise/commercetools/extensions'),
      configuration: {
        api: {
          uri:
            'https://api.europe-west1.gcp.commercetools.com/avon-uk-poc/graphql',
          authHost: 'https://auth.europe-west1.gcp.commercetools.com',
          projectKey: 'avon-uk-poc',
          clientId: 'zYMEsu7eLLQcrU_T2_4uy2wH',
          clientSecret: '11fev_OTwtJmOyVCuQ3LdIZogg11nbor',
          scopes: [
            'manage_cart_discounts:avon-uk-poc',
            'manage_categories:avon-uk-poc',
            'manage_customer_groups:avon-uk-poc',
            'manage_customers:avon-uk-poc',
            'manage_discount_codes:avon-uk-poc',
            'manage_extensions:avon-uk-poc',
            'manage_order_edits:avon-uk-poc',
            'manage_orders:avon-uk-poc',
            'manage_payments:avon-uk-poc',
            'manage_products:avon-uk-poc',
            'manage_project:avon-uk-poc',
          ],
        },
        currency: 'GBP',
        country: 'GB',
      },
    },
    ctf: {
      location: '@vsf-enterprise/ct-faceting/server',
      configuration: {
        api: {
          authHost: 'https://auth.us-central1.gcp.commercetools.com',
          projectKey: 'poc-avon-uk-dev',
          clientId: 'wM0SahIsfYwn8gsqCyFnqBfN',
          clientSecret: '62B71c_2ljyXSQ5CmkL28vZm421p-Dfq',
          scopes: [
            'manage_cart_discounts:poc-avon-uk-dev',
            'manage_categories:poc-avon-uk-dev',
            'manage_customer_groups:poc-avon-uk-dev',
            'manage_customers:poc-avon-uk-dev',
            'manage_discount_codes:poc-avon-uk-dev',
            'manage_extensions:poc-avon-uk-dev',
            'manage_order_edits:poc-avon-uk-dev',
            'manage_orders:poc-avon-uk-dev',
            'manage_payments:poc-avon-uk-dev',
            'manage_products:poc-avon-uk-dev',
            'manage_project:poc-avon-uk-dev',
          ],
        },
        faceting: {
          host: 'https://api.us-central1.gcp.commercetools.com',
        },
      },
    },
    // sb: {
    //   location: '@vue-storefront/storyblok/server',
    //   configuration: {
    //     ...JSON.parse(
    //       '{"accessToken":"CONTENT_DELIVERY_TOKEN","cacheProvider":"memory"}',
    //     ),
    //   },
    // },
  },
}
