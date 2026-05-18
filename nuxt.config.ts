import vue from "@vitejs/plugin-vue";
import vuetify, { transformAssetUrls } from "vite-plugin-vuetify";

export default defineNuxtConfig({
	devtools: {
    enabled: true,
  },

	runtimeConfig: {
		public: {
			HOST: process.env.VUE_APP_DEVHOST || "http://localhost:8000",
			baseURL: process.env.VUE_APP_DEVHOST || "http://localhost:8000",
			tokenName: process.env.VUE_APP_TOKEN_NAME || "GUARDIAN_TOKEN"
		},
	},

	app: {
		head: {
			title: "Home",
			titleTemplate: "Guardian Admin | %s",
			htmlAttrs: {
				lang: "en",
			},
			charset: "utf-8",
			viewport: "width=device-width, initial-scale=1",
			meta: [
				{ property: "format-detection", content: "telephone=no" },
				{
					hid: "og:type",
					property: "og:type",
					content: "website",
				},

				{
					hid: "og:site_name",
					property: "og:site_name",
					content: "Guardian Admin Panel",
				},
			],
			link: [
			],
		},
	},

	vite: {
		vue: {
      template: {
        transformAssetUrls,
      },
    },
		css: {
			preprocessorOptions: {
				scss: {
					additionalData: '@use "@/assets/css/_config.scss" as *;',
				},
			},
		},
	},

	pinia: {
		autoImports: [
			"defineStore",
			"storeToRefs",
			["defineStore", "definePiniaStore"],
		],
	},

	css: ["~/assets/css/main.scss"],

	modules: [
		(_options, nuxt) => {
      nuxt.hooks.hook("vite:extendConfig", (config) => {
        // @ts-expect-error
        config.plugins.push(vuetify({ autoImport: true }))
      })
    },
		"@pinia/nuxt",
		"@vee-validate/nuxt",
		"dayjs-nuxt",
	],

	build: {
		transpile: ["vuetify", "vue-toastification",],
	},

	dayjs: {
		plugins: ["utc", "relativeTime", "timezone"],
		defaultTimezone: "Asia/Dhaka",
	},

	veeValidate: {
    autoImports: true,
    componentNames: {
      Form: "VeeForm",
      Field: "VeeField",
      FieldArray: "VeeFieldArray",
      ErrorMessage: "VeeErrorMessage",
    },
	},
});
