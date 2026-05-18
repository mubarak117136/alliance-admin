<template>
	<div>
		<v-row class="pa-0 ma-0 pl-0 pr-0 pl-md-5 pr-md-5">
			<v-col cols="12" class="d-flex flex-column ga-5">
				<v-sheet rounded="lg" class="pa-4 d-flex justify-space-between">
					<div>
						<div class="text-surface-bright">Settings</div>
					</div>
				</v-sheet>
				<v-sheet rounded="lg" class="pa-4">
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
											v-model="formData.company_name.value.value"
											:error-messages="formData.company_name.errorMessage.value"
											label="Company name"
											variant="outlined"
											density="compact"
										></v-text-field>
									</v-col>
									<v-col cols="12" sm="6" md="6" lg="6">
										<v-text-field
											v-model="country"
											class="text-surface-bright"
											label="Country"
											variant="outlined"
											density="compact"
											disabled
										></v-text-field>
									</v-col>
								</v-row>
								<v-row>
									<v-col cols="12" sm="6" md="6" lg="6">
										<v-text-field
											class="text-surface-bright"
											v-model="formData.city.value.value"
											:error-messages="formData.city.errorMessage.value"
											label="City"
											variant="outlined"
											density="compact"
										></v-text-field>
									</v-col>
									<v-col cols="12" sm="6" md="6" lg="6">
										<v-text-field
											v-model="formData.address.value.value"
											:error-messages="formData.address.errorMessage.value"
											class="text-surface-bright"
											label="Address"
											variant="outlined"
											density="compact"
										></v-text-field>
									</v-col>
								</v-row>
								<v-row>
									<v-col cols="12" sm="6" md="6" lg="6">
										<v-text-field
											class="text-surface-bright"
											v-model="formData.post_code.value.value"
											:error-messages="formData.post_code.errorMessage.value"
											label="Postal code"
											variant="outlined"
											density="compact"
										></v-text-field>
									</v-col>
									<v-col cols="12" sm="6" md="6" lg="6">
										<v-text-field
											v-model="formData.phone.value.value"
											:error-messages="formData.phone.errorMessage.value"
											class="text-surface-bright"
											label="Phone"
											variant="outlined"
											density="compact"
										></v-text-field>
									</v-col>
								</v-row>
								<v-row>
									<v-col cols="12">
										<v-text-field
											class="text-surface-bright"
											v-model="formData.email.value.value"
											:error-messages="formData.email.errorMessage.value"
											label="Email"
											variant="outlined"
											density="compact"
										></v-text-field>
									</v-col>
								</v-row>
								<v-row>
									<v-col cols="12" sm="6" md="6" lg="6">
										<v-text-field
											class="text-surface-bright"
											v-model="formData.t_c.value.value"
											:error-messages="formData.t_c.errorMessage.value"
											label="Terms & codition link"
											variant="outlined"
											density="compact"
										></v-text-field>
									</v-col>
									<v-col cols="12" sm="6" md="6" lg="6">
										<v-text-field
											v-model="formData.privacy_policy.value.value"
											:error-messages="
												formData.privacy_policy.errorMessage.value
											"
											class="text-surface-bright"
											label="Privacy policy link"
											variant="outlined"
											density="compact"
										></v-text-field>
									</v-col>
								</v-row>
								<v-row>
									<v-col cols="12">
										<div class="text-surface-bright mb-5">Company Logo</div>
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
										<div class="text-surface-bright mb-5">Website Favicon</div>
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
											class="mb-6 mt-4"
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
					</v-row>
				</v-sheet>
			</v-col>
		</v-row>
		<ModalsImageChooser
			v-if="imageChooserOpen"
			:isOpenModal="imageChooserOpen"
			:fieldName="imageFieldName"
			@close="handleImageModalClose"
		/>
		<ModalsCustomLoader v-if="loading" :isOpenModal="loading" />
	</div>
</template>

<script setup>
import { useField, useForm } from "vee-validate";
import * as yup from "yup";
import { useToast } from "vue-toastification";
import { useUtilityStore } from "@/stores/utility";

const config = useRuntimeConfig();
const toast = useToast();
const utilityStore = useUtilityStore();

const item = ref(null);
const selectedIconImage = ref(null);
const selectedCoverImage = ref(null);
const imageFieldName = ref(null);
var imageChooserOpen = ref(false);
const loading = ref(false);
const error_msg = ref("");
const country = ref("");

const validationSchema = yup.object().shape({
	company_name: yup.string().required(),
	city: yup.string().nullable(),
	address: yup.string().nullable(),
	post_code: yup.string().nullable(),
	phone: yup.string().nullable(),
	email: yup.string().email().nullable(),
	t_c: yup.string().nullable(),
	privacy_policy: yup.string().nullable(),
});

const { handleSubmit, handleReset } = useForm({
	validationSchema,
});

var formData = {
	company_name: useField("company_name", validationSchema),
	city: useField("city", validationSchema),
	address: useField("address", validationSchema),
	post_code: useField("post_code", validationSchema),
	phone: useField("phone", validationSchema),
	email: useField("email", validationSchema),
	t_c: useField("t_c", validationSchema),
	privacy_policy: useField("privacy_policy", validationSchema),
};

const handleFormSubmit = handleSubmit((values) => {
	loading.value = true;

	if (selectedIconImage.value) {
		values["logo"] = selectedIconImage.value.id;
	} else {
		values["logo"] = null;
	}

	if (selectedCoverImage.value) {
		values["favicon"] = selectedCoverImage.value.id;
	} else {
		values["favicon"] = null;
	}

	utilityStore
		.updateBasicSetting({
			id: item?.value?.id,
			data: values,
		})
		.then((d) => {
			loading.value = false;
			toast.success("Successfully updated!");
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

const handleFetchItem = () => {
	loading.value = true;
	utilityStore
		.fetchBasicSetting()
		.then((d) => {
			item.value = d;
			loading.value = false;
			formData.company_name.value.value = item?.value?.company_name;
			formData.city.value.value = item?.value?.city;
			formData.address.value.value = item?.value?.address;
			formData.post_code.value.value = item?.value?.post_code;
			formData.phone.value.value = item?.value?.phone;
			formData.email.value.value = item?.value?.email;
			formData.t_c.value.value = item?.value?.t_c;
			formData.privacy_policy.value.value = item?.value?.privacy_policy;
			country.value = item?.value?.country_detail?.name;
			selectedIconImage.value = item?.value?.logo_detail;
			selectedCoverImage.value = item?.value?.favicon_detail;
		})
		.catch((e) => {
			console.log(e);
			loading.value = false;
		});
};

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

const HOST = computed(() => {
	return config.public.HOST;
});

onMounted(() => {
	handleFetchItem();
});

useHead({
	title: "Basic settings",
});
</script>

<style scoped lang="scss"></style>
