<template>
	<v-row>
		<v-col cols="12">
			<v-form
				@submit.prevent="handleFormSubmit"
				class="d-flex flex-column ga-2 pa-4"
			>
				<v-row class="ma-0 pa-0">
					<v-col cols="12" md="6" class="ma-0 pa-0">
						<v-text-field
							class="text-surface-bright"
							v-model="formData.name.value.value"
							:error-messages="formData.name.errorMessage.value"
							label="Name"
							variant="outlined"
							density="compact"
						></v-text-field>
					</v-col>
				</v-row>
				<v-row class="ma-0 pa-0">
					<v-col cols="12" class="ma-0 pa-0">
						<v-alert
							v-if="error_msg"
							:text="error_msg"
							type="error"
							class="mb-6"
						></v-alert>
						<v-btn
							:loading="loading"
							variant="tonal"
							class="mt-0 text-surface-bright"
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
import { Form, useField, useForm } from "vee-validate";
import * as yup from "yup";
import { useProductStore } from "@/stores/product";
import { useToast } from "vue-toastification";

const productStore = useProductStore();
const toast = useToast();
const router = useRouter();

const props = defineProps({
	data: null,
});

const loading = ref(false);
const error_msg = ref("");

const validationSchema = yup.object().shape({
	name: yup.string().required(),
});

const { handleSubmit, handleReset } = useForm({
	validationSchema,
});

var formData = {
	name: useField("name", validationSchema),
};

const handleFormSubmit = handleSubmit((values) => {
	loading.value = true;

	productStore
		.updateAttribute({
			slug: props?.data?.slug,
			data: values,
		})
		.then((d) => {
			loading.value = false;
			toast.success("Successfully updated!");
			error_msg.value = "";
			router.push({
				name: "products-attribute-slug",
				params: { slug: d.slug },
			});
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
	}
});
</script>

<style scoped lang="scss"></style>
