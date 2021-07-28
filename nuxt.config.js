import { i18n, ssoScbd } from './configs'


const { NODE_ENV }           = process.env
const modernEnvironments = ['prod', 'production', 'stg', 'staging' ]

export default {
  // target    : 'spa',
  mode: 'spa',
  parallel  : true,
  modern    : modernEnvironments.includes( NODE_ENV )? true : false,
  head      : {
                title    : 'portal-app',
                htmlAttrs: { lang: 'en' },
                meta     : [
                  { charset: 'utf-8' },
                  { name: 'viewport', content: 'width=device-width, initial-scale=1' },
                  { hid: 'description', name: 'description', content: '' }
                ],
                link: [ { rel: 'stylesheet', href: 'https://fonts.googleapis.com/css?family=BenchNine:300,400,600,900' } ]
              },
  css       : [ '@scbd/www-css/dist/style.css', 'assets/style.css' ],
  plugins   : [],
  components: false,                                              // Auto import components: https://go.nuxtjs.dev/config-components

  buildModules: [                                               // Modules for dev and build (recommended): https://go.nuxtjs.dev/config-modules
    // 'nuxt-vite',
    '@nuxtjs/eslint-module',                                    // https://go.nuxtjs.dev/eslint
    [ '@nuxtjs/dotenv', { filename: `${dotEnvFileName()}` } ]
  ],
  modules: [                                                    // Modules: https://go.nuxtjs.dev/config-modules
    '@scbd/nuxt-scbd-sso-module',
    '@nuxtjs/axios',
    '@nuxtjs/pwa',
    [ 'nuxt-i18n', i18n ],
    ['bootstrap-vue/nuxt']

    // ['@nuxtjs/redirect-module', 
    //   {
    //     // eslint-disable-next-line
    //     from: '(?!^\/$|^\/[?].*$)(.*\/[?](.*)$|.*\/$)',
    //     to: (from, req) => {
    //       const base = req._parsedUrl.pathname.replace(/\/$/, '');  // We take pathname instead of req.url because of the query parameters
    //       const search = req._parsedUrl.search;
    //       return base + (search != null ? search : '');
    //     },
    //     statusCode: 301
    //   }
    // ]
  ],
  bootstrapVue: {
    bootstrapCSS: false, 
    bootstrapVueCSS: true,
    componentPlugins:[],
    directivePlugins:[],
    components:[],
    directives: []
  },
  build: {                                                      // Build Configuration: https://go.nuxtjs.dev/config-build
    babel: {
      plugins: [
        '@babel/plugin-proposal-export-default-from',
        '@babel/plugin-proposal-export-namespace-from'
      ]
    },
  },
  router: {
    // base      : '/action-agenda',
    trailingSlash : true
  },
  eslint  : { fix: true },
  axios   : {},
  ssoScbd
}

function dotEnvFileName (){
  const environments = [ 'local', 'dev', 'stg' ]

  const dotFile = '.env'

  if (environments.includes(NODE_ENV))
    return `${dotFile}.${NODE_ENV}`
  else
    process.env.NODE_ENV = 'production'

  return dotFile
}