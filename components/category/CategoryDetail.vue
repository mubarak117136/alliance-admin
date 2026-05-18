<template>
	<v-row>
		<v-col cols="12">
			<v-form
				@submit.prevent="handleFormSubmit"
				class="d-flex flex-column ga-2 pa-4"
			>
				<!-- <div class="text-h6 text-surface-bright">Basic</div> -->
				<v-row>
					<v-col cols="6">
						<v-text-field
							class="text-surface-bright"
							v-model="formData.name.value.value"
							:error-messages="formData.name.errorMessage.value"
							label="Name"
							variant="outlined"
							density="compact"
						></v-text-field>
					</v-col>
					<v-col cols="6">
						<v-text-field
							class="text-surface-bright"
							v-model="formData.order_no.value.value"
							:error-messages="formData.order_no.errorMessage.value"
							label="Order no"
							variant="outlined"
							density="compact"
						></v-text-field>
					</v-col>
				</v-row>
				<v-row>
					<v-col cols="12" sm="6" md="6" lg="4">
						<v-text-field
							class="text-surface-bright"
							v-model="formData.meta_title.value.value"
							:error-messages="formData.meta_title.errorMessage.value"
							label="Meta Title"
							variant="outlined"
							density="compact"
						></v-text-field>
					</v-col>
					<v-col cols="12" sm="6" md="6" lg="4">
						<v-text-field
							class="text-surface-bright"
							v-model="formData.meta_description.value.value"
							:error-messages="formData.meta_description.errorMessage.value"
							label="Meta Description"
							variant="outlined"
							density="compact"
						></v-text-field>
					</v-col>
					<v-col cols="12" sm="6" md="6" lg="4">
						<v-text-field
							class="text-surface-bright"
							v-model="formData.meta_keywords.value.value"
							:error-messages="formData.meta_keywords.errorMessage.value"
							label="Meta Keywords"
							variant="outlined"
							density="compact"
						></v-text-field>
					</v-col>

					<v-col cols="12">
						<v-text-field
							v-model="formData.font_icon.value.value"
							:error-messages="formData.font_icon.errorMessage.value"
							label="Font Icon"
							variant="outlined"
							density="compact"
						></v-text-field>
						<p class="text-grey text-body-2">
							Format: mdi:lightning-bolt <br />Get Icon Code from here
							<a href="https://icones.js.org/" target="_blank">Source</a>
						</p>
					</v-col>

					<v-col cols="12">
						<p class="text-surface-bright text-body-2 mb-2">
							Footer SEO Content
						</p>
						<package-tiptap v-model="footer_seo_content" :key="editorKey" />
					</v-col>
				</v-row>
				<v-switch
					v-model="isActive"
					color="primary"
					:label="`Is Active: ${isActive}`"
					hide-details
				></v-switch>
				<!-- <div class="text-h6 text-surface-bright">Images</div> -->
				<v-row>
					<v-col cols="12">
						<div class="text-surface-bright mb-5">Icon</div>
						<v-btn
							@click="handleOpenImageChooser('icon')"
							prepend-icon="mdi-image"
							variant="tonal"
							v-if="!selectedIconImage"
							class="text-surface-bright"
						>
							Choose an Image
						</v-btn>
						<v-row>
							<v-col cols="12" class="d-flex align-center ga-5">
								<v-card
									height="140"
									width="140"
									theme="dark"
									elevation="5"
									class="d-flex flex-column align-center justify-center"
									v-if="selectedIconImage"
								>
									<v-img
										:src="HOST + selectedIconImage?.file_detail?.url"
										:height="selectedIconImage.height"
										max-height="140"
										:width="selectedIconImage.width"
									></v-img>
								</v-card>
								<div class="d-flex ga-5" v-if="selectedIconImage">
									<v-btn
										variant="tonal"
										size="small"
										@click="handleOpenImageChooser('icon')"
									>
										<v-icon>mdi-pencil</v-icon>
										<v-tooltip activator="parent" location="bottom"
											>Change</v-tooltip
										>
									</v-btn>
									<v-btn
										variant="tonal"
										size="small"
										color="error"
										@click="handleRemoveImage('icon')"
									>
										<v-icon color="red">mdi-trash-can</v-icon>
										<v-tooltip activator="parent" location="bottom"
											>Remove</v-tooltip
										>
									</v-btn>
								</div>
							</v-col>
						</v-row>
					</v-col>
				</v-row>
				<v-row>
					<v-col cols="12">
						<div class="text-surface-bright mb-5">Cover</div>
						<v-btn
							@click="handleOpenImageChooser('cover')"
							prepend-icon="mdi-image"
							variant="tonal"
							v-if="!selectedCoverImage"
							class="text-surface-bright"
						>
							Choose an Image
						</v-btn>
						<v-row>
							<v-col cols="12" class="d-flex align-center ga-5">
								<v-card
									height="140"
									width="140"
									theme="dark"
									elevation="5"
									class="d-flex flex-column align-center justify-center"
									v-if="selectedCoverImage"
								>
									<v-img
										:src="HOST + selectedCoverImage?.file_detail?.url"
										:height="selectedCoverImage.height"
										max-height="140"
										:width="selectedCoverImage.width"
									></v-img>
								</v-card>
								<div class="d-flex ga-5" v-if="selectedCoverImage">
									<v-btn
										variant="tonal"
										size="small"
										@click="handleOpenImageChooser('cover')"
									>
										<v-icon>mdi-pencil</v-icon>
										<v-tooltip activator="parent" location="bottom"
											>Change</v-tooltip
										>
									</v-btn>
									<v-btn
										variant="tonal"
										size="small"
										color="error"
										@click="handleRemoveImage('cover')"
									>
										<v-icon color="red">mdi-trash-can</v-icon>
										<v-tooltip activator="parent" location="bottom"
											>Remove</v-tooltip
										>
									</v-btn>
								</div>
							</v-col>
						</v-row>
						<v-alert
							v-if="error_msg"
							:text="error_msg"
							type="error"
							class="mb-6"
						></v-alert>
						<v-btn
							:loading="loading"
							variant="tonal"
							class="mt-10 text-surface-bright"
							type="submit"
						>
							Save
						</v-btn>
					</v-col>
				</v-row>
			</v-form>
		</v-col>
		<ModalsImageChooser
			v-if="imageChooserOpen"
			:isOpenModal="imageChooserOpen"
			:fieldName="imageFieldName"
			@close="handleImageModalClose"
		/>
		<ModalsCustomLoader v-if="loading" :isOpenModal="loading" />
	</v-row>
</template>

<script setup>
import { Form, useField, useForm } from "vee-validate";
import * as yup from "yup";
import { useProductStore } from "@/stores/product";
import { useToast } from "vue-toastification";

const config = useRuntimeConfig();
const productStore = useProductStore();
const toast = useToast();
const router = useRouter();

const props = defineProps({
	data: null,
});

const selectedIconImage = ref(null);
const selectedCoverImage = ref(null);
const imageFieldName = ref(null);
var imageChooserOpen = ref(false);
const isActive = ref(false);
const loading = ref(false);
const error_msg = ref("");
const footer_seo_content = ref("");
const editorKey = ref(0);

watch(
	() => props,
	(val, oldVal) => {
		if (val.data) {
			formData.name.value.value = val?.data?.name;
			formData.order_no.value.value = val?.data?.order_no;
			formData.font_icon.value.value = val?.data?.font_icon;
			formData.meta_title.value.value = val?.data?.meta_title;
			formData.meta_description.value.value = val?.data?.meta_description;
			formData.meta_keywords.value.value = val?.data?.meta_keywords;
			selectedIconImage.value = val?.data?.icon_detail;
			selectedCoverImage.value = val?.data?.cover_image_detail;
			isActive.value = val?.data?.is_active;
			footer_seo_content.value = val?.data?.footer_seo_content;
			forceRerender();
		}
	},
	{ deep: true },
);

const validationSchema = yup.object().shape({
	name: yup.string().required(),
	order_no: yup.number().required(),
	font_icon: yup.string().nullable(),
	meta_title: yup.string().nullable(),
	meta_description: yup.string().nullable(),
	meta_keywords: yup.string().nullable(),
});

const { handleSubmit, handleReset } = useForm({
	validationSchema,
});

var formData = {
	name: useField("name", validationSchema),
	order_no: useField("order_no", validationSchema),
	font_icon: useField("font_icon", validationSchema),
	meta_title: useField("meta_title", validationSchema),
	meta_description: useField("meta_description", validationSchema),
	meta_keywords: useField("meta_keywords", validationSchema),
};

const handleFormSubmit = handleSubmit((values) => {
	loading.value = true;

	if (selectedIconImage.value) {
		values["icon"] = selectedIconImage.value.id;
	} else {
		values["icon"] = null;
	}

	if (selectedCoverImage.value) {
		values["cover_image"] = selectedCoverImage.value.id;
	} else {
		values["cover_image"] = null;
	}

	if (isActive.value != props.data.is_active) {
		values["is_active"] = isActive.value;
	}

	values["footer_seo_content"] = footer_seo_content.value;

	productStore
		.updateCategories({
			id: props.data.id,
			data: values,
		})
		.then((d) => {
			loading.value = false;
			toast.success("Successfully updated!");
			router.push({
				name: "products-category",
				query: { selectedCategory: d.slug },
			});
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

const handleImageModalClose = (data = null) => {
	imageChooserOpen.value = false;
	if (data) {
		if (data.fieldName == "icon") {
			selectedIconImage.value = data.imageData;
			imageFieldName.value = null;
		} else if (data.fieldName == "cover") {
			selectedCoverImage.value = data.imageData;
			imageFieldName.value = null;
		}
	} else {
		selectedIconImage.value = null;
		imageFieldName.value = null;
	}
};

const HOST = computed(() => {
	return config.public.HOST;
});

const handleOpenImageChooser = (fieldName) => {
	imageFieldName.value = fieldName;
	imageChooserOpen.value = true;
};

const handleRemoveImage = (fieldName) => {
	if (fieldName == "icon") {
		selectedIconImage.value = null;
	} else {
		selectedCoverImage.value = null;
	}
};

onMounted(() => {
	if (props.data) {
		formData.name.value.value = props?.data?.name;
		formData.order_no.value.value = props?.data?.order_no;
		formData.font_icon.value.value = props?.data?.font_icon;
		formData.meta_title.value.value = props?.data?.meta_title;
		formData.meta_description.value.value = props?.data?.meta_description;
		formData.meta_keywords.value.value = props?.data?.meta_keywords;
		selectedIconImage.value = props?.data?.icon_detail;
		selectedCoverImage.value = props?.data?.cover_image_detail;
		isActive.value = props?.data?.is_active;
		footer_seo_content.value = props?.data?.footer_seo_content;
		forceRerender();
	}
});

const forceRerender = () => {
	editorKey.value++;
};
</script>

<style scoped lang="scss"></style>
