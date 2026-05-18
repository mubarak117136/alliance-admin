import {
	ADMIN_CATEGORY_ENDPOINT,
	ADMIN_BRAND_ENDPOINT,
	ADMIN_ATTRIBUTE_ENDPOINT,
	ADMIN_ATTRIBUTE_VALUE_ENDPOINT,
	ADMIN_PRODUCT_PRODUCT_ENDPOINT,
	ADMIN_CAMPAIGN_ENDPOINT,
	ADMIN_CAMPAIGN_PRODUCT_THROUGH_ENDPOINT,
	ADMIN_CAMPAIGN_VARIANT_THROUGH_ENDPOINT,
	PUBLIC_PRODUCTS_ENDPOINT,
	ADMIN_FREE_SHIPPING_CAMPAIGN_PRODUCT_THROUGH_ENDPOINT,
} from "@/utils/store/endpoints";
import { buildParams } from "../utils/utils";
import { useUserStore } from "./user";

export const useProductStore = defineStore("productStores", {
	state: () => {
		return {
			categories: null,
		};
	},
	getters: {
		getCategories(state) {
			return state.categories;
		},
	},
	actions: {
		async fetchCategoryList(params = {}) {
			return new Promise((resolve, reject) => {
				const config = useRuntimeConfig();
				const userStore = useUserStore();
				const authHeader = userStore.getAuthHeader;
				$fetch(`${ADMIN_CATEGORY_ENDPOINT}/${buildParams(params)}`, {
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
		async fetchCategories() {
			return new Promise((resolve, reject) => {
				const config = useRuntimeConfig();
				$fetch(`${ADMIN_CATEGORY_ENDPOINT}/all/`, {
					baseURL: config.public.baseURL,
				})
					.then((data) => {
						this.categories = data;
						resolve(data);
					})
					.catch((e) => {
						console.log(e);
						reject(e);
					});
			});
		},
		async updateCategories(payload) {
			return new Promise((resolve, reject) => {
				const config = useRuntimeConfig();
				const userStore = useUserStore();
				const authHeader = userStore.getAuthHeader;
				$fetch(`${ADMIN_CATEGORY_ENDPOINT}/${payload.id}/`, {
					method: "patch",
					baseURL: config.public.baseURL,
					headers: {
						...authHeader,
					},
					body: payload.data,
				})
					.then((data) => {
						this.fetchCategories();
						resolve(data);
					})
					.catch((e) => {
						console.log(e);
						reject(e);
					});
			});
		},
		async deleteCategory(id) {
			return new Promise((resolve, reject) => {
				const config = useRuntimeConfig();
				const userStore = useUserStore();
				const authHeader = userStore.getAuthHeader;
				$fetch(`${ADMIN_CATEGORY_ENDPOINT}/${id}/`, {
					method: "delete",
					baseURL: config.public.baseURL,
					headers: {
						...authHeader,
					},
				})
					.then((data) => {
						this.fetchCategories();
						resolve(data);
					})
					.catch((e) => {
						console.log(e);
						reject(e);
					});
			});
		},
		async createCategory(payload) {
			return new Promise((resolve, reject) => {
				const config = useRuntimeConfig();
				const userStore = useUserStore();
				const authHeader = userStore.getAuthHeader;
				$fetch(`${ADMIN_CATEGORY_ENDPOINT}/`, {
					method: "post",
					baseURL: config.public.baseURL,
					headers: {
						...authHeader,
					},
					body: payload,
				})
					.then((data) => {
						this.fetchCategories();
						resolve(data);
					})
					.catch((e) => {
						console.log(e);
						reject(e);
					});
			});
		},
		async fetchBrands(params) {
			return new Promise((resolve, reject) => {
				const config = useRuntimeConfig();
				const userStore = useUserStore();
				const authHeader = userStore.getAuthHeader;
				$fetch(`${ADMIN_BRAND_ENDPOINT}/${buildParams(params)}`, {
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
		async createBrand(payload) {
			return new Promise((resolve, reject) => {
				const config = useRuntimeConfig();
				const userStore = useUserStore();
				const authHeader = userStore.getAuthHeader;
				$fetch(`${ADMIN_BRAND_ENDPOINT}/`, {
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
		async fetchBrandDetail(slug) {
			return new Promise((resolve, reject) => {
				const config = useRuntimeConfig();
				const userStore = useUserStore();
				const authHeader = userStore.getAuthHeader;
				$fetch(`${ADMIN_BRAND_ENDPOINT}/${slug}/`, {
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
		async updateBrand(payload) {
			return new Promise((resolve, reject) => {
				const config = useRuntimeConfig();
				const userStore = useUserStore();
				const authHeader = userStore.getAuthHeader;
				$fetch(`${ADMIN_BRAND_ENDPOINT}/${payload.slug}/`, {
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
		async deleteBrand(slug) {
			return new Promise((resolve, reject) => {
				const config = useRuntimeConfig();
				const userStore = useUserStore();
				const authHeader = userStore.getAuthHeader;
				$fetch(`${ADMIN_BRAND_ENDPOINT}/${slug}/`, {
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
		async fetchAttributes(params = {}) {
			return new Promise((resolve, reject) => {
				const config = useRuntimeConfig();
				const userStore = useUserStore();
				const authHeader = userStore.getAuthHeader;
				$fetch(`${ADMIN_ATTRIBUTE_ENDPOINT}/${buildParams(params)}`, {
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
		async createAttribute(payload) {
			return new Promise((resolve, reject) => {
				const config = useRuntimeConfig();
				const userStore = useUserStore();
				const authHeader = userStore.getAuthHeader;
				$fetch(`${ADMIN_ATTRIBUTE_ENDPOINT}/`, {
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
		async fetchAttributeDetail(slug) {
			return new Promise((resolve, reject) => {
				const config = useRuntimeConfig();
				const userStore = useUserStore();
				const authHeader = userStore.getAuthHeader;
				$fetch(`${ADMIN_ATTRIBUTE_ENDPOINT}/${slug}/`, {
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
		async updateAttribute(payload) {
			return new Promise((resolve, reject) => {
				const config = useRuntimeConfig();
				const userStore = useUserStore();
				const authHeader = userStore.getAuthHeader;
				$fetch(`${ADMIN_ATTRIBUTE_ENDPOINT}/${payload.slug}/`, {
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
		async deleteAttribute(slug) {
			return new Promise((resolve, reject) => {
				const config = useRuntimeConfig();
				const userStore = useUserStore();
				const authHeader = userStore.getAuthHeader;
				$fetch(`${ADMIN_ATTRIBUTE_ENDPOINT}/${slug}/`, {
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
		async fetchAttributeValues(params = {}) {
			return new Promise((resolve, reject) => {
				const config = useRuntimeConfig();
				const userStore = useUserStore();
				const authHeader = userStore.getAuthHeader;
				$fetch(`${ADMIN_ATTRIBUTE_VALUE_ENDPOINT}/${buildParams(params)}`, {
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
		async createAttributeValue(payload) {
			return new Promise((resolve, reject) => {
				const config = useRuntimeConfig();
				const userStore = useUserStore();
				const authHeader = userStore.getAuthHeader;
				$fetch(`${ADMIN_ATTRIBUTE_VALUE_ENDPOINT}/`, {
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
		async fetchAttributeValueDetail(slug) {
			return new Promise((resolve, reject) => {
				const config = useRuntimeConfig();
				const userStore = useUserStore();
				const authHeader = userStore.getAuthHeader;
				$fetch(`${ADMIN_ATTRIBUTE_VALUE_ENDPOINT}/${slug}/`, {
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
		async updateAttributeValue(payload) {
			return new Promise((resolve, reject) => {
				const config = useRuntimeConfig();
				const userStore = useUserStore();
				const authHeader = userStore.getAuthHeader;
				$fetch(
					`${ADMIN_ATTRIBUTE_VALUE_ENDPOINT}/${payload.slug}/?attribute=${payload.attribute}`,
					{
						method: "patch",
						baseURL: config.public.baseURL,
						headers: {
							...authHeader,
						},
						body: payload.data,
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
		async deleteAttributeValue(payload) {
			return new Promise((resolve, reject) => {
				const config = useRuntimeConfig();
				const userStore = useUserStore();
				const authHeader = userStore.getAuthHeader;
				$fetch(
					`${ADMIN_ATTRIBUTE_VALUE_ENDPOINT}/${payload.slug}/?attribute=${payload.attribute}`,
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
		async createProduct(payload) {
			return new Promise((resolve, reject) => {
				const config = useRuntimeConfig();
				const userStore = useUserStore();
				const authHeader = userStore.getAuthHeader;
				$fetch(`${ADMIN_PRODUCT_PRODUCT_ENDPOINT}/create_product/`, {
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
		async copyProduct(payload) {
			return new Promise((resolve, reject) => {
				const config = useRuntimeConfig();
				const userStore = useUserStore();
				const authHeader = userStore.getAuthHeader;
				$fetch(`${ADMIN_PRODUCT_PRODUCT_ENDPOINT}/copy_product/`, {
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
		async fetchProducts(params = {}) {
			return new Promise((resolve, reject) => {
				const config = useRuntimeConfig();
				const userStore = useUserStore();
				const authHeader = userStore.getAuthHeader;
				$fetch(`${ADMIN_PRODUCT_PRODUCT_ENDPOINT}/${buildParams(params)}`, {
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
		async fetchProductDetail(slug) {
			return new Promise((resolve, reject) => {
				const config = useRuntimeConfig();
				const userStore = useUserStore();
				const authHeader = userStore.getAuthHeader;
				$fetch(`${ADMIN_PRODUCT_PRODUCT_ENDPOINT}/${slug}/`, {
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
		async addProductImage(payload) {
			return new Promise((resolve, reject) => {
				const config = useRuntimeConfig();
				const userStore = useUserStore();
				const authHeader = userStore.getAuthHeader;
				$fetch(`${ADMIN_PRODUCT_PRODUCT_ENDPOINT}/add_product_image/`, {
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
		async deleteProductImage(payload) {
			return new Promise((resolve, reject) => {
				const config = useRuntimeConfig();
				const userStore = useUserStore();
				const authHeader = userStore.getAuthHeader;
				$fetch(`${ADMIN_PRODUCT_PRODUCT_ENDPOINT}/delete_product_image/`, {
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
		async updateProductImage(payload) {
			return new Promise((resolve, reject) => {
				const config = useRuntimeConfig();
				const userStore = useUserStore();
				const authHeader = userStore.getAuthHeader;
				$fetch(`${ADMIN_PRODUCT_PRODUCT_ENDPOINT}/update_product_image/`, {
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
		async updateProductAttribute(payload) {
			return new Promise((resolve, reject) => {
				const config = useRuntimeConfig();
				const userStore = useUserStore();
				const authHeader = userStore.getAuthHeader;
				$fetch(`${ADMIN_PRODUCT_PRODUCT_ENDPOINT}/update_product_attribute/`, {
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
		async updateProductStaticAttribute(payload) {
			return new Promise((resolve, reject) => {
				const config = useRuntimeConfig();
				const userStore = useUserStore();
				const authHeader = userStore.getAuthHeader;
				$fetch(
					`${ADMIN_PRODUCT_PRODUCT_ENDPOINT}/update_product_static_attribute/`,
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
		async updateProductDetail(payload) {
			return new Promise((resolve, reject) => {
				const config = useRuntimeConfig();
				const userStore = useUserStore();
				const authHeader = userStore.getAuthHeader;
				$fetch(`${ADMIN_PRODUCT_PRODUCT_ENDPOINT}/${payload.slug}/`, {
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
		async updateProductVariant(payload) {
			return new Promise((resolve, reject) => {
				const config = useRuntimeConfig();
				const userStore = useUserStore();
				const authHeader = userStore.getAuthHeader;
				$fetch(`${ADMIN_PRODUCT_PRODUCT_ENDPOINT}/update_product_variant/`, {
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
		async deleteProductVariant(payload) {
			return new Promise((resolve, reject) => {
				const config = useRuntimeConfig();
				const userStore = useUserStore();
				const authHeader = userStore.getAuthHeader;
				$fetch(`${ADMIN_PRODUCT_PRODUCT_ENDPOINT}/delete_product_variant/`, {
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
		async updateProductContent(payload) {
			return new Promise((resolve, reject) => {
				const config = useRuntimeConfig();
				const userStore = useUserStore();
				const authHeader = userStore.getAuthHeader;
				$fetch(`${ADMIN_PRODUCT_PRODUCT_ENDPOINT}/update_product_content/`, {
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
		async deleteProduct(slug) {
			return new Promise((resolve, reject) => {
				const config = useRuntimeConfig();
				const userStore = useUserStore();
				const authHeader = userStore.getAuthHeader;
				$fetch(`${ADMIN_PRODUCT_PRODUCT_ENDPOINT}/${slug}/`, {
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
		async fetchCampaigns(params = {}) {
			return new Promise((resolve, reject) => {
				const config = useRuntimeConfig();
				const userStore = useUserStore();
				const authHeader = userStore.getAuthHeader;
				$fetch(`${ADMIN_CAMPAIGN_ENDPOINT}/${buildParams(params)}`, {
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
		async createCampaign(payload) {
			return new Promise((resolve, reject) => {
				const config = useRuntimeConfig();
				const userStore = useUserStore();
				const authHeader = userStore.getAuthHeader;
				$fetch(`${ADMIN_CAMPAIGN_ENDPOINT}/`, {
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
		async fetchCampaignDetail(slug) {
			return new Promise((resolve, reject) => {
				const config = useRuntimeConfig();
				const userStore = useUserStore();
				const authHeader = userStore.getAuthHeader;
				$fetch(`${ADMIN_CAMPAIGN_ENDPOINT}/${slug}/`, {
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
		async deleteCampaign(slug) {
			return new Promise((resolve, reject) => {
				const config = useRuntimeConfig();
				const userStore = useUserStore();
				const authHeader = userStore.getAuthHeader;
				$fetch(`${ADMIN_CAMPAIGN_ENDPOINT}/${slug}/`, {
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
		async updateCampaign(payload) {
			return new Promise((resolve, reject) => {
				const config = useRuntimeConfig();
				const userStore = useUserStore();
				const authHeader = userStore.getAuthHeader;
				$fetch(`${ADMIN_CAMPAIGN_ENDPOINT}/${payload.slug}/`, {
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
		async fetchCampaignCategories(payload) {
			return new Promise((resolve, reject) => {
				const config = useRuntimeConfig();
				const userStore = useUserStore();
				const authHeader = userStore.getAuthHeader;
				$fetch(
					`${ADMIN_CAMPAIGN_ENDPOINT}/all_category_through/?campaign=${payload.slug}`,
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
		async createCampaignCategoryThrough(payload) {
			return new Promise((resolve, reject) => {
				const config = useRuntimeConfig();
				const userStore = useUserStore();
				const authHeader = userStore.getAuthHeader;
				$fetch(`${ADMIN_CAMPAIGN_ENDPOINT}/create_category_through/`, {
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
		async updateCampaignCategoryThrough(payload) {
			return new Promise((resolve, reject) => {
				const config = useRuntimeConfig();
				const userStore = useUserStore();
				const authHeader = userStore.getAuthHeader;
				$fetch(`${ADMIN_CAMPAIGN_ENDPOINT}/update_category_through/`, {
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
		async deleteCampaignCategoryThrough(payload) {
			return new Promise((resolve, reject) => {
				const config = useRuntimeConfig();
				const userStore = useUserStore();
				const authHeader = userStore.getAuthHeader;
				$fetch(`${ADMIN_CAMPAIGN_ENDPOINT}/delete_category_through/`, {
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
		async freeShippingFetchCampaignCategories(payload) {
			return new Promise((resolve, reject) => {
				const config = useRuntimeConfig();
				const userStore = useUserStore();
				const authHeader = userStore.getAuthHeader;
				$fetch(
					`${ADMIN_CAMPAIGN_ENDPOINT}/free_shipping_all_category_through/?campaign=${payload.slug}`,
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
		async freeShippingCreateCampaignCategoryThrough(payload) {
			return new Promise((resolve, reject) => {
				const config = useRuntimeConfig();
				const userStore = useUserStore();
				const authHeader = userStore.getAuthHeader;
				$fetch(
					`${ADMIN_CAMPAIGN_ENDPOINT}/free_shipping_create_category_through/`,
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
		async freeShippingDeleteCampaignCategoryThrough(payload) {
			return new Promise((resolve, reject) => {
				const config = useRuntimeConfig();
				const userStore = useUserStore();
				const authHeader = userStore.getAuthHeader;
				$fetch(
					`${ADMIN_CAMPAIGN_ENDPOINT}/free_shipping_delete_category_through/`,
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
		async createCampaignProductThrough(payload) {
			return new Promise((resolve, reject) => {
				const config = useRuntimeConfig();
				const userStore = useUserStore();
				const authHeader = userStore.getAuthHeader;
				$fetch(`${ADMIN_CAMPAIGN_PRODUCT_THROUGH_ENDPOINT}/`, {
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
		async freeShippingCreateCampaignProductThrough(payload) {
			return new Promise((resolve, reject) => {
				const config = useRuntimeConfig();
				const userStore = useUserStore();
				const authHeader = userStore.getAuthHeader;
				$fetch(`${ADMIN_FREE_SHIPPING_CAMPAIGN_PRODUCT_THROUGH_ENDPOINT}/`, {
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
		async fetchCampaignProducts(params = {}) {
			return new Promise((resolve, reject) => {
				const config = useRuntimeConfig();
				const userStore = useUserStore();
				const authHeader = userStore.getAuthHeader;
				$fetch(
					`${ADMIN_CAMPAIGN_PRODUCT_THROUGH_ENDPOINT}/${buildParams(params)}`,
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
		async freeShippingFetchCampaignProducts(params = {}) {
			return new Promise((resolve, reject) => {
				const config = useRuntimeConfig();
				const userStore = useUserStore();
				const authHeader = userStore.getAuthHeader;
				$fetch(
					`${ADMIN_FREE_SHIPPING_CAMPAIGN_PRODUCT_THROUGH_ENDPOINT}/${buildParams(params)}`,
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
		async deleteCampaignProductThrough(payload) {
			return new Promise((resolve, reject) => {
				const config = useRuntimeConfig();
				const userStore = useUserStore();
				const authHeader = userStore.getAuthHeader;
				$fetch(
					`${ADMIN_CAMPAIGN_PRODUCT_THROUGH_ENDPOINT}/${payload.id}/?campaign=${payload.campaign}`,
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
		async FreeShippingDeleteCampaignProductThrough(payload) {
			return new Promise((resolve, reject) => {
				const config = useRuntimeConfig();
				const userStore = useUserStore();
				const authHeader = userStore.getAuthHeader;
				$fetch(
					`${ADMIN_FREE_SHIPPING_CAMPAIGN_PRODUCT_THROUGH_ENDPOINT}/${payload.id}/?campaign=${payload.campaign}`,
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
		async fetchCampaignVariants(params = {}) {
			return new Promise((resolve, reject) => {
				const config = useRuntimeConfig();
				const userStore = useUserStore();
				const authHeader = userStore.getAuthHeader;
				$fetch(
					`${ADMIN_CAMPAIGN_VARIANT_THROUGH_ENDPOINT}/${buildParams(params)}`,
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
		async updateCampaignVariantThrough(payload) {
			return new Promise((resolve, reject) => {
				const config = useRuntimeConfig();
				const userStore = useUserStore();
				const authHeader = userStore.getAuthHeader;
				$fetch(
					`${ADMIN_CAMPAIGN_VARIANT_THROUGH_ENDPOINT}/${payload.id}/?campaign_product=${payload.campaign_product}`,
					{
						method: "patch",
						baseURL: config.public.baseURL,
						headers: {
							...authHeader,
						},
						body: payload.data,
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
