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
			style="width: 400px; max-height: 500px"
		>
			<v-row class="bg-cyan-darken-4 pa-0 ma-0 pt-3">
				<v-col cols="12">
					<div class="d-flex justify-space-between">
						<div class="text-h6">
							<v-icon class="mr-4">mdi-vector-difference</v-icon>
							Add menu item
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
							<v-switch
								class="pl-4"
								v-model="formData.is_highlighted.value.value"
								color="primary"
								:label="`Is Highlighted: ${formData.is_highlighted.value.value}`"
								hide-details
							></v-switch>
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
									Add
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

const { isOpenModal, navigation } = defineProps({
	isOpenModal: false,
	navigation: null,
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

	values["nav"] = navigation;
	utilityStore
		.createMenu(values)
		.then((d) => {
			loading.value = false;
			close(true);
			toast.success("Succesfully add menu item!");
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
	formData.sort_order.value.value = 1;
	formData.is_highlighted.value.value = false;
});
</script>

<style scoped lang="scss"></style>
