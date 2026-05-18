<template>
	<v-dialog
		v-model="openModal"
		width="auto"
		scroll-strategy="none"
		@click:outside="close"
	>
		<v-sheet
			rounded="lg"
			class="pa-0 ma-0"
			:style="{ width: dialogWidth, 'max-height': '80vh' }"
		>
			<v-row class="bg-cyan-darken-4 pa-0 ma-0 pt-3">
				<v-col cols="12">
					<div class="d-flex justify-space-between">
						<div class="text-h6">
							<v-icon class="mr-4">mdi-ab-testing</v-icon>
							Create Brand
						</div>
						<div class="d-flex align-center justify-space-center">
							<v-icon class="cursor-pointer" @click="close">mdi-close</v-icon>
						</div>
					</div>
				</v-col>
			</v-row>
			<v-row class="ma-0">
				<v-col cols="12">
					<v-form
						@submit.prevent="handleFormSubmit"
						class="d-flex flex-column ga-2 pa-4"
						id="create-modal-form"
					>
						<!-- <div class="text-h6 text-surface-bright">Basic</div> -->
						<v-row class="ma-0">
							<v-col cols="12" sm="6" lg="6" xl="6" xxl="6" class="mb-0 pb-0">
								<v-text-field
									v-model="formData.name.value.value"
									:error-messages="formData.name.errorMessage.value"
									label="Name"
									variant="outlined"
									density="compact"
								></v-text-field>
							</v-col>
							<v-col cols="12" sm="6" lg="6" xl="6" xxl="6" class="mb-0 pb-0">
								<v-text-field
									v-model="formData.meta_title.value.value"
									:error-messages="formData.meta_title.errorMessage.value"
									label="Meta Title"
									variant="outlined"
									density="compact"
								></v-text-field>
							</v-col>
						</v-row>
						<v-row class="ma-0">
							<v-col cols="12" sm="6" lg="6" xl="6" xxl="6" class="mb-0 pb-0">
								<v-text-field
									v-model="formData.meta_description.value.value"
									:error-messages="formData.meta_description.errorMessage.value"
									label="Meta Description"
									variant="outlined"
									density="compact"
								></v-text-field>
							</v-col>
							<v-col cols="12" sm="6" lg="6" xl="6" xxl="6" class="mb-0 pb-0">
								<v-text-field
									v-model="formData.meta_keywords.value.value"
									:error-messages="formData.meta_keywords.errorMessage.value"
									label="Meta Keywords"
									variant="outlined"
									density="compact"
								></v-text-field>
							</v-col>
						</v-row>

						<v-row class="ma-0 ml-1 pa-0">
							<v-col cols="12">
								<div class="text-surface-bright mb-5">Logo</div>
								<v-btn
									@click="handleOpenImageChooser('icon')"
									prepend-icon="mdi-image"
									variant="tonal"
									v-if="!selectedIconImage"
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

						<v-row class="ma-0 ml-1 pa-0">
							<v-col cols="12">
								<div class="text-surface-bright mb-5">Cover</div>
								<v-btn
									@click="handleOpenImageChooser('cover')"
									prepend-icon="mdi-image"
									variant="tonal"
									v-if="!selectedCoverImage"
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
							</v-col>
						</v-row>

						<v-row class="ma-0 ml-4 mt-4 pa-0">
							<v-col cols="12" class="ma-0 pa-0">
								<v-alert
									v-if="error_msg"
									:text="error_msg"
									type="error"
									class="mb-6"
								></v-alert>
								<v-btn :loading="loading" variant="tonal" type="submit">
									Create
								</v-btn>
							</v-col>
						</v-row>
					</v-form>
				</v-col>
			</v-row>
		</v-sheet>
		<ModalsImageChooser
			v-if="imageChooserOpen"
			:isOpenModal="imageChooserOpen"
			:fieldName="imageFieldName"
			@close="handleImageModalClose"
		/>
	</v-dialog>
</template>

<script setup>
import { Form, useField, useForm } from "vee-validate";
import * as yup from "yup";
import { useDisplay } from "vuetify";
import { useProductStore } from "@/stores/product";
import { useToast } from "vue-toastification";

const { isOpenModal } = defineProps({
	isOpenModal: false,
});
const emit = defineEmits();

const config = useRuntimeConfig();
const productStore = useProductStore();
const toast = useToast();
const { name } = useDisplay();

var openModal = ref(false);
const loading = ref(false);
const selectedIconImage = ref(null);
const selectedCoverImage = ref(null);
var imageChooserOpen = ref(false);
const imageFieldName = ref(null);
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

const HOST = computed(() => {
	return config.public.HOST;
});

const handleFormSubmit = handleSubmit((values) => {
	loading.value = true;
	if (selectedIconImage.value) {
		values["logo"] = selectedIconImage.value.id;
	}

	if (selectedCoverImage.value) {
		values["cover_image"] = selectedCoverImage.value.id;
	}

	productStore
		.createBrand(values)
		.then((d) => {
			loading.value = false;
			close(true);
			toast.success("Succesfully create the brand!");
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

const dialogWidth = computed(() => {
	switch (name.value) {
		case "xs":
			return "90vw";
		case "sm":
			return "70vw";
		case "md":
			return "50vw";
		case "lg":
			return "50vw";
		case "xl":
			return "50vw";
		case "xxl":
			return "50vw";
	}

	return undefined;
});

const close = (refresh = false) => {
	emit("close", refresh);
};

onMounted(() => {
	openModal.value = isOpenModal;
});
</script>

<style scoped lang="scss"></style>
