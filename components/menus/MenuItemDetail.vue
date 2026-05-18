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
							v-model="formData.title.value.value"
							:error-messages="formData.title.errorMessage.value"
							label="Title"
							variant="outlined"
							density="compact"
						></v-text-field>
					</v-col>
					<v-col cols="12" sm="6" lg="6" xl="6" xxl="6" class="mb-0 pb-0">
						<v-text-field
							class="text-surface-bright"
							v-model="formData.link.value.value"
							:error-messages="formData.link.errorMessage.value"
							label="Link"
							variant="outlined"
							density="compact"
						></v-text-field>
					</v-col>
				</v-row>
				<v-row>
					<v-col cols="12" sm="6" lg="6" xl="6" xxl="6">
						<v-text-field
							class="text-surface-bright"
							v-model="formData.sort_order.value.value"
							:error-messages="formData.sort_order.errorMessage.value"
							label="Sort order"
							variant="outlined"
							density="compact"
						></v-text-field>
					</v-col>
					<v-col cols="12" sm="6" lg="6" xl="6" xxl="6">
						<v-switch
							class="pl-4"
							v-model="formData.is_highlighted.value.value"
							color="primary"
							:label="`Is Highlighted: ${formData.is_highlighted.value.value}`"
							hide-details
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
import { useRoute } from "#vue-router";

const utilityStore = useUtilityStore();
const toast = useToast();
const router = useRouter();
const route = useRoute();

const props = defineProps({
	data: null,
});

const loading = ref(false);
const error_msg = ref("");

const validationSchema = yup.object().shape({
	title: yup.string().required(),
	link: yup.string().nullable(),
	is_highlighted: yup.boolean().nullable(),
	sort_order: yup.number().required(),
});

const { handleSubmit, handleReset } = useForm({
	validationSchema,
});

var formData = {
	title: useField("title", validationSchema),
	link: useField("link", validationSchema),
	is_highlighted: useField("is_highlighted", validationSchema),
	sort_order: useField("sort_order", validationSchema),
};

const handleFormSubmit = handleSubmit((values) => {
	loading.value = true;

	values["nav"] = route?.params?.id;

	utilityStore
		.updateMenu({
			id: props?.data?.id,
			params: { navigation: route?.params?.id },
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
		formData.title.value.value = props?.data?.title;
		formData.link.value.value = props?.data?.link;
		formData.sort_order.value.value = props?.data?.sort_order;
		formData.is_highlighted.value.value = props?.data?.is_highlighted;
	}
});
</script>

<style scoped lang="scss"></style>
