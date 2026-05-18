<template>
	<div>
		<v-row class="pa-0 ma-0 pl-0 pr-0 pl-md-5 pr-md-5">
			<v-col cols="12" class="d-flex flex-column ga-5">
				<v-sheet rounded="lg" class="pa-4 d-flex justify-space-between">
					<div>
						<div class="text-surface-bright">Shipping Settings</div>
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
										<v-select
											disabled
											label="Operation area"
											:items="operationAreaChoice"
											variant="outlined"
											density="compact"
											v-model="formData.operation_area.value.value"
											:error-messages="
												formData.operation_area.errorMessage.value
											"
											item-title="title"
											item-value="value"
											class="text-surface-bright"
										></v-select>
									</v-col>
									<v-col cols="12" sm="6" md="6" lg="6">
										<v-select
											disabled
											label="Shipping rate module"
											:items="shippingRateModuleChoice"
											variant="outlined"
											density="compact"
											v-model="formData.rate_module_type.value.value"
											:error-messages="
												formData.rate_module_type.errorMessage.value
											"
											item-title="title"
											item-value="value"
											class="text-surface-bright"
										></v-select>
									</v-col>
								</v-row>
								<v-row class="mt-0 pt-0">
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
											disabled
										>
											Save
										</v-btn>
									</v-col>
								</v-row>
							</v-form>
						</v-col>
					</v-row>
				</v-sheet>

				<v-row class="pa-0 ma-0">
					<ShippingCompany />
				</v-row>
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

const nuxtApp = useNuxtApp();
const toast = useToast();
const utilityStore = useUtilityStore();

const shippingSetting = ref(null);
const loading = ref(false);
const error_msg = ref("");

const validationSchema = yup.object().shape({
	operation_area: yup.number().required(),
	rate_module_type: yup.number().required(),
});

const { handleSubmit, handleReset } = useForm({
	validationSchema,
});

var formData = {
	operation_area: useField("operation_area", validationSchema),
	rate_module_type: useField("rate_module_type", validationSchema),
};

const handleFormSubmit = handleSubmit((values) => {
	loading.value = true;

	utilityStore
		.updateShippingSetting({
			id: shippingSetting?.value?.id,
			data: values,
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
});

const handleFetchShippingSetting = () => {
	loading.value = true;
	utilityStore
		.fetchShippingSetting()
		.then((d) => {
			shippingSetting.value = d;
			loading.value = false;
			formData.operation_area.value.value =
				shippingSetting?.value?.operation_area;
			formData.rate_module_type.value.value =
				shippingSetting?.value?.rate_module_type;
		})
		.catch((e) => {
			console.log(e);
			loading.value = false;
		});
};

const { data, error } = await useAsyncData("pageItems", async () => {
	var settings = null;

	await nuxtApp.runWithContext(async () => {
		await utilityStore
			.fetchBasicSetting()
			.then((d) => {
				settings = d;
			})
			.catch((e) => {
				console.log(e);
			});
	});

	return {
		settings,
	};
});

onMounted(() => {
	handleFetchShippingSetting();
});

const operationAreaChoice = ref([
	{
		title: "World wide",
		value: 1,
	},
	{
		title: "Inside country",
		value: 2,
	},
]);

const shippingRateModuleChoice = ref([
	{
		title: "Third party",
		value: 1,
	},
	{
		title: "Manual",
		value: 2,
	},
]);

const shippingRateProviderChoice = ref([
	{
		title: "None",
		value: 1,
	},
	{
		title: "Shippo",
		value: 2,
	},
	{
		title: "Easy ship",
		value: 3,
	},
]);

useHead({
	title: "Shipping settings",
});
</script>

<style scoped lang="scss"></style>
