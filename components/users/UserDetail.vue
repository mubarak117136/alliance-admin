<template>
	<v-row>
		<v-col cols="12">
			<v-form
				@submit.prevent="handleFormSubmit"
				class="d-flex flex-column ga-2 pa-4"
			>
				<v-row>
					<v-col cols="12">
						<v-text-field
							class="text-surface-bright"
							v-model="formData.full_name.value.value"
							:error-messages="formData.full_name.errorMessage.value"
							label="Full name"
							variant="outlined"
							density="compact"
							disabled
						></v-text-field>
					</v-col>
					<v-col cols="12">
						<v-text-field
							class="text-surface-bright"
							v-model="formData.username.value.value"
							:error-messages="formData.username.errorMessage.value"
							label="Email / Phone Number"
							variant="outlined"
							density="compact"
							disabled
						></v-text-field>
					</v-col>
				</v-row>
				<v-row class="pt-0 mt-0 pb-0 mb-0">
					<v-col cols="12" class="pt-0 mt-0 pb-0 mb-0">
						<v-switch
							v-model="is_verified"
							color="primary"
							:label="`Is Verified: ${is_verified}`"
							hide-details
							@update:modelValue="handleVerifiedChange"
						></v-switch>
					</v-col>
					<v-col cols="12" class="pt-0 mt-0 pb-0 mb-0">
						<v-switch
							v-model="is_active"
							color="primary"
							:label="`Is Active: ${is_active}`"
							hide-details
							@update:modelValue="handleActiveChange"
						></v-switch>
					</v-col>
					<v-col cols="12" class="pt-0 mt-0 pb-0 mb-0">
						<v-switch
							v-model="is_staff"
							color="primary"
							:label="`Is Staff: ${is_staff}`"
							hide-details
							@update:modelValue="handleStaffChange"
						></v-switch>
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
					</v-col>
				</v-row>
			</v-form>
		</v-col>
		<ModalsCustomLoader v-if="loading" :isOpenModal="loading" />
	</v-row>
</template>

<script setup>
import { useField, useForm } from "vee-validate";
import * as yup from "yup";
import { useToast } from "vue-toastification";
import { useUserStore } from "@/stores/user";

const userStore = useUserStore();
const toast = useToast();
const router = useRouter();

const props = defineProps({
	data: null,
});

const loading = ref(false);
const error_msg = ref("");
const is_active = ref(false);
const is_verified = ref(false);
const is_staff = ref(false);

const validationSchema = yup.object().shape({
	full_name: yup.string().required(),
	username: yup.string().required(),
});

const { handleSubmit, handleReset } = useForm({
	validationSchema,
});

var formData = {
	full_name: useField("full_name", validationSchema),
	username: useField("username", validationSchema),
};

const handleFormSubmit = handleSubmit((values) => {});

const handleUpdateUser = (data) => {
	userStore
		.updateUser({
			id: props?.data?.id,
			data: data,
		})
		.then((d) => {
			loading.value = false;
			toast.success("Successfully updated!");
			location.reload();
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
};

const handleVerifiedChange = () => {
	handleUpdateUser({ is_verified: is_verified.value });
};

const handleActiveChange = () => {
	handleUpdateUser({ is_active: is_active.value });
};

const handleStaffChange = () => {
	handleUpdateUser({ is_staff: is_staff.value });
};

onMounted(() => {
	if (props.data) {
		formData.full_name.value.value = props?.data?.full_name;
		formData.username.value.value = props?.data?.username;
		is_active.value = props?.data?.is_active;
		is_verified.value = props?.data?.is_verified;
		is_staff.value = props?.data?.is_staff;
	}
});
</script>

<style scoped lang="scss"></style>
