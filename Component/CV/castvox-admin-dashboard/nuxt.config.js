/*!

=========================================================
* Nuxt Argon Dashboard PRO Laravel- v1.0.0
=========================================================

* Product Page: https://www.creative-tim.com/product/nuxt-argon-dashboard-pro-laravel
* Copyright Creative Tim (https://www.creative-tim.com) & UPDIVISION (https://www.updivision.com)

* Coded by www.creative-tim.com & www.binarcode.com & www.updivision.com

=========================================================

* The above copyright notice and this permission notice shall be included in all copies or substantial portions of the Software.

*/

const { setInteractionMode } = require("vee-validate");
const pkg = require("./package");
const { default: isDemo } = require("./plugins/isDemo");
console.log("ENV", process.env.NODE_ENV);
console.log("API_BASE_URL", process.env.API_BASE_URL);

module.exports = {
  env: {
    apiUrl: process.env.API_BASE_URL + "/api/v1",
    baseUrl: process.env.BASE_URL,
    isDemo: process.env.IS_DEMO,
    apiKey: process.env.API_KEY,
  },
  ssr: false,

  // Target: https://go.nuxtjs.dev/config-target
  target: "static",
  router: {
    base: "/",
    middleware: ["auth"],
    linkExactActiveClass: "active",
  },
  meta: {
    ogType: false,
    ogDescription: false,
    author: false,
    ogTitle: false,
    description: false,
    viewport: false,
    charset: false,
  },
  /*
   ** Headers of the page
   */
  head: {
    title: "Casting Voice Online Dashboard",
    meta: [
      { charset: "utf-8" },
      {
        name: "keywords",
        content: "Dashboard",
      },
      {
        name: "description",
        content: "Dashboard",
      },
      {
        itemprop: "name",
        content: "",
      },
      {
        itemprop: "description",
        content: "",
      },
      {
        itemprop: "image",
        content: "",
      },
      {
        name: "twitter:card",
        content: "",
      },
      {
        name: "twitter:site",
        content: "",
      },
      {
        name: "twitter:title",
        content: "",
      },
      {
        name: "twitter:description",
        content: "",
      },
      {
        name: "twitter:creator",
        content: "",
      },
      {
        name: "twitter:image",
        content: "",
      },
      {
        property: "fb:app_id",
        content: "",
      },
      {
        property: "og:title",
        content: "",
      },
      {
        property: "og:type",
        content: "",
      },
      {
        property: "og:url",
        content: "",
      },
      {
        property: "og:image",
        content: "",
      },
      {
        property: "og:description",
        content: "",
      },
      {
        property: "og:site_name",
        content: "",
      },
    ],
    link: [
      { rel: "icon", type: "image/x-icon", href: "/img/favicon.ico" },
      {
        rel: "stylesheet",
        href: "https://fonts.googleapis.com/css?family=Open+Sans:300,400,600,700",
      },
      {
        rel: "stylesheet",
        href: "https://use.fontawesome.com/releases/v5.6.3/css/all.css",
        integrity:
          "sha384-UHRtZLI+pbxtHCWp1t77Bi1L4ZtiqrqD80Kn4Z8NTSRyMA2Fd33n5dQ8lWUE00s/",
        crossorigin: "anonymous",
      },
    ],
  },

  /*
   ** Customize the progress-bar color
   */
  loading: {
    name: "cube-grid",
    color: "blue",
    height: "32px",
  },

  /*
   ** Global CSS
   */
  css: [
    "assets/css/nucleo/css/nucleo.css",
    "assets/sass/argon.scss",
    "~assets/css/style.css",
  ],

  /*
   ** Plugins to load before mounting the App
   */
  plugins: [
    "~/plugins/dashboard/dashboard-plugin",
    { src: "~/plugins/dashboard/full-calendar", ssr: false },
    { src: "~/plugins/dashboard/world-map", ssr: false },
    "~/plugins/dashboard/JsonApi.js",
    "~/plugins/axios.js",
    //    "~/plugins/isDemo.js",
    "@/plugins/castvox",
  ],
  generate: {
    dir: "public",
  },
  // for logging crash log by sentry.io
  sentry: {
    dsn: process.env.SENTRY_DSN,
  },

  /*
   ** Nuxt.js modules
   */
  modules: [
    // Doc: https://axios.nuxtjs.org/usage
    "@nuxtjs/axios",
    "@nuxtjs/pwa",
    "@nuxtjs/auth",
    "@nuxtjs/sentry",
    "@nuxtjs/toast",
  ],
  /*
   ** Auth module configuration
   ** See https://auth.nuxtjs.org/schemes/local.html#options
   */
  auth: {
    strategies: {
      local: {
        _scheme: "~/util/authCustomStrategy.js",
        endpoints: {
          login: {
            url: `${process.env.API_BASE_URL}/api/v1/login`,
            method: "post",
            propertyName: "access_token",
          },
          logout: {
            url: `${process.env.API_BASE_URL}/api/v1/logout`,
            method: "post",
          },
          user: {
            url: `${process.env.API_BASE_URL}/api/v1/me?include=roles.permissions`,
            method: "get",
            propertyName: false,
          },
        },
      },
      redirect: {
        login: "/login/",
        logout: "/",
        callback: "/login/",
        home: "/dashboard/",
      },
    },
  },

  /*
   ** Notification toast module configuration
   ** See https://github.com/nuxt-community/modules/tree/master/packages/toast?ref=madewithvuejs.com
   */
  toast: {
    position: "top-right",
    duration: 5000,
    keepOnHover: true,
    fullWidth: false,
    fitToScreen: true,
    className: "vue-toast-custom",
    closeOnSwipe: true,
    register: [
      // Register custom toasts
      // @todo add custom messages as they come : login failed, register failed etc
      {
        name: "my-error",
        message: "Oops...Something went wrong",
        options: {
          type: "error",
        },
      },
    ],
  },

  /*
   ** Axios module configuration
   */
  axios: {
    // See https://github.com/nuxt-community/axios-module#options
    //    baseURL: process.env.API_BASE_URL,
    proxy: true,
    headers: {
      common: {
        Accept: "application/json, */*",
        //    "content-type": "application/json",
      },
      //      post: {
      //        "content-type": "application/json",
      //      },
      patch: {
        "content-type": "application/json",
      },
      delete: {
        "content-type": "application/json",
      },
    },
  },
  /**
   * for CORS
   */
  proxy: {
    "/api/": {
      target: process.env.API_BASE_URL + "/api/",

      changeOrigin: true,
      logLevel: "debug",
    },
  },
  pwa: {
    /*    icon: {
      source: "favicon.ico",
      fileName: "favicon.ico",
      targetDir: "/",
    },
    
 */
    manifest: {
      name: "Casting Voice Online Admin Dashboard",
      lang: "ja",
      useWebmanifestExtension: false,
    },
  },

  /*
   ** Build configuration
   */
  build: {
    transpile: ["vee-validate/dist/rules"],
    /*
     ** You can extend webpack config here
     */
    extend(config, ctx) {
      if (ctx.dev && ctx.isClient) {
        config.module.rules.push({
          enforce: "pre",
          test: /\.(js|vue)$/,
          loader: "eslint-loader",
          exclude: /(node_modules)/,
          options: {
            fix: true,
          },
        });
      }
    },
    extractCSS: process.env.NODE_ENV === "production",
    babel: {
      plugins: [
        [
          "component",
          {
            libraryName: "element-ui",
            styleLibraryName: "theme-chalk",
          },
        ],
      ],
    },
  },
};
