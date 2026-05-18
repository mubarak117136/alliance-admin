<template>
	<v-dialog
		v-model="openModal"
		width="auto"
		scroll-strategy="none"
		@click:outside="close"
	>
		<v-sheet
			rounded="lg"
			class="pa-0 ma-0"
			style="width: 400px; max-height: 450px"
		>
			<v-row class="bg-cyan-darken-4 pa-0 ma-0 pt-3">
				<v-col cols="12">
					<div class="d-flex justify-space-between">
						<div class="text-h6">
							<v-icon class="mr-4">mdi-vector-difference</v-icon>
							Change submenu
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
							<v-col cols="12" class="pb-0 ma-0">
								<v-text-field
									class="text-surface-bright"
									label="Title"
									variant="outlined"
									density="compact"
									v-model="formData.title.value.value"
									:error-messages="formData.title.errorMessage.value"
								></v-text-field>
							</v-col>
							<v-col cols="12" class="pb-0 ma-0">
								<v-text-field
									class="text-surface-bright"
									label="Link"
									variant="outlined"
									density="compact"
									v-model="formData.link.value.value"
									:error-messages="formData.link.errorMessage.value"
								></v-text-field>
							</v-col>
							<v-col cols="12" class="pb-0 ma-0">
								<v-text-field
									class="text-surface-bright"
									label="Sort order"
									variant="outlined"
									density="compact"
									v-model="formData.sort_order.value.value"
									:error-messages="formData.sort_order.errorMessage.value"
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
import { useToast } from "vue-toastification";
import { useRoute } from "#vue-router";
import { useUtilityStore } from "@/stores/utility";

const { isOpenModal, data } = defineProps({
	isOpenModal: false,
	data: null,
});
const emit = defineEmits();

const utilityStore = useUtilityStore();
const toast = useToast();
const route = useRoute();

var openModal = ref(false);
const loading = ref(false);
const error_msg = ref("");

const validationSchema = yup.object().shape({
	title: yup.string().required(),
	link: yup.string().nullable(),
	sort_order: yup.number().required(),
});

const { handleSubmit, handleReset } = useForm({
	validationSchema,
});

var formData = {
	title: useField("title", validationSchema),
	link: useField("link", validationSchema),
	sort_order: useField("sort_order", validationSchema),
};

const handleFormSubmit = handleSubmit((values) => {
	loading.value = true;

	const payload = {
		id: data?.id,
		params: {
			menu: data?.menu,
		},
		data: values,
	};
	utilityStore
		.updateSubMenu(payload)
		.then((d) => {
			loading.value = false;
			close(true);
			toast.success("Succesfully updated!");
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
	formData.title.value.value = data?.title;
	formData.link.value.value = data?.link;
	formData.sort_order.value.value = data?.sort_order;
});
</script>

<style scoped lang="scss"></style>
