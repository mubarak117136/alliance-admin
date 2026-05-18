import {
	PUBLIC_USER_ENDPOINT,
	ADMIN_USER_ENDPOINT,
	ADMIN_RATING_ENDPOINT,
	ADMIN_MARKETING_ENDPOINT,
} from "~/utils/store/endpoints";
import { buildParams } from "../utils/utils";

export const useUserStore = defineStore("userStores", {
	state: () => {
		return {
			user: {
				token: null,
				profile: null,
			},
		};
	},
	getters: {
		getProfile(state) {
			return state.user.profile;
		},
		getToken(state) {
			return state.user.token;
		},
		getAuthHeader(state) {
			if (state.user.token == null) return null;
			return { Authorization: `Token ${state.user.token}` };
		},
	},
	actions: {
		async signin(payload) {
			return new Promise((resolve, reject) => {
				const config = useRuntimeConfig();
				$fetch(`${ADMIN_USER_ENDPOINT}/signin/`, {
					method: "post",
					baseURL: config.public.baseURL,
					body: payload,
				})
					.then((data) => {
						useCookie(config.public.tokenName, {
							default: () => data.token,
							path: "/",
							maxAge: 60 * 60 * 24 * 365,
							watch: false,
						});
						this.user.token = data.token;
						this.user.profile = data;
						resolve(data);
					})
					.catch((e) => {
						this.user.token = null;
						this.user.profile = null;
						useCookie(config.public.tokenName, {
							default: () => null,
							path: "/",
							maxAge: -1,
							watch: false,
						});
						reject(e);
					});
			});
		},
		async getTokenFromLocalStorage() {
			return new Promise((resolve, reject) => {
				const config = useRuntimeConfig();
				var localToken = useCookie(config.public.tokenName);
				if (localToken != null) {
					this.user.token = localToken;
					resolve(localToken);
				} else {
					console.log("TOKEN FROM LOCAL STORE ERROR");
					reject("Local Token Error");
				}
			});
		},
		async profile() {
			return new Promise((resolve, reject) => {
				const config = useRuntimeConfig();
				$fetch(`${PUBLIC_USER_ENDPOINT}/profile/`, {
					baseURL: config.public.baseURL,
					headers: {
						...this.getAuthHeader,
					},
				})
					.then((data) => {
						this.user.profile = data;
						resolve(data);
					})
					.catch((e) => {
						console.log(e);
						this.user.token = null;
						this.user.profile = null;
						useCookie(config.public.tokenName, {
							default: () => null,
							path: "/",
							maxAge: -1,
							watch: false,
						});
						reject(e);
					});
			});
		},
		async signOut() {
			return new Promise((resolve, reject) => {
				const config = useRuntimeConfig();
				this.user.token = null;
				this.user.profile = null;
				useCookie(config.public.tokenName, {
					default: () => null,
					path: "/",
					maxAge: -1,
					watch: false,
				});
				resolve();
			});
		},
		async fetchUsers(params = {}) {
			return new Promise((resolve, reject) => {
				const config = useRuntimeConfig();
				const userStore = useUserStore();
				const authHeader = userStore.getAuthHeader;
				$fetch(`${ADMIN_USER_ENDPOINT}/${buildParams(params)}`, {
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
		async fetchUser(id) {
			return new Promise((resolve, reject) => {
				const config = useRuntimeConfig();
				const userStore = useUserStore();
				const authHeader = userStore.getAuthHeader;
				$fetch(`${ADMIN_USER_ENDPOINT}/${id}/`, {
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
		async updateUser(payload = {}) {
			return new Promise((resolve, reject) => {
				const config = useRuntimeConfig();
				const userStore = useUserStore();
				const authHeader = userStore.getAuthHeader;
				$fetch(`${ADMIN_USER_ENDPOINT}/${payload.id}/`, {
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
		async fetchPermissions() {
			return new Promise((resolve, reject) => {
				const config = useRuntimeConfig();
				const userStore = useUserStore();
				const authHeader = userStore.getAuthHeader;
				$fetch(`${ADMIN_USER_ENDPOINT}/all_permissions/`, {
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
		async updatePermissions(payload) {
			return new Promise((resolve, reject) => {
				const config = useRuntimeConfig();
				const userStore = useUserStore();
				const authHeader = userStore.getAuthHeader;
				$fetch(`${ADMIN_USER_ENDPOINT}/change_user_permission/`, {
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
		async fetchRatings(params = {}) {
			return new Promise((resolve, reject) => {
				const config = useRuntimeConfig();
				const userStore = useUserStore();
				const authHeader = userStore.getAuthHeader;
				$fetch(`${ADMIN_RATING_ENDPOINT}/${buildParams(params)}`, {
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
		async updateRatingStatus(payload) {
			return new Promise((resolve, reject) => {
				const config = useRuntimeConfig();
				const userStore = useUserStore();
				const authHeader = userStore.getAuthHeader;
				$fetch(`${ADMIN_RATING_ENDPOINT}/change_rating_status/`, {
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
		async sendMarketingEmail(payload) {
			return new Promise((resolve, reject) => {
				const config = useRuntimeConfig();
				const userStore = useUserStore();
				const authHeader = userStore.getAuthHeader;
				$fetch(`${ADMIN_MARKETING_ENDPOINT}/send_emails/`, {
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
	},
});
