import {
	ADMIN_ORDERS_ENDPOINT,
	ADMIN_DASHBOARD_ANALYTICS_ENDPOINT,
	ADMIN_BUSINESS_ANALYTICS_ENDPOINT,
	ADMIN_ORDER_ANALYTICS_ENDPOINT,
	ADMIN_PRODUCT_ANALYTICS_ENDPOINT,
	ADMIN_LOW_STOCKED_ANALYTICS_ENDPOINT,
	ADMIN_USER_ANALYTICS_ENDPOINT,
	ADMIN_SHIPPING_ANALYTICS_ENDPOINT,
	ADMIN_COUPON_ANALYTICS_ENDPOINT,
	ADMIN_APPLIED_COUPON_ENDPOINT,
	ADMIN_EMAILS_ENDPOINT,
	PUBLIC_SHIPPING_RATE_ENDPOINT,
	ADMIN_SALE_REPORT_ENDPOINT,
} from "@/utils/store/endpoints";
import { buildParams } from "../utils/utils";
import { useUserStore } from "./user";

export const useSaleStore = defineStore("saleStores", {
	state: () => {
		return {};
	},
	getters: {},
	actions: {
		async fetchOrders(params = {}) {
			return new Promise((resolve, reject) => {
				const config = useRuntimeConfig();
				const userStore = useUserStore();
				const authHeader = userStore.getAuthHeader;
				$fetch(`${ADMIN_ORDERS_ENDPOINT}/${buildParams(params)}`, {
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
		async orderDetails(slug) {
			return new Promise((resolve, reject) => {
				const config = useRuntimeConfig();
				const userStore = useUserStore();
				const authHeader = userStore.getAuthHeader;
				$fetch(`${ADMIN_ORDERS_ENDPOINT}/${slug}/`, {
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
		async changePaymentStatus(payload) {
			return new Promise((resolve, reject) => {
				const config = useRuntimeConfig();
				const userStore = useUserStore();
				const authHeader = userStore.getAuthHeader;
				$fetch(`${ADMIN_ORDERS_ENDPOINT}/change_payment_status/`, {
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
		async changeOrder(payload) {
			return new Promise((resolve, reject) => {
				const config = useRuntimeConfig();
				const userStore = useUserStore();
				const authHeader = userStore.getAuthHeader;
				$fetch(`${ADMIN_ORDERS_ENDPOINT}/${payload.orderID}/`, {
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
		async changeOrderStatus(payload) {
			return new Promise((resolve, reject) => {
				const config = useRuntimeConfig();
				const userStore = useUserStore();
				const authHeader = userStore.getAuthHeader;
				$fetch(`${ADMIN_ORDERS_ENDPOINT}/change_order_status/`, {
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
		async addShippingProvider(payload) {
			return new Promise((resolve, reject) => {
				const config = useRuntimeConfig();
				const userStore = useUserStore();
				const authHeader = userStore.getAuthHeader;
				$fetch(`${ADMIN_ORDERS_ENDPOINT}/add_shipping_provider/`, {
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
		async dashboardAnalytics(params = {}) {
			return new Promise((resolve, reject) => {
				const config = useRuntimeConfig();
				const userStore = useUserStore();
				const authHeader = userStore.getAuthHeader;
				$fetch(`${ADMIN_DASHBOARD_ANALYTICS_ENDPOINT}/${buildParams(params)}`, {
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
		async businessAnalytics(params = {}) {
			return new Promise((resolve, reject) => {
				const config = useRuntimeConfig();
				const userStore = useUserStore();
				const authHeader = userStore.getAuthHeader;
				$fetch(`${ADMIN_BUSINESS_ANALYTICS_ENDPOINT}/${buildParams(params)}`, {
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
		async orderAnalytics(params = {}) {
			return new Promise((resolve, reject) => {
				const config = useRuntimeConfig();
				const userStore = useUserStore();
				const authHeader = userStore.getAuthHeader;
				$fetch(`${ADMIN_ORDER_ANALYTICS_ENDPOINT}/${buildParams(params)}`, {
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
		async productAnalytics() {
			return new Promise((resolve, reject) => {
				const config = useRuntimeConfig();
				const userStore = useUserStore();
				const authHeader = userStore.getAuthHeader;
				$fetch(`${ADMIN_PRODUCT_ANALYTICS_ENDPOINT}/`, {
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
		async lowStockedAnalytics(params = {}) {
			return new Promise((resolve, reject) => {
				const config = useRuntimeConfig();
				const userStore = useUserStore();
				const authHeader = userStore.getAuthHeader;
				$fetch(
					`${ADMIN_LOW_STOCKED_ANALYTICS_ENDPOINT}/${buildParams(params)}`,
					{
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
		async userAnalytics(params = {}) {
			return new Promise((resolve, reject) => {
				const config = useRuntimeConfig();
				const userStore = useUserStore();
				const authHeader = userStore.getAuthHeader;
				$fetch(`${ADMIN_USER_ANALYTICS_ENDPOINT}/${buildParams(params)}`, {
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
		async shippingAnalytics() {
			return new Promise((resolve, reject) => {
				const config = useRuntimeConfig();
				const userStore = useUserStore();
				const authHeader = userStore.getAuthHeader;
				$fetch(`${ADMIN_SHIPPING_ANALYTICS_ENDPOINT}/`, {
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
		async couponAnalytics(params = {}) {
			return new Promise((resolve, reject) => {
				const config = useRuntimeConfig();
				const userStore = useUserStore();
				const authHeader = userStore.getAuthHeader;
				$fetch(`${ADMIN_COUPON_ANALYTICS_ENDPOINT}/${buildParams(params)}`, {
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
		async couponDetail(params = {}) {
			return new Promise((resolve, reject) => {
				const config = useRuntimeConfig();
				const userStore = useUserStore();
				const authHeader = userStore.getAuthHeader;
				$fetch(`${ADMIN_COUPON_ANALYTICS_ENDPOINT}/${params?.id}/`, {
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
		async appliedCoupon(params = {}) {
			return new Promise((resolve, reject) => {
				const config = useRuntimeConfig();
				const userStore = useUserStore();
				const authHeader = userStore.getAuthHeader;
				$fetch(`${ADMIN_APPLIED_COUPON_ENDPOINT}/${buildParams(params)}`, {
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
		async fetchAllEmails(params = {}) {
			return new Promise((resolve, reject) => {
				const config = useRuntimeConfig();
				const userStore = useUserStore();
				const authHeader = userStore.getAuthHeader;
				$fetch(`${ADMIN_EMAILS_ENDPOINT}/${buildParams(params)}`, {
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
		async getSaleReport(payload) {
			return new Promise((resolve, reject) => {
				const config = useRuntimeConfig();
				const userStore = useUserStore();
				const authHeader = userStore.getAuthHeader;

				$fetch(`${ADMIN_SALE_REPORT_ENDPOINT}/${buildParams(payload)}`, {
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
	},
});
