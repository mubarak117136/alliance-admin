import {
	ADMIN_IMAGES_ENDPOINT,
	ADMIN_BASIC_SETTINGS_ENDPOINT,
	ADMIN_SOCIAL_SETTINGS_ENDPOINT,
	ADMIN_EMAIL_SETTINGS_ENDPOINT,
	ADMIN_SHIPPING_SETTINGS_ENDPOINT,
	ADMIN_COUPONS_ENDPOINT,
	ADMIN_NAVIGATION_SCOPE_ENDPOINT,
	ADMIN_MENUS_ENDPOINT,
	ADMIN_SUBMENUS_ENDPOINT,
	ADMIN_CONTACT_US_ENDPOINT,
	ADMIN_SHIPPING_COMPANY_ENDPOINT,
	PUBLIC_SETTINGS_ENDPOINT,
	ADMIN_ADD_COURIER_IN_ORDERS_ENDPOINT,
} from "@/utils/store/endpoints";
import { buildParams } from "../utils/utils";
import { useUserStore } from "./user";

export const useUtilityStore = defineStore("utilityStores", {
	state: () => {
		return {
			basic: null,
		};
	},
	getters: {
		getBasicSettings(state) {
			return state.basic;
		},
	},
	actions: {
		async fetchSettings() {
			return new Promise((resolve, reject) => {
				const config = useRuntimeConfig();
				$fetch(`${PUBLIC_SETTINGS_ENDPOINT}/all/`, {
					baseURL: config.public.baseURL,
				})
					.then((data) => {
						this.basic = data.basic;
						resolve(data);
					})
					.catch((e) => {
						console.log(e);
						reject(e);
					});
			});
		},
		async fetchImages(params = {}) {
			return new Promise((resolve, reject) => {
				const config = useRuntimeConfig();
				const userStore = useUserStore();
				const authHeader = userStore.getAuthHeader;
				$fetch(`${ADMIN_IMAGES_ENDPOINT}/${buildParams(params)}`, {
					baseURL: config.public.baseURL,
					headers: {
						...authHeader,
					},
				})
					.then((data) => {
						resolve(data);
					})
					.catch((e) => {
						console.log(e);
						reject(e);
					});
			});
		},
		async uploadImage(payload) {
			return new Promise((resolve, reject) => {
				const config = useRuntimeConfig();
				const userStore = useUserStore();
				const authHeader = userStore.getAuthHeader;
				$fetch(`${ADMIN_IMAGES_ENDPOINT}/`, {
					method: "post",
					baseURL: config.public.baseURL,
					headers: {
						...authHeader,
					},
					body: payload,
				})
					.then((data) => {
						resolve(data);
					})
					.catch((e) => {
						console.log(e);
						reject(e);
					});
			});
		},
		async fetchBasicSetting() {
			return new Promise((resolve, reject) => {
				const config = useRuntimeConfig();
				const userStore = useUserStore();
				const authHeader = userStore.getAuthHeader;
				$fetch(`${ADMIN_BASIC_SETTINGS_ENDPOINT}/`, {
					baseURL: config.public.baseURL,
					headers: {
						...authHeader,
					},
				})
					.then((data) => {
						resolve(data);
					})
					.catch((e) => {
						console.log(e);
						reject(e);
					});
			});
		},
		async updateBasicSetting(payload) {
			return new Promise((resolve, reject) => {
				const config = useRuntimeConfig();
				const userStore = useUserStore();
				const authHeader = userStore.getAuthHeader;
				$fetch(`${ADMIN_BASIC_SETTINGS_ENDPOINT}/${payload.id}/`, {
					method: "patch",
					baseURL: config.public.baseURL,
					headers: {
						...authHeader,
					},
					body: payload.data,
				})
					.then((data) => {
						resolve(data);
						this.fetchSettings();
					})
					.catch((e) => {
						console.log(e);
						reject(e);
					});
			});
		},
		async fetchSocialSetting() {
			return new Promise((resolve, reject) => {
				const config = useRuntimeConfig();
				const userStore = useUserStore();
				const authHeader = userStore.getAuthHeader;
				$fetch(`${ADMIN_SOCIAL_SETTINGS_ENDPOINT}/`, {
					baseURL: config.public.baseURL,
					headers: {
						...authHeader,
					},
				})
					.then((data) => {
						resolve(data);
					})
					.catch((e) => {
						console.log(e);
						reject(e);
					});
			});
		},
		async updateSocialSetting(payload) {
			return new Promise((resolve, reject) => {
				const config = useRuntimeConfig();
				const userStore = useUserStore();
				const authHeader = userStore.getAuthHeader;
				$fetch(`${ADMIN_SOCIAL_SETTINGS_ENDPOINT}/${payload.id}/`, {
					method: "patch",
					baseURL: config.public.baseURL,
					headers: {
						...authHeader,
					},
					body: payload.data,
				})
					.then((data) => {
						resolve(data);
					})
					.catch((e) => {
						console.log(e);
						reject(e);
					});
			});
		},
		async fetchEmailSetting() {
			return new Promise((resolve, reject) => {
				const config = useRuntimeConfig();
				const userStore = useUserStore();
				const authHeader = userStore.getAuthHeader;
				$fetch(`${ADMIN_EMAIL_SETTINGS_ENDPOINT}/`, {
					baseURL: config.public.baseURL,
					headers: {
						...authHeader,
					},
				})
					.then((data) => {
						resolve(data);
					})
					.catch((e) => {
						console.log(e);
						reject(e);
					});
			});
		},
		async updateEmailSetting(payload) {
			return new Promise((resolve, reject) => {
				const config = useRuntimeConfig();
				const userStore = useUserStore();
				const authHeader = userStore.getAuthHeader;
				$fetch(`${ADMIN_EMAIL_SETTINGS_ENDPOINT}/${payload.id}/`, {
					method: "patch",
					baseURL: config.public.baseURL,
					headers: {
						...authHeader,
					},
					body: payload.data,
				})
					.then((data) => {
						resolve(data);
					})
					.catch((e) => {
						console.log(e);
						reject(e);
					});
			});
		},
		async fetchShippingSetting() {
			return new Promise((resolve, reject) => {
				const config = useRuntimeConfig();
				const userStore = useUserStore();
				const authHeader = userStore.getAuthHeader;
				$fetch(`${ADMIN_SHIPPING_SETTINGS_ENDPOINT}/`, {
					baseURL: config.public.baseURL,
					headers: {
						...authHeader,
					},
				})
					.then((data) => {
						resolve(data);
					})
					.catch((e) => {
						console.log(e);
						reject(e);
					});
			});
		},
		async updateShippingSetting(payload) {
			return new Promise((resolve, reject) => {
				const config = useRuntimeConfig();
				const userStore = useUserStore();
				const authHeader = userStore.getAuthHeader;
				$fetch(`${ADMIN_SHIPPING_SETTINGS_ENDPOINT}/${payload.id}/`, {
					method: "patch",
					baseURL: config.public.baseURL,
					headers: {
						...authHeader,
					},
					body: payload.data,
				})
					.then((data) => {
						resolve(data);
					})
					.catch((e) => {
						console.log(e);
						reject(e);
					});
			});
		},
		async fetchCoupons(params = {}) {
			return new Promise((resolve, reject) => {
				const config = useRuntimeConfig();
				const userStore = useUserStore();
				const authHeader = userStore.getAuthHeader;
				$fetch(`${ADMIN_COUPONS_ENDPOINT}/${buildParams(params)}`, {
					baseURL: config.public.baseURL,
					headers: {
						...authHeader,
					},
				})
					.then((data) => {
						resolve(data);
					})
					.catch((e) => {
						console.log(e);
						reject(e);
					});
			});
		},
		async createCoupon(payload) {
			return new Promise((resolve, reject) => {
				const config = useRuntimeConfig();
				const userStore = useUserStore();
				const authHeader = userStore.getAuthHeader;
				$fetch(`${ADMIN_COUPONS_ENDPOINT}/`, {
					method: "post",
					baseURL: config.public.baseURL,
					headers: {
						...authHeader,
					},
					body: payload,
				})
					.then((data) => {
						resolve(data);
					})
					.catch((e) => {
						console.log(e);
						reject(e);
					});
			});
		},
		async updateCoupon(payload) {
			return new Promise((resolve, reject) => {
				const config = useRuntimeConfig();
				const userStore = useUserStore();
				const authHeader = userStore.getAuthHeader;
				$fetch(`${ADMIN_COUPONS_ENDPOINT}/${payload.id}/`, {
					method: "patch",
					baseURL: config.public.baseURL,
					headers: {
						...authHeader,
					},
					body: payload.data,
				})
					.then((data) => {
						resolve(data);
					})
					.catch((e) => {
						console.log(e);
						reject(e);
					});
			});
		},
		async deleteCoupon(payload) {
			return new Promise((resolve, reject) => {
				const config = useRuntimeConfig();
				const userStore = useUserStore();
				const authHeader = userStore.getAuthHeader;
				$fetch(`${ADMIN_COUPONS_ENDPOINT}/${payload}/`, {
					method: "delete",
					baseURL: config.public.baseURL,
					headers: {
						...authHeader,
					},
				})
					.then((data) => {
						resolve(data);
					})
					.catch((e) => {
						console.log(e);
						reject(e);
					});
			});
		},
		async fetchNavigationScopes() {
			return new Promise((resolve, reject) => {
				const config = useRuntimeConfig();
				const userStore = useUserStore();
				const authHeader = userStore.getAuthHeader;
				$fetch(`${ADMIN_NAVIGATION_SCOPE_ENDPOINT}/`, {
					baseURL: config.public.baseURL,
					headers: {
						...authHeader,
					},
				})
					.then((data) => {
						resolve(data);
					})
					.catch((e) => {
						console.log(e);
						reject(e);
					});
			});
		},
		async createNavigationScopes(payload) {
			return new Promise((resolve, reject) => {
				const config = useRuntimeConfig();
				const userStore = useUserStore();
				const authHeader = userStore.getAuthHeader;
				$fetch(`${ADMIN_NAVIGATION_SCOPE_ENDPOINT}/`, {
					method: "post",
					baseURL: config.public.baseURL,
					headers: {
						...authHeader,
					},
					body: payload,
				})
					.then((data) => {
						resolve(data);
					})
					.catch((e) => {
						console.log(e);
						reject(e);
					});
			});
		},
		async fetchNavigationScopeDetail(payload) {
			return new Promise((resolve, reject) => {
				const config = useRuntimeConfig();
				const userStore = useUserStore();
				const authHeader = userStore.getAuthHeader;
				$fetch(`${ADMIN_NAVIGATION_SCOPE_ENDPOINT}/${payload}/`, {
					method: "get",
					baseURL: config.public.baseURL,
					headers: {
						...authHeader,
					},
				})
					.then((data) => {
						resolve(data);
					})
					.catch((e) => {
						console.log(e);
						reject(e);
					});
			});
		},
		async updateNavigationScope(payload) {
			return new Promise((resolve, reject) => {
				const config = useRuntimeConfig();
				const userStore = useUserStore();
				const authHeader = userStore.getAuthHeader;
				$fetch(`${ADMIN_NAVIGATION_SCOPE_ENDPOINT}/${payload.id}/`, {
					method: "patch",
					baseURL: config.public.baseURL,
					headers: {
						...authHeader,
					},
					body: payload.data,
				})
					.then((data) => {
						resolve(data);
					})
					.catch((e) => {
						console.log(e);
						reject(e);
					});
			});
		},
		async deleteNavigationScope(payload) {
			return new Promise((resolve, reject) => {
				const config = useRuntimeConfig();
				const userStore = useUserStore();
				const authHeader = userStore.getAuthHeader;
				$fetch(`${ADMIN_NAVIGATION_SCOPE_ENDPOINT}/${payload}/`, {
					method: "delete",
					baseURL: config.public.baseURL,
					headers: {
						...authHeader,
					},
				})
					.then((data) => {
						resolve(data);
					})
					.catch((e) => {
						console.log(e);
						reject(e);
					});
			});
		},
		async fetchMenus(payload) {
			return new Promise((resolve, reject) => {
				const config = useRuntimeConfig();
				const userStore = useUserStore();
				const authHeader = userStore.getAuthHeader;
				$fetch(`${ADMIN_MENUS_ENDPOINT}/${buildParams(payload)}`, {
					method: "get",
					baseURL: config.public.baseURL,
					headers: {
						...authHeader,
					},
				})
					.then((data) => {
						resolve(data);
					})
					.catch((e) => {
						console.log(e);
						reject(e);
					});
			});
		},
		async createMenu(payload) {
			return new Promise((resolve, reject) => {
				const config = useRuntimeConfig();
				const userStore = useUserStore();
				const authHeader = userStore.getAuthHeader;
				$fetch(`${ADMIN_MENUS_ENDPOINT}/`, {
					method: "post",
					baseURL: config.public.baseURL,
					headers: {
						...authHeader,
					},
					body: payload,
				})
					.then((data) => {
						resolve(data);
					})
					.catch((e) => {
						console.log(e);
						reject(e);
					});
			});
		},
		async fetchMenuDetail(payload) {
			return new Promise((resolve, reject) => {
				const config = useRuntimeConfig();
				const userStore = useUserStore();
				const authHeader = userStore.getAuthHeader;
				$fetch(
					`${ADMIN_MENUS_ENDPOINT}/${payload.id}/${buildParams(
						payload.params,
					)}`,
					{
						method: "get",
						baseURL: config.public.baseURL,
						headers: {
							...authHeader,
						},
					},
				)
					.then((data) => {
						resolve(data);
					})
					.catch((e) => {
						console.log(e);
						reject(e);
					});
			});
		},
		async updateMenu(payload) {
			return new Promise((resolve, reject) => {
				const config = useRuntimeConfig();
				const userStore = useUserStore();
				const authHeader = userStore.getAuthHeader;
				$fetch(
					`${ADMIN_MENUS_ENDPOINT}/${payload.id}/${buildParams(
						payload.params,
					)}`,
					{
						method: "patch",
						baseURL: config.public.baseURL,
						headers: {
							...authHeader,
						},
						body: payload?.data,
					},
				)
					.then((data) => {
						resolve(data);
					})
					.catch((e) => {
						console.log(e);
						reject(e);
					});
			});
		},
		async deleteMenu(payload) {
			return new Promise((resolve, reject) => {
				const config = useRuntimeConfig();
				const userStore = useUserStore();
				const authHeader = userStore.getAuthHeader;
				$fetch(
					`${ADMIN_MENUS_ENDPOINT}/${payload.id}/${buildParams(
						payload.params,
					)}`,
					{
						method: "delete",
						baseURL: config.public.baseURL,
						headers: {
							...authHeader,
						},
					},
				)
					.then((data) => {
						resolve(data);
					})
					.catch((e) => {
						console.log(e);
						reject(e);
					});
			});
		},
		async fetchSubMenus(payload) {
			return new Promise((resolve, reject) => {
				const config = useRuntimeConfig();
				const userStore = useUserStore();
				const authHeader = userStore.getAuthHeader;
				$fetch(`${ADMIN_SUBMENUS_ENDPOINT}/${buildParams(payload)}`, {
					method: "get",
					baseURL: config.public.baseURL,
					headers: {
						...authHeader,
					},
				})
					.then((data) => {
						resolve(data);
					})
					.catch((e) => {
						console.log(e);
						reject(e);
					});
			});
		},
		async createSubMenu(payload) {
			return new Promise((resolve, reject) => {
				const config = useRuntimeConfig();
				const userStore = useUserStore();
				const authHeader = userStore.getAuthHeader;
				$fetch(`${ADMIN_SUBMENUS_ENDPOINT}/`, {
					method: "post",
					baseURL: config.public.baseURL,
					headers: {
						...authHeader,
					},
					body: payload,
				})
					.then((data) => {
						resolve(data);
					})
					.catch((e) => {
						console.log(e);
						reject(e);
					});
			});
		},
		async updateSubMenu(payload) {
			return new Promise((resolve, reject) => {
				const config = useRuntimeConfig();
				const userStore = useUserStore();
				const authHeader = userStore.getAuthHeader;
				$fetch(
					`${ADMIN_SUBMENUS_ENDPOINT}/${payload.id}/${buildParams(
						payload.params,
					)}`,
					{
						method: "patch",
						baseURL: config.public.baseURL,
						headers: {
							...authHeader,
						},
						body: payload?.data,
					},
				)
					.then((data) => {
						resolve(data);
					})
					.catch((e) => {
						console.log(e);
						reject(e);
					});
			});
		},
		async deleteSubMenu(payload) {
			return new Promise((resolve, reject) => {
				const config = useRuntimeConfig();
				const userStore = useUserStore();
				const authHeader = userStore.getAuthHeader;
				$fetch(
					`${ADMIN_SUBMENUS_ENDPOINT}/${payload.id}/${buildParams(
						payload.params,
					)}`,
					{
						method: "delete",
						baseURL: config.public.baseURL,
						headers: {
							...authHeader,
						},
					},
				)
					.then((data) => {
						resolve(data);
					})
					.catch((e) => {
						console.log(e);
						reject(e);
					});
			});
		},
		async fetchContactUs(payload) {
			return new Promise((resolve, reject) => {
				const config = useRuntimeConfig();
				const userStore = useUserStore();
				const authHeader = userStore.getAuthHeader;
				$fetch(`${ADMIN_CONTACT_US_ENDPOINT}/${buildParams(payload)}`, {
					method: "get",
					baseURL: config.public.baseURL,
					headers: {
						...authHeader,
					},
				})
					.then((data) => {
						resolve(data);
					})
					.catch((e) => {
						console.log(e);
						reject(e);
					});
			});
		},
		async contactUsDetail(id) {
			return new Promise((resolve, reject) => {
				const config = useRuntimeConfig();
				const userStore = useUserStore();
				const authHeader = userStore.getAuthHeader;
				$fetch(`${ADMIN_CONTACT_US_ENDPOINT}/${id}/`, {
					method: "get",
					baseURL: config.public.baseURL,
					headers: {
						...authHeader,
					},
				})
					.then((data) => {
						resolve(data);
					})
					.catch((e) => {
						console.log(e);
						reject(e);
					});
			});
		},
		async deleteContactUs(id) {
			return new Promise((resolve, reject) => {
				const config = useRuntimeConfig();
				const userStore = useUserStore();
				const authHeader = userStore.getAuthHeader;
				$fetch(`${ADMIN_CONTACT_US_ENDPOINT}/${id}/`, {
					method: "delete",
					baseURL: config.public.baseURL,
					headers: {
						...authHeader,
					},
				})
					.then((data) => {
						resolve(data);
					})
					.catch((e) => {
						console.log(e);
						reject(e);
					});
			});
		},
		async createShippingCompany(payload) {
			return new Promise((resolve, reject) => {
				const config = useRuntimeConfig();
				const userStore = useUserStore();
				const authHeader = userStore.getAuthHeader;
				$fetch(`${ADMIN_SHIPPING_COMPANY_ENDPOINT}/`, {
					method: "post",
					baseURL: config.public.baseURL,
					headers: {
						...authHeader,
					},
					body: payload,
				})
					.then((data) => {
						resolve(data);
					})
					.catch((e) => {
						console.log(e);
						reject(e);
					});
			});
		},
		async fetchShippingCompany() {
			return new Promise((resolve, reject) => {
				const config = useRuntimeConfig();
				const userStore = useUserStore();
				const authHeader = userStore.getAuthHeader;
				$fetch(`${ADMIN_SHIPPING_COMPANY_ENDPOINT}/`, {
					baseURL: config.public.baseURL,
					headers: {
						...authHeader,
					},
				})
					.then((data) => {
						resolve(data);
					})
					.catch((e) => {
						console.log(e);
						reject(e);
					});
			});
		},
		async updateShippingCompany(payload) {
			return new Promise((resolve, reject) => {
				const config = useRuntimeConfig();
				const userStore = useUserStore();
				const authHeader = userStore.getAuthHeader;
				$fetch(`${ADMIN_SHIPPING_COMPANY_ENDPOINT}/${payload?.id}/`, {
					method: "patch",
					baseURL: config.public.baseURL,
					headers: {
						...authHeader,
					},
					body: payload?.data,
				})
					.then((data) => {
						resolve(data);
					})
					.catch((e) => {
						console.log(e);
						reject(e);
					});
			});
		},
		async deleteShippingCompany(id) {
			return new Promise((resolve, reject) => {
				const config = useRuntimeConfig();
				const userStore = useUserStore();
				const authHeader = userStore.getAuthHeader;
				$fetch(`${ADMIN_SHIPPING_COMPANY_ENDPOINT}/${id}/`, {
					method: "delete",
					baseURL: config.public.baseURL,
					headers: {
						...authHeader,
					},
				})
					.then((data) => {
						resolve(data);
					})
					.catch((e) => {
						console.log(e);
						reject(e);
					});
			});
		},
		async addManualShippingProvider(payload) {
			return new Promise((resolve, reject) => {
				const config = useRuntimeConfig();
				const userStore = useUserStore();
				const authHeader = userStore.getAuthHeader;
				$fetch(
					`${ADMIN_ADD_COURIER_IN_ORDERS_ENDPOINT}/add_manual_shipping_provider/`,
					{
						method: "post",
						baseURL: config.public.baseURL,
						headers: {
							...authHeader,
						},
						body: payload,
					},
				)
					.then((data) => {
						resolve(data);
					})
					.catch((e) => {
						console.log(e);
						reject(e);
					});
			});
		},
	},
});
