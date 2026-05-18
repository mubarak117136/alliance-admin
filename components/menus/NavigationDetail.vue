<template>
	<v-row>
		<v-col cols="12">
			<v-form
				@submit.prevent="handleFormSubmit"
				class="d-flex flex-column ga-2 pa-4"
			>
				<v-row>
					<v-col cols="12" sm="6" lg="6" xl="6" xxl="6">
						<v-text-field
							class="text-surface-bright"
							v-model="formData.name.value.value"
							:error-messages="formData.name.errorMessage.value"
							label="Name"
							variant="outlined"
							density="compact"
						></v-text-field>
					</v-col>
					<v-col cols="12" sm="6" lg="6" xl="6" xxl="6" class="mb-0 pb-0">
						<v-select
							label="Navigation type"
							:items="navigationTypeChoice"
							variant="outlined"
							density="compact"
							v-model="formData.type.value.value"
							:error-messages="formData.type.errorMessage.value"
							item-title="title"
							item-value="value"
							class="text-surface-bright"
						></v-select>
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
							class="mt-2 text-surface-bright"
							type="submit"
						>
							Save
						</v-btn>
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
import { useUtilityStore } from "@/stores/utility";

const utilityStore = useUtilityStore();
const toast = useToast();
const router = useRouter();

const props = defineProps({
	data: null,
});

const loading = ref(false);
const error_msg = ref("");

const navigationTypeChoice = [
	{
		title: "Main nav",
		value: 1,
	},
	{
		title: "Footer nav",
		value: 2,
	},
];

const validationSchema = yup.object().shape({
	name: yup.string().required(),
	type: yup.string().required(),
});

const { handleSubmit, handleReset } = useForm({
	validationSchema,
});

var formData = {
	name: useField("name", validationSchema),
	type: useField("type", validationSchema),
};

const handleFormSubmit = handleSubmit((values) => {
	loading.value = true;

	utilityStore
		.updateNavigationScope({
			id: props?.data?.id,
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

onMounted(() => {
	if (props.data) {
		formData.name.value.value = props?.data?.name;
		formData.type.value.value = props?.data?.type;
	}
});
</script>

<style scoped lang="scss"></style>
