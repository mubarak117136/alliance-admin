<template>
	<v-row>
		<v-col cols="12">
			<v-form
				@submit.prevent="handleFormSubmit"
				class="d-flex flex-column ga-2 pa-4"
			>
				<v-row>
					<v-col cols="12" sm="6" md="6" lg="6">
						<v-text-field
							class="text-surface-bright"
							v-model="formData.name.value.value"
							:error-messages="formData.name.errorMessage.value"
							label="Name"
							variant="outlined"
							density="compact"
						></v-text-field>
					</v-col>
					<v-col cols="12" sm="6" md="6" lg="6">
						<v-text-field
							class="text-surface-bright"
							v-model="formData.meta_title.value.value"
							:error-messages="formData.meta_title.errorMessage.value"
							label="Meta Title"
							variant="outlined"
							density="compact"
						></v-text-field>
					</v-col>
				</v-row>
				<v-row>
					<v-col cols="12" sm="6" md="6" lg="6">
						<v-text-field
							class="text-surface-bright"
							v-model="formData.meta_description.value.value"
							:error-messages="formData.meta_description.errorMessage.value"
							label="Meta Description"
							variant="outlined"
							density="compact"
						></v-text-field>
					</v-col>
					<v-col cols="12" sm="6" md="6" lg="6">
						<v-text-field
							class="text-surface-bright"
							v-model="formData.meta_keywords.value.value"
							:error-messages="formData.meta_keywords.errorMessage.value"
							label="Meta Keywords"
							variant="outlined"
							density="compact"
						></v-text-field>
					</v-col>
				</v-row>

				<!-- <div class="text-h6 text-surface-bright">Images</div> -->
				<v-row>
					<v-col cols="12">
						<div class="text-surface-bright mb-5">Logo</div>
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
import { useField, useForm } from "vee-validate";
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
const loading = ref(false);
const error_msg = ref("");

const validationSchema = yup.object().shape({
	name: yup.string().required(),
	meta_title: yup.string().nullable(),
	meta_description: yup.string().nullable(),
	meta_keywords: yup.string().nullable(),
});

const { handleSubmit, handleReset } = useForm({
	validationSchema,
});

var formData = {
	name: useField("name", validationSchema),
	meta_title: useField("meta_title", validationSchema),
	meta_description: useField("meta_description", validationSchema),
	meta_keywords: useField("meta_keywords", validationSchema),
};

const handleFormSubmit = handleSubmit((values) => {
	loading.value = true;

	if (selectedIconImage.value) {
		values["logo"] = selectedIconImage.value.id;
	} else {
		values["logo"] = null;
	}

	if (selectedCoverImage.value) {
		values["cover_image"] = selectedCoverImage.value.id;
	} else {
		values["cover_image"] = null;
	}

	productStore
		.updateBrand({
			slug: props?.data?.slug,
			data: values,
		})
		.then((d) => {
			loading.value = false;
			toast.success("Successfully updated!");
			router.push({
				name: "products-brand-slug",
				params: { slug: d.slug },
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
		formData.meta_title.value.value = props?.data?.meta_title;
		formData.meta_description.value.value = props?.data?.meta_description;
		formData.meta_keywords.value.value = props?.data?.meta_keywords;
		selectedIconImage.value = props?.data?.logo_detail;
		selectedCoverImage.value = props?.data?.cover_image_detail;
	}
});
</script>

<style scoped lang="scss"></style>
