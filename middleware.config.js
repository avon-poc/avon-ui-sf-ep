module.exports = {
  integrations: {
    ct: {
      location: '@vue-storefront/commercetools-api/server',
      extensions: (existing) =>
        existing.concat('@vsf-enterprise/commercetools/extensions'),
      configuration: {
        api: {
          uri:
            'https://api.us-central1.gcp.commercetools.com/poc-avon-uk-dev/graphql',
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
        pageOptions: [20, 50, 100],
        subcategoriesLimit: 100,
        availableFacets: [
          { facet: 'categories.id', type: 'string', option: 'subtree("*")', name: 'category', filteringStrategy: 'query' },  // Don't change the "name" of this facet
          { facet: 'variants.attributes.size', type: 'string', option: '', name: 'size' },
          { facet: 'variants.attributes.color.key', type: 'string', option: '', name: 'color' }
        ],
        sortingOptions: [
          { id: 'latest', name: 'Latest', facet: 'createdAt', direction: 'desc' },
          { id: 'price-up', name: 'Price from low to high', facet: 'price', direction: 'asc' },
          { id: 'price-down', name: 'Price from high to low', facet: 'price', direction: 'desc' },
          { id: 'alphabet-up', name: 'Alphabetical(A-Z)', facet: 'name.en', direction: 'asc' },
          { id: 'name-up', name: 'Alphabetical(A-Z)(name)', facet: 'name.en', direction: 'asc' },
          { id: 'relevance', name: 'Relevance', facet: 'score', direction: 'desc' },
        ],
        filteringStrategy: 'filter'
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