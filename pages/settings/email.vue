<template>
	<div>
		<v-row class="pa-0 ma-0 pl-0 pr-0 pl-md-5 pr-md-5">
			<v-col cols="12" class="d-flex flex-column ga-5">
				<v-sheet rounded="lg" class="pa-4 d-flex justify-space-between">
					<div>
						<div class="text-surface-bright">Email Settings</div>
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
											v-model="formData.host.value.value"
											:error-messages="formData.host.errorMessage.value"
											label="Email host"
											variant="outlined"
											density="compact"
										></v-text-field>
									</v-col>
									<v-col cols="12" sm="6" md="6" lg="6">
										<v-text-field
											v-model="formData.user.value.value"
											:error-messages="formData.user.errorMessage.value"
											class="text-surface-bright"
											label="Email user"
											variant="outlined"
											density="compact"
										></v-text-field>
									</v-col>
								</v-row>
								<v-row>
									<v-col cols="12" sm="6" md="6" lg="6">
										<v-text-field
											class="text-surface-bright"
											v-model="formData.password.value.value"
											:error-messages="formData.password.errorMessage.value"
											label="Email password"
											variant="outlined"
											density="compact"
										></v-text-field>
									</v-col>
									<v-col cols="12" sm="6" md="6" lg="6">
										<v-text-field
											v-model="formData.port.value.value"
											:error-messages="formData.port.errorMessage.value"
											class="text-surface-bright"
											label="Email port"
											variant="outlined"
											density="compact"
										></v-text-field>
									</v-col>
								</v-row>

								<v-row>
									<v-col cols="12" sm="6" md="6" lg="6">
										<v-text-field
											class="text-surface-bright"
											v-model="formData.sender_email.value.value"
											:error-messages="formData.sender_email.errorMessage.value"
											label="Sender email"
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
	host: yup.string().nullable(),
	user: yup.string().nullable(),
	password: yup.string().nullable(),
	port: yup.string().nullable(),
	sender_email: yup.string().email().nullable(),
});

const { handleSubmit, handleReset } = useForm({
	validationSchema,
});

var formData = {
	host: useField("host", validationSchema),
	user: useField("user", validationSchema),
	password: useField("password", validationSchema),
	port: useField("port", validationSchema),
	sender_email: useField("sender_email", validationSchema),
};

const handleFormSubmit = handleSubmit((values) => {
	loading.value = true;

	utilityStore
		.updateEmailSetting({
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
		.fetchEmailSetting()
		.then((d) => {
			item.value = d;
			loading.value = false;
			formData.host.value.value = item?.value?.host;
			formData.user.value.value = item?.value?.user;
			formData.password.value.value = item?.value?.password;
			formData.port.value.value = item?.value?.port;
			formData.sender_email.value.value = item?.value?.sender_email;
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
	title: "Email settings",
});
</script>

<style scoped lang="scss"></style>
