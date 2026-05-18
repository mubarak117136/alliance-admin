<template>
	<v-form
		@submit.prevent="handleFormSubmit"
		class="d-flex flex-column ga-2 pa-4 mt-4"
	>
		<v-row>
			<v-col cols="12">
				<v-autocomplete
					v-model="formData.company.value.value"
					:error-messages="formData.company.errorMessage.value"
					label="Shipping company"
					:items="shippingCompanies"
					item-title="name"
					item-value="id"
					variant="outlined"
					density="compact"
					:loading="loading"
				></v-autocomplete>
			</v-col>
			<v-col cols="12">
				<v-text-field
					class="text-surface-bright"
					v-model="formData.reference_number.value.value"
					:error-messages="formData.reference_number.errorMessage.value"
					label="Tracking code"
					variant="outlined"
					density="compact"
				></v-text-field>
			</v-col>
			<v-col cols="12">
				<v-text-field
					class="text-surface-bright"
					v-model="formData.tracking_link.value.value"
					:error-messages="formData.tracking_link.errorMessage.value"
					label="Tracking link"
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
					type="button"
					size="small"
					color="error"
					@click="handleFormSubmit"
				>
					Save
				</v-btn>
			</v-col>
		</v-row>
	</v-form>
</template>

<script setup>
import { useField, useForm } from "vee-validate";
import * as yup from "yup";
import { useUtilityStore } from "@/stores/utility";
import { useRoute } from "#vue-router";
import { useToast } from "vue-toastification";

const utilityStore = useUtilityStore();
const route = useRoute();
const toast = useToast();

const props = defineProps({
	shippingPrice: null,
});

const emit = defineEmits();

const shippingCompanies = ref([]);
var loading = ref(false);
const error_msg = ref("");

const validationSchema = yup.object().shape({
	company: yup.string().nullable(),
	tracking_link: yup.string().nullable(),
	reference_number: yup.string().nullable(),
});

const { handleSubmit, handleReset } = useForm({
	validationSchema,
});

var formData = {
	company: useField("company", validationSchema),
	tracking_link: useField("tracking_link", validationSchema),
	reference_number: useField("reference_number", validationSchema),
};

const handleFormSubmit = handleSubmit((values) => {
	loading.value = true;

	values["shipping"] = props?.shippingPrice?.id;
	utilityStore
		.addManualShippingProvider(values)
		.then((d) => {
			loading.value = false;
			toast.success("Successfully updated!");
			close();
		})
		.catch((e) => {
			loading.value = false;
			console.log(e);
			var err_msg = "";
			if (e.response.status === 400) {
				for (const [key, value] of Object.entries(e.response._data)) {
					const err = `${value}`;
					err_msg = err_msg + err;
					toast.error(err_msg);
				}
			} else {
				var msg = `Something went wrong!`;
				toast.error(msg);
			}
		});
});

const handleFetchShippingCompany = () => {
	loading.value = true;

	utilityStore
		.fetchShippingCompany()
		.then((d) => {
			loading.value = false;
			shippingCompanies.value = d;
		})
		.catch((e) => {
			loading.value = false;
			console.log(e);
		});
};

onMounted(() => {
	handleFetchShippingCompany();
});

const close = () => {
	emit("close");
};
</script>

<style scoped lang="scss"></style>
