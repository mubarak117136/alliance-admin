<template>
	<div>
		<v-row class="pa-0 ma-0 pl-0 pr-0 pl-md-5 pr-md-5">
			<v-col cols="12" class="d-flex flex-column ga-5">
				<v-sheet rounded="lg" class="pa-4 d-flex justify-space-between">
					<div>
						<div class="text-surface-bright">Social Settings</div>
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
											v-model="formData.facebook.value.value"
											:error-messages="formData.facebook.errorMessage.value"
											label="Facebook"
											variant="outlined"
											density="compact"
										></v-text-field>
									</v-col>
									<v-col cols="12" sm="6" md="6" lg="6">
										<v-text-field
											v-model="formData.whatsapp.value.value"
											:error-messages="formData.whatsapp.errorMessage.value"
											class="text-surface-bright"
											label="Whatsapp"
											variant="outlined"
											density="compact"
										></v-text-field>
									</v-col>
								</v-row>
								<v-row>
									<v-col cols="12" sm="6" md="6" lg="6">
										<v-text-field
											class="text-surface-bright"
											v-model="formData.instagram.value.value"
											:error-messages="formData.instagram.errorMessage.value"
											label="Instagram"
											variant="outlined"
											density="compact"
										></v-text-field>
									</v-col>
									<v-col cols="12" sm="6" md="6" lg="6">
										<v-text-field
											v-model="formData.x.value.value"
											:error-messages="formData.x.errorMessage.value"
											class="text-surface-bright"
											label="X"
											variant="outlined"
											density="compact"
										></v-text-field>
									</v-col>
								</v-row>
								<v-row>
									<v-col cols="12" sm="6" md="6" lg="6">
										<v-text-field
											class="text-surface-bright"
											v-model="formData.youtube.value.value"
											:error-messages="formData.youtube.errorMessage.value"
											label="Youtube"
											variant="outlined"
											density="compact"
										></v-text-field>
									</v-col>
									<v-col cols="12" sm="6" md="6" lg="6">
										<v-text-field
											v-model="formData.linkedin.value.value"
											:error-messages="formData.linkedin.errorMessage.value"
											class="text-surface-bright"
											label="Linkedin"
											variant="outlined"
											density="compact"
										></v-text-field>
									</v-col>
								</v-row>
								<v-row>
									<v-col cols="12" sm="6" md="6" lg="6">
										<v-text-field
											class="text-surface-bright"
											v-model="formData.discord.value.value"
											:error-messages="formData.discord.errorMessage.value"
											label="Discord"
											variant="outlined"
											density="compact"
										></v-text-field>
									</v-col>
									<v-col cols="12" sm="6" md="6" lg="6">
										<v-text-field
											class="text-surface-bright"
											v-model="formData.tiktok.value.value"
											:error-messages="formData.tiktok.errorMessage.value"
											label="Tiktok"
											variant="outlined"
											density="compact"
										></v-text-field>
									</v-col>
								</v-row>

								<v-row>
									<v-col cols="12">
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
					</v-row>
				</v-sheet>
			</v-col>
		</v-row>
		<ModalsCustomLoader v-if="loading" :isOpenModal="loading" />
	</div>
</template>

<script setup>
import { useField, useForm } from "vee-validate";
import * as yup from "yup";
import { useToast } from "vue-toastification";
import { useUtilityStore } from "@/stores/utility";

const toast = useToast();
const utilityStore = useUtilityStore();

const item = ref(null);
const loading = ref(false);
const error_msg = ref("");

const validationSchema = yup.object().shape({
	facebook: yup.string().url().nullable(),
	whatsapp: yup.string().url().nullable(),
	instagram: yup.string().url().nullable(),
	x: yup.string().url().nullable(),
	youtube: yup.string().url().nullable(),
	linkedin: yup.string().url().nullable(),
	discord: yup.string().url().nullable(),
	tiktok: yup.string().url().nullable(),
});

const { handleSubmit, handleReset } = useForm({
	validationSchema,
});

var formData = {
	facebook: useField("facebook", validationSchema),
	whatsapp: useField("whatsapp", validationSchema),
	instagram: useField("instagram", validationSchema),
	x: useField("x", validationSchema),
	youtube: useField("youtube", validationSchema),
	linkedin: useField("linkedin", validationSchema),
	discord: useField("discord", validationSchema),
	tiktok: useField("tiktok", validationSchema),
};

const handleFormSubmit = handleSubmit((values) => {
	loading.value = true;

	utilityStore
		.updateSocialSetting({
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
		.fetchSocialSetting()
		.then((d) => {
			item.value = d;
			loading.value = false;
			formData.facebook.value.value = item?.value?.facebook;
			formData.whatsapp.value.value = item?.value?.whatsapp;
			formData.instagram.value.value = item?.value?.instagram;
			formData.x.value.value = item?.value?.x;
			formData.youtube.value.value = item?.value?.youtube;
			formData.linkedin.value.value = item?.value?.linkedin;
			formData.discord.value.value = item?.value?.discord;
			formData.tiktok.value.value = item?.value?.tiktok;
		})
		.catch((e) => {
			console.log(e);
			loading.value = false;
		});
};

onMounted(() => {
	handleFetchItem();
});

useHead({
	title: "Social settings",
});
</script>

<style scoped lang="scss"></style>
