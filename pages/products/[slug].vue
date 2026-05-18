<template>
	<div>
		<v-row class="pa-0 ma-0 pl-0 pr-0 pl-md-5 pr-md-5">
			<v-col cols="12" class="d-flex flex-column ga-5">
				<v-sheet rounded="lg" class="pa-4 d-flex justify-space-between">
					<div class="d-flex ga-5">
						<div class="cursor-pointer pa-0 ma-0 my-auto" @click="handleBack">
							<v-icon color="info" size="large">mdi-keyboard-backspace </v-icon>
						</div>
						<div class="pa-0 ma-0 my-auto">
							<div class="text-h6 text-surface-bright">Product Detail</div>
						</div>
					</div>
					<div
						class="pa-0 ma-0 cursor-pointer"
						@click="openDeleteConfirmationModal"
					>
						<v-icon color="error" size="large">mdi-trash-can</v-icon>
						<v-tooltip activator="parent" location="bottom"
							>Remove Product</v-tooltip
						>
					</div>
				</v-sheet>
				<v-form @submit.prevent="handleFormSubmit">
					<v-row>
						<v-col cols="12" sm="12" md="8" lg="8" xl="8">
							<v-sheet rounded="lg" class="pa-6 mb-5">
								<v-row>
									<v-col cols="12" class="pb-0 ma-0">
										<v-text-field
											v-model="formData.name.value.value"
											:error-messages="formData.name.errorMessage.value"
											class="text-surface-bright"
											label="Product name"
											variant="outlined"
											density="compact"
										></v-text-field>
									</v-col>
									<v-col cols="12" class="pb-0 pt-0 ma-0">
										<v-textarea
											v-model="formData.short_description.value.value"
											:error-messages="
												formData.short_description.errorMessage.value
											"
											class="text-surface-bright"
											label="Short description"
											variant="outlined"
										></v-textarea>
									</v-col>
									<v-col cols="6" class="pb-0 pt-0 ma-0">
										<ProductSelectCategory v-model="selectedCategory" />
									</v-col>
									<v-col cols="6" class="pb-0 pt-0 ma-0">
										<ProductSelectBrand v-model="selectedBrand" />
									</v-col>

									<v-col cols="12" class="pb-0 pt-0 ma-0">
										<ProductSelectProductType v-model="selectedProductType" />
									</v-col>

									<v-col cols="6" class="pb-0 pt-0 ma-0">
										<v-switch
											v-model="formData.is_published.value.value"
											color="primary"
											:label="`Is Published: ${formData.is_published.value.value}`"
											hide-details
										></v-switch>
									</v-col>
								</v-row>
								<v-row>
									<v-col
										cols="12"
										align="center"
										@click="contentModalOpen = true"
									>
										<v-btn color="surface-bright"> Add Product Content </v-btn>
									</v-col>
								</v-row>
							</v-sheet>

							<v-sheet rounded="lg" class="pa-6 mb-5">
								<ProductSelectImage
									source="edit"
									v-model="images"
									@refreshData="handleRefreshData"
								/>
							</v-sheet>

							<v-sheet rounded="lg" class="pa-6 mb-5">
								<ProductVariant :data="data?.item?.variants" />
							</v-sheet>

							<v-sheet rounded="lg" class="pa-6 mb-5">
								<v-row>
									<v-col cols="6" class="pb-0 ma-0">
										<v-text-field
											v-model="formData.weight.value.value"
											:error-messages="formData.weight.errorMessage.value"
											class="text-surface-bright"
											label="Weight"
											variant="outlined"
											density="compact"
										></v-text-field>
									</v-col>
									<v-col cols="6" class="pb-0 ma-0">
										<v-text-field
											v-model="formData.height.value.value"
											:error-messages="formData.height.errorMessage.value"
											class="text-surface-bright"
											label="Height"
											variant="outlined"
											density="compact"
										></v-text-field>
									</v-col>
									<v-col cols="6" class="pb-0 pt-0 ma-0">
										<v-text-field
											v-model="formData.width.value.value"
											:error-messages="formData.width.errorMessage.value"
											class="text-surface-bright"
											label="Width"
											variant="outlined"
											density="compact"
										></v-text-field>
									</v-col>
									<v-col cols="6" class="pb-0 pt-0 ma-0">
										<v-text-field
											v-model="formData.length.value.value"
											:error-messages="formData.length.errorMessage.value"
											class="text-surface-bright"
											label="Length"
											variant="outlined"
											density="compact"
										></v-text-field>
									</v-col>
								</v-row>
							</v-sheet>
							<v-sheet rounded="lg" class="pa-6 mb-5">
								<v-row>
									<v-col cols="6" class="pb-0 ma-0">
										<v-text-field
											v-model="formData.meta_title.value.value"
											:error-messages="formData.meta_title.errorMessage.value"
											class="text-surface-bright"
											label="Meta title"
											variant="outlined"
											density="compact"
										></v-text-field>
									</v-col>
									<v-col cols="6" class="pb-0 ma-0">
										<v-text-field
											v-model="formData.meta_keywords.value.value"
											:error-messages="
												formData.meta_keywords.errorMessage.value
											"
											class="text-surface-bright"
											label="Meta keywords"
											variant="outlined"
											density="compact"
										></v-text-field>
									</v-col>
									<v-col cols="12" class="pb-0 pt-0 ma-0">
										<v-text-field
											v-model="formData.meta_description.value.value"
											:error-messages="
												formData.meta_description.errorMessage.value
											"
											class="text-surface-bright"
											label="Meta description"
											variant="outlined"
											density="compact"
										></v-text-field>
									</v-col>
								</v-row>
							</v-sheet>
							<v-sheet
								rounded="lg"
								class="pa-6 ma-0 d-none d-sm-none d-md-flex d-lg-flex d-xl-flex d-xxl-flex"
							>
								<v-alert
									v-if="error_msg"
									:text="error_msg"
									type="error"
									class="mb-5"
								></v-alert>
								<v-btn
									:loading="loading"
									variant="tonal"
									class="text-surface-bright"
									type="submit"
								>
									SAVE CHANGES
								</v-btn>
							</v-sheet>
						</v-col>
						<v-col cols="12" sm="12" md="4" lg="4" xl="4">
							<v-sheet rounded="lg" class="pa-4">
								<ProductEditAttributeBase
									:data="attributes"
									:product="data?.item?.id"
									@refreshData="handleRefreshData"
								/>
							</v-sheet>

							<v-col cols="12" class="pl-0 pr-0 ml-0 mr-0">
								<v-sheet rounded="lg" class="pa-4">
									<ProductEditStaticAttributeBase
										:data="static_attributes"
										:product="data?.item?.id"
										@refreshData="handleRefreshData"
									/>
								</v-sheet>
							</v-col>

							<v-sheet
								rounded="lg"
								class="pa-6 ma-0 mt-5 d-md-none d-lg-none d-xl-none d-xxl-none"
							>
								<v-alert
									v-if="error_msg"
									:text="error_msg"
									type="error"
									class="mb-5"
								></v-alert>
								<v-btn
									:loading="loading"
									variant="tonal"
									class="text-surface-bright"
									type="submit"
								>
									SAVE CHANGES
								</v-btn>
							</v-sheet>
						</v-col>
					</v-row>
				</v-form>
			</v-col>
		</v-row>
		<ModalsYesNoModal
			v-if="deleteProductConfirmModalOpen"
			:isOpenModal="deleteProductConfirmModalOpen"
			@close="handleDeleteProductConfirmation"
		/>
		<ModalsCustomLoader v-if="loading" :isOpenModal="loading" />
		<ModalsProductContentModal
			v-if="contentModalOpen"
			:isOpenModal="contentModalOpen"
			:product="data?.item?.id"
			:data="data?.item?.contents"
			@close="hadleCloseContentModal"
			@refreshData="handleRefreshData"
		/>
	</div>
</template>

<script setup>
import { useField, useForm } from "vee-validate";
import * as yup from "yup";
import { useProductStore } from "@/stores/product";
import { useRoute } from "#vue-router";
import { useToast } from "vue-toastification";

const nuxtApp = useNuxtApp();
const route = useRoute();
const router = useRouter();
const productStore = useProductStore();
const toast = useToast();

var loading = ref(false);
const selectedBrand = ref(null);
const selectedCategory = ref(null);
const selectedProductType = ref(1);
const images = ref([]);
const attributes = ref([]);
const static_attributes = ref([]);
const contentModalOpen = ref(false);
const error_msg = ref("");
const deleteProductConfirmModalOpen = ref(false);

const validationSchema = yup.object().shape({
	name: yup.string().required(),
	short_description: yup.string().required(),
	weight: yup.number().nullable().typeError("Weight must be a number"),
	height: yup.number().nullable().typeError("Height must be a number"),
	width: yup.number().nullable().typeError("Width must be a number"),
	length: yup.number().nullable().typeError("Length must be a number"),
	meta_title: yup.string().nullable(),
	meta_description: yup.string().nullable(),
	meta_keywords: yup.string().nullable(),
	is_published: yup.boolean(),
});

const { handleSubmit, handleReset } = useForm({
	validationSchema,
});

var formData = {
	name: useField("name", validationSchema),
	short_description: useField("short_description", validationSchema),
	weight: useField("weight", validationSchema),
	height: useField("height", validationSchema),
	width: useField("width", validationSchema),
	length: useField("length", validationSchema),
	meta_title: useField("meta_title", validationSchema),
	meta_description: useField("meta_description", validationSchema),
	meta_keywords: useField("meta_keywords", validationSchema),
	is_published: useField("is_published", validationSchema),
};

const handleFormSubmit = handleSubmit((values) => {
	if (!selectedCategory.value) {
		error_msg.value = "Please select category!";
		return;
	}

	loading.value = true;
	if (selectedBrand.value) {
		values["brand"] = selectedBrand.value.id;
	}
	values["category"] = selectedCategory.value.id;

	values["product_type"] = selectedProductType.value;

	const params = {
		slug: route.params.slug,
		data: values,
	};

	productStore
		.updateProductDetail(params)
		.then((d) => {
			loading.value = false;
			error_msg.value = null;
			if (d.slug != data.value.item.slug) {
				router.push({ name: "products-slug", params: { slug: d.slug } });
			}
			toast.success("Successfully updated the product!");
		})
		.catch((e) => {
			loading.value = false;
			console.log(e);
			error_msg.value = "";
			var err_msg = "";
			if (e.response.status === 400) {
				for (const [key, value] of Object.entries(e.response._data)) {
					const err = `${value}`;
					err_msg = err_msg + err;
				}
				error_msg.value = err_msg;
			} else {
				var msg = `Something went wrong!`;
				error_msg.value = msg;
			}
		});
});

const handleBack = () => {
	router.push({ name: "products" });
};

const setFormData = () => {
	formData.name.value.value = data?.value?.item?.name;
	formData.short_description.value.value = data?.value?.item?.short_description;
	formData.weight.value.value = data?.value?.item?.weight;
	formData.height.value.value = data?.value?.item?.height;
	formData.width.value.value = data?.value?.item?.width;
	formData.length.value.value = data?.value?.item?.length;
	formData.meta_title.value.value = data?.value?.item?.meta_title;
	formData.meta_description.value.value = data?.value?.item?.meta_description;
	formData.meta_keywords.value.value = data?.value?.item?.meta_keywords;
	formData.is_published.value.value = data?.value?.item?.is_published;
	selectedCategory.value = data?.value?.item?.category_detail;
	selectedBrand.value = data?.value?.item?.brand_detail;
	selectedProductType.value = data?.value?.item?.product_type;
	images.value = data?.value?.item?.images;
	attributes.value = data?.value?.item?.attributes;
	static_attributes.value = data?.value?.item?.static_attributes;
};

const handleFetchProduct = async () => {
	await productStore
		.fetchProductDetail(route?.params?.slug)
		.then((d) => {
			data.value.item = d;
			setFormData();
		})
		.catch((e) => {
			console.log(e);
		});
};

const handleRefreshData = () => {
	handleFetchProduct();
};

const hadleCloseContentModal = () => {
	contentModalOpen.value = false;
};

const openDeleteConfirmationModal = () => {
	deleteProductConfirmModalOpen.value = true;
};

const handleProductDelete = () => {
	loading.value = true;
	productStore
		.deleteProduct(route?.params?.slug)
		.then((d) => {
			loading.value = false;
			handleBack();
			toast.success("Successfully deleted the product!");
		})
		.catch((e) => {
			loading.value = false;
			console.log(e);
			toast.error("Something went wrong!");
		});
};

const handleDeleteProductConfirmation = (status) => {
	if (status == true) {
		handleProductDelete();
	}
	deleteProductConfirmModalOpen.value = false;
};

const { data, error } = await useAsyncData("pageItems", async () => {
	var item = null;

	await nuxtApp.runWithContext(async () => {
		await productStore
			.fetchProductDetail(route?.params?.slug)
			.then((d) => {
				item = d;
			})
			.catch((e) => {
				console.log(e);
			});
	});

	return {
		item,
	};
});

onMounted(() => {
	if (data.value.item) {
		setFormData();
	}
});

useHead({
	title: "Product details",
});
</script>

<style scoped lang="scss"></style>
