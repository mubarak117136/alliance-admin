<template>
	<v-container fluid class="fill-height">
		<v-row>
			<v-col cols="12" align="center" class="pa-0">
				<v-img
					v-if="getBasicSettings?.logo"
					:width="260"
					cover
					:src="HOST + getBasicSettings?.logo?.original?.src"
				></v-img>
				<v-img v-else :width="120" cover src="@/assets/images/logo.png"></v-img>
			</v-col>
			<v-col cols="12">
				<v-card
					class="mx-auto pa-4 pa-sm-10 rounded-lg d-flex flex-column ga-4 bg-surface"
					max-width="400"
					elevation="10"
					:loading="loading"
				>
					<div class="text-h5 mx-auto mb-6">Sign in</div>
					<form @submit.prevent="handleSignin">
						<v-text-field
							v-model="formData.username.value.value"
							:error-messages="formData.username.errorMessage.value"
							label="Email"
							variant="outlined"
							prepend-inner-icon="mdi-email-outline"
							density="compact"
						></v-text-field>
						<v-text-field
							v-model="formData.password.value.value"
							:type="visible ? 'text' : 'password'"
							:error-messages="formData.password.errorMessage.value"
							label="Password"
							variant="outlined"
							prepend-inner-icon="mdi-lock-outline"
							:append-inner-icon="visible ? 'mdi-eye-off' : 'mdi-eye'"
							density="compact"
							@click:append-inner="visible = !visible"
						></v-text-field>
						<v-alert
							v-if="error_msg"
							:text="error_msg"
							type="error"
							class="mb-6"
						></v-alert>
						<v-btn
							class="bg-surface-light"
							color="surface-bright"
							size="large"
							variant="tonal"
							block
							type="submit"
							:loading="loading"
						>
							Sign in
						</v-btn>
					</form>
				</v-card>
			</v-col>
		</v-row>
	</v-container>
</template>

<script setup>
definePageMeta({
	layout: "auth-layout",
});

import { Form, useField, useForm } from "vee-validate";
import * as yup from "yup";
import { useToast } from "vue-toastification";
import { useUserStore } from "@/stores/user";
import { useUtilityStore } from "@/stores/utility";

const config = useRuntimeConfig();
const userStore = useUserStore();
const toast = useToast();
const router = useRouter();
const utilityStore = useUtilityStore();

const { getBasicSettings } = storeToRefs(utilityStore);

var error_msg = ref("");
var loading = ref(false);
var visible = ref(false);

const HOST = computed(() => {
	return config.public.HOST;
});

const validationSchema = yup.object().shape({
	username: yup.string().required(),
	password: yup.string().required().min(8),
});

const { handleSubmit, handleReset } = useForm({
	validationSchema,
});

var formData = {
	username: useField("username", validationSchema),
	password: useField("password", validationSchema),
};

const handleSignin = handleSubmit((values) => {
	loading.value = true;
	userStore
		.signin(values)
		.then((data) => {
			loading.value = false;
			if (data.token === null && data.is_verified == false) {
				error_msg.value = "Cant Sign in!";
			} else {
				router.push({ name: "index" });
			}
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

useHead({
	title: "Sign in",
});
</script>

<style lang="scss" scoped></style>
