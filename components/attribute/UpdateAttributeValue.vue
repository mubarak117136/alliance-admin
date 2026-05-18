<template>
	<v-dialog v-model="openModal" width="auto" @click:outside="close">
		<v-sheet
			rounded="lg"
			class="pa-0 ma-0"
			style="width: 400px; max-height: 400px"
		>
			<v-row class="bg-cyan-darken-4 pa-0 ma-0 pt-3">
				<v-col cols="12">
					<div class="d-flex justify-space-between">
						<div class="text-h6">
							<v-icon class="mr-4">mdi-vector-difference</v-icon>
							Update attribute value
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
						<!-- <div class="text-h6 text-surface-bright">Basic</div> -->
						<v-row class="ma-0">
							<v-col cols="12" class="mb-0 pb-0">
								<v-text-field
									v-model="formData.value.value.value"
									:error-messages="formData.value.errorMessage.value"
									label="Value"
									variant="outlined"
									density="compact"
								></v-text-field>
							</v-col>
							<v-col cols="12" class="mb-0 pb-0">
								<v-text-field
									v-model="formData.price_addition.value.value"
									:error-messages="formData.price_addition.errorMessage.value"
									label="Extra Price"
									variant="outlined"
									density="compact"
								></v-text-field>
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
									Save
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
import { useProductStore } from "@/stores/product";
import { useToast } from "vue-toastification";

const { isOpenModal, data } = defineProps({
	isOpenModal: false,
	data: null,
});
const emit = defineEmits();

const productStore = useProductStore();
const toast = useToast();

var openModal = ref(false);
const loading = ref(false);
const error_msg = ref("");

const validationSchema = yup.object().shape({
	value: yup.string().required(),
	price_addition: yup.number(),
});

const { handleSubmit, handleReset } = useForm({
	validationSchema,
});

var formData = {
	value: useField("value", validationSchema),
	price_addition: useField("price_addition", validationSchema),
};

const handleFormSubmit = handleSubmit((values) => {
	loading.value = true;

	productStore
		.updateAttributeValue({
			slug: data?.slug,
			attribute: data?.attribute,
			data: values,
		})
		.then((d) => {
			loading.value = false;
			close(true);
			toast.success("Succesfully save the attribute value!");
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

const close = (refresh = false) => {
	emit("close", refresh);
};

onMounted(() => {
	openModal.value = isOpenModal;
	formData.value.value.value = data?.value;
	formData.price_addition.value.value = data?.price_addition;
});
</script>

<style scoped lang="scss"></style>
