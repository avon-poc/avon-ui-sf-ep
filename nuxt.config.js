import webpack from 'webpack';

export default {
  mode: 'universal',
  server: {
    port: 3000,
    host: '0.0.0.0'
  },
  head: {
    title: process.env.npm_package_name || '',
    meta: [
      { charset: 'utf-8' },
      { name: 'viewport', content: 'width=device-width, initial-scale=1' },
      { hid: 'description', name: 'description', content: process.env.npm_package_description || '' }
    ],
    link: [
      { rel: 'icon',
        type: 'image/x-icon',
        href: '/favicon.ico'
      },
      {
        rel: 'preconnect',
        href: 'https://fonts.gstatic.com',
        crossorigin: 'crossorigin'
      },
      {
        rel: 'preload',
        href: 'https://fonts.googleapis.com/css?family=Raleway:300,400,400i,500,600,700|Roboto:300,300i,400,400i,500,700|Montserrat:300,300i,400,400i,500,700&display=swap',
        as: 'style'
      },
      {
        rel: 'stylesheet',
        href: 'https://fonts.googleapis.com/css?family=Raleway:300,400,400i,500,600,700|Roboto:300,300i,400,400i,500,700|Montserrat:300,300i,400,400i,500,700&display=swap',
        media: 'print',
        onload: 'this.media=\'all\'',
        once: true
      }
    ],
    script: [{
      type: "text/javascript",
      src: "https://cdn.esales.apptus.com/api/apptus-esales-api-2.2.2.js"
    }
    ]
  },
  loading: { color: '#fff' },
  router: {
    middleware: ['checkout'],
    scrollBehavior (_to, _from, savedPosition) {
      if (savedPosition) {
        return savedPosition;
      } else {
        return { x: 0, y: 0 };
      }
    },extendRoutes (routes, resolve) {
      routes.push({
        name: 'specialOffers',
        path: '/special-offers',
        component: resolve(__dirname, 'pages/Offer.vue')
      });
      routes.push({
        name: 'specialOffersDetail',
        path: '/special-offers/:id',
        component: resolve(__dirname, 'pages/OfferDetails.vue')
      });
      routes.push({
        name: 'cart',
        path: '/cart',
        component: resolve(__dirname, 'pages/Cart.vue')
      });
   }
  },
  buildModules: [
    '@nuxt/typescript-build',
    '@nuxtjs/style-resources',
    '@nuxtjs/pwa',
    ['@vue-storefront/nuxt-theme'],
    ['@vue-storefront/nuxt', {
      useRawSource: {
        dev: [
          '@vue-storefront/core',
          // '@vue-storefront/storyblok'
        ],
        prod: [
          '@vue-storefront/core',
          // '@vue-storefront/storyblok'
        ]
      }
    }],
    ['@vsf-enterprise/ct-faceting/nuxt', {
      apiConfigModule: '@vsf-enterprise/commercetools/nuxt',
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
    }],
    ['@vsf-enterprise/commercetools/nuxt', {
      i18n: {
        useNuxtI18nConfig: true
      }
    }],
    // '@vue-storefront/storyblok/nuxt',
  ],
  modules: [
    'nuxt-i18n',
    'cookie-universal-nuxt',
    'vue-scrollto/nuxt',
    '@vue-storefront/middleware/nuxt'
  ],
  plugins: ['~/plugins/cms.client', '~/plugins/mgnl-vue-editor.js', '~/plugins/global.client.js'],
  serverMiddleware: ['~/plugins/cms.server'],
  i18n: {
    currency: 'GBP',
    country: 'GB',
    countries: [
      { name: 'US', label: 'United States' },
      { name: 'AT', label: 'Austria' },
      { name: 'DE', label: 'Germany' },
      { name: 'NL', label: 'Netherlands' },
      { name: 'GB', label: 'United Kingdom' }
    ],
    currencies: [
      { name: 'EUR', label: 'Euro' },
      { name: 'USD', label: 'Dollar' },
      {
        name: 'GBP',
        label: 'Pound'
      }
    ],
    locales: [
      { code: 'en', label: 'English', file: 'en.js', iso: 'en' },
      { code: 'de', label: 'German', file: 'de.js', iso: 'de' }
    ],
    defaultLocale: 'en',
    lazy: true,
    seo: true,
    langDir: 'lang/',
    vueI18n: {
      fallbackLocale: 'en',
      numberFormats: {
        en: {
          currency: {
            style: 'currency', currency: 'GBP', currencyDisplay: 'symbol'
          }
        },
        de: {
          currency: {
            style: 'currency', currency: 'EUR', currencyDisplay: 'symbol'
          }
        }
      }
    },
    detectBrowserLanguage: {
      cookieKey: 'vsf-locale'
    }
  },
  styleResources: {
    scss: [require.resolve('@storefront-ui/shared/styles/_helpers.scss', { paths: [process.cwd()] })]
  },
  build: {
    babel: {
      plugins: [['@babel/plugin-proposal-private-methods', { loose: true }]],
    },
    transpile: [
      'vee-validate/dist/rules'
    ],
    plugins: [
      new webpack.DefinePlugin({
        'process.VERSION': JSON.stringify({
          // eslint-disable-next-line global-require
          version: require('./package.json').version,
          lastCommit: process.env.LAST_COMMIT || ''
        })
      })
    ]
  }
};
