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
							<div class="text-h6 text-surface-bright">Create product</div>
						</div>
					</div>
				</v-sheet>
				<v-form @submit.prevent="handleFormSubmit">
					<v-row>
						<v-col cols="12" md="8">
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
								</v-row>
							</v-sheet>

							<v-sheet rounded="lg" class="pa-6 mb-5">
								<ProductSelectImage source="create" v-model="images" />
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
							<v-sheet rounded="lg" class="pa-6 ma-0 d-none d-md-block">
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
									Create Product
								</v-btn>
							</v-sheet>
						</v-col>
						<v-col cols="12" md="4">
							<v-sheet rounded="lg" class="pa-4">
								<ProductCreateAttributeBase v-model="attributes" />
							</v-sheet>
							<v-col cols="12" class="pl-0 pr-0 ml-0 mr-0">
								<v-sheet rounded="lg" class="pa-4">
									<ProductCreateStaticAttributeBase
										v-model="static_attributes"
									/>
								</v-sheet>
							</v-col>
							<v-sheet rounded="lg" class="pa-6 ma-0 d-block d-md-none">
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
									Create Product
								</v-btn>
							</v-sheet>
						</v-col>
					</v-row>
				</v-form>
			</v-col>
		</v-row>
		<ModalsCustomLoader v-if="loading" :isOpenModal="loading" />
	</div>
</template>

<script setup>
import { useField, useForm } from "vee-validate";
import * as yup from "yup";
import { useProductStore } from "@/stores/product";
import { useRoute } from "#vue-router";
import { useToast } from "vue-toastification";

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
const error_msg = ref("");

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
};

const handleFormSubmit = handleSubmit((values) => {
	if (!selectedCategory.value) {
		error_msg.value = "Please select category!";
		return;
	}

	if (images.value.length < 1) {
		error_msg.value = "Please select at least 1 image!";
		return;
	}

	loading.value = true;
	if (selectedBrand.value) {
		values["brand"] = selectedBrand.value.id;
	}
	values["category"] = selectedCategory.value.id;
	values["images"] = images.value.map((obj) => obj.id);
	values["product_type"] = selectedProductType.value;

	if (attributes.value.length > 0) {
		const prepareAttribute = [];
		for (var i = 0; i < attributes.value.length; i++) {
			if (attributes.value[i].values && attributes.value[i].values.length > 0) {
				const createAttObj = {
					id: attributes.value[i].id,
					values: attributes.value[i].values.map((obj) => obj.id),
				};
				prepareAttribute.push(createAttObj);
			}
		}
		values["attributes"] = prepareAttribute;
	}

	if (static_attributes.value.length > 0) {
		const prepareAttribute = [];
		for (var i = 0; i < static_attributes.value.length; i++) {
			const createAttObj = {
				id: static_attributes.value[i].id,
				input_type: static_attributes.value[i].input_type,
				values: static_attributes.value[i].values.map((obj) => obj.id),
			};
			prepareAttribute.push(createAttObj);
		}
		values["static_attributes"] = prepareAttribute;
	}

	productStore
		.createProduct(values)
		.then((d) => {
			loading.value = false;
			error_msg.value = null;
			toast.success("Successfully created the product!");
			router.push({ name: "products-slug", params: { slug: d.slug } });
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

onMounted(() => {});

useHead({
	title: "Create product",
});
</script>

<style scoped lang="scss"></style>
