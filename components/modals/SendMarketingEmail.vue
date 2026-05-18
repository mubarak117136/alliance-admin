<template>
	<v-dialog
		v-model="openModal"
		width="auto"
		scroll-strategy="none"
		@click:outside="close"
	>
		<v-sheet rounded="lg" class="pa-0 ma-0" style="width: 50vw; height: 70vh">
			<v-row class="bg-cyan-darken-4 pa-0 ma-0 pt-3">
				<v-col cols="12">
					<div class="d-flex justify-space-between">
						<div class="text-h6">
							<v-icon class="mr-4">mdi-email</v-icon>
							Send Emails
						</div>
						<div>
							<v-icon class="cursor-pointer" @click="close">mdi-close</v-icon>
						</div>
					</div>
				</v-col>
			</v-row>
			<v-form
				@submit.prevent="handleFormSubmit"
				class="d-flex flex-column ga-2 pa-4"
				id="create-modal-form"
			>
				<div class="d-flex pa-10">
					<v-row class="ma-0">
						<v-col cols="12" class="mb-0 pb-0">
							<v-text-field
								v-model="formData.subject.value.value"
								:error-messages="formData.subject.errorMessage.value"
								label="Email Subject"
								variant="outlined"
								density="compact"
								hide-details="auto"
							></v-text-field>
						</v-col>
						<v-col cols="12" class="mt-4 mb-0 pb-0">
							<package-tiptap v-model="formData.content.value.value" />
						</v-col>
						<v-col cols="12" class="mt-4">
							<v-btn
								:loading="loading"
								class="bg-blue"
								variant="tonal"
								type="submit"
							>
								Send Email
							</v-btn>
						</v-col>
					</v-row>
				</div>
			</v-form>
		</v-sheet>
	</v-dialog>
</template>

<script setup>
import { Form, useField, useForm } from "vee-validate";
import * as yup from "yup";
import { useToast } from "vue-toastification";
import { useUserStore } from "@/stores/user";

const config = useRuntimeConfig();
const toast = useToast();
const userStore = useUserStore();

const { isOpenModal, emails } = defineProps({
	isOpenModal: false,
	emails: [],
});
const emit = defineEmits();

var openModal = ref(false);
var loading = ref(false);

const HOST = computed(() => {
	return config.public.HOST;
});

const close = () => {
	emit("close");
};

const validationSchema = yup.object().shape({
	subject: yup.string().required(),
	content: yup.string().required(),
});

const { handleSubmit, handleReset } = useForm({
	validationSchema,
});

var formData = {
	subject: useField("subject", validationSchema),
	content: useField("content", validationSchema),
};

const handleFormSubmit = handleSubmit((values) => {
	loading.value = true;

	values["emails"] = emails;

	userStore
		.sendMarketingEmail(values)
		.then((res) => {
			loading.value = false;
			toast.success("Successfully sent!");
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
				}
			} else {
				err_msg = `Something went wrong!`;
			}
			toast.error(err_msg);
		});

	loading.value = false;
});

onMounted(() => {
	openModal.value = isOpenModal;
});
</script>

<style scoped lang="scss"></style>
