<template>
	<v-dialog
		v-model="openModal"
		scroll-strategy="none"
		width="auto"
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
							<v-icon class="mr-4">mdi-ticket</v-icon>
							Create Coupon
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
									v-model="formData.code.value.value"
									:error-messages="formData.code.errorMessage.value"
									label="Coupon code"
									variant="outlined"
									density="compact"
								></v-text-field>
							</v-col>
						</v-row>

						<v-row class="ma-0">
							<v-col cols="12" sm="6" lg="6" xl="6" xxl="6" class="mb-0 pb-0">
								<v-text-field
									v-model="formData.min_order_value.value.value"
									:error-messages="formData.min_order_value.errorMessage.value"
									label="Min order value"
									variant="outlined"
									density="compact"
								></v-text-field>
							</v-col>
							<v-col cols="12" sm="6" lg="6" xl="6" xxl="6" class="mb-0 pb-0">
								<v-select
									label="Price type"
									:items="couponTypeChoice"
									variant="outlined"
									density="compact"
									v-model="formData.price_type.value.value"
									:error-messages="formData.price_type.errorMessage.value"
									item-title="title"
									item-value="value"
									class="text-surface-bright"
								></v-select>
							</v-col>
						</v-row>
						<v-row class="ma-0">
							<v-col cols="12" sm="6" lg="6" xl="6" xxl="6" class="mb-0 pb-0">
								<v-text-field
									v-model="formData.discount_amount.value.value"
									:error-messages="formData.discount_amount.errorMessage.value"
									label="Discount amount"
									variant="outlined"
									density="compact"
								></v-text-field>
							</v-col>
							<v-col cols="12" sm="6" lg="6" xl="6" xxl="6" class="mb-0 pb-0">
								<v-text-field
									v-model="formData.quantity.value.value"
									:error-messages="formData.quantity.errorMessage.value"
									label="Coupon Quantity"
									variant="outlined"
									density="compact"
								></v-text-field>
							</v-col>
						</v-row>

						<v-row class="ma-0">
							<v-col cols="12" sm="6" lg="6" xl="6" xxl="6" class="mb-0 pb-0">
								<v-switch
									v-model="formData.is_active.value.value"
									color="primary"
									:label="`Is Active: ${formData.is_active.value.value}`"
									hide-details
								></v-switch>
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
	</v-dialog>
</template>

<script setup>
import { Form, useField, useForm } from "vee-validate";
import * as yup from "yup";
import { useDisplay } from "vuetify";
import { useToast } from "vue-toastification";
import { useUtilityStore } from "@/stores/utility";

const { isOpenModal } = defineProps({
	isOpenModal: false,
});
const emit = defineEmits();

const utilityStore = useUtilityStore();
const toast = useToast();
const { name } = useDisplay();

var openModal = ref(false);
const loading = ref(false);
const error_msg = ref("");

const couponTypeChoice = [
	{
		title: "Percent discount",
		value: 1,
	},
	{
		title: "Flat discount",
		value: 2,
	},
];

const validationSchema = yup.object().shape({
	name: yup.string().required(),
	code: yup.string().required(),
	min_order_value: yup.number().required(),
	price_type: yup.number().required(),
	discount_amount: yup.number().required(),
	quantity: yup.number().required(),
	is_active: yup.boolean().required(),
});

const { handleSubmit, handleReset } = useForm({
	validationSchema,
});

var formData = {
	name: useField("name", validationSchema),
	code: useField("code", validationSchema),
	min_order_value: useField("min_order_value", validationSchema),
	price_type: useField("price_type", validationSchema),
	discount_amount: useField("discount_amount", validationSchema),
	quantity: useField("quantity", validationSchema),
	is_active: useField("is_active", validationSchema),
};

const handleFormSubmit = handleSubmit((values) => {
	loading.value = true;

	utilityStore
		.createCoupon(values)
		.then((d) => {
			loading.value = false;
			close(true);
			toast.success("Succesfully create coupon!");
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
	formData.price_type.value.value = 2;
	formData.is_active.value.value = false;
	openModal.value = isOpenModal;
});
</script>

<style scoped lang="scss"></style>
