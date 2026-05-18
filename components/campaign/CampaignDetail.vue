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
						<v-text-field
							label="End date"
							variant="outlined"
							density="compact"
							v-model="showedDateTime"
							@click="openDateTimeSelector = true"
							class="text-surface-bright"
							readonly
						></v-text-field>
					</v-col>
				</v-row>
				<v-row>
					<v-col cols="12" sm="6" lg="6" xl="6" xxl="6">
						<v-select
							label="Select type"
							:items="campaignTypeChoice"
							variant="outlined"
							density="compact"
							v-model="formData.type.value.value"
							:error-messages="formData.type.errorMessage.value"
							item-title="title"
							item-value="value"
							disabled
							class="text-surface-bright"
						></v-select>
					</v-col>
					<v-col cols="12" sm="6" md="6" lg="6">
						<v-text-field
							class="text-surface-bright"
							v-model="formData.meta_title.value.value"
							:error-messages="formData.meta_title.errorMessage.value"
							label="Meta title"
							variant="outlined"
							density="compact"
						></v-text-field>
					</v-col>
				</v-row>
				<v-row>
					<v-col cols="12" sm="6" md="6" lg="6">
						<v-text-field
							class="text-surface-bright"
							v-model="formData.meta_description.value.value"
							:error-messages="formData.meta_description.errorMessage.value"
							label="Meta description"
							variant="outlined"
							density="compact"
						></v-text-field>
					</v-col>
					<v-col cols="12" sm="6" md="6" lg="6">
						<v-text-field
							class="text-surface-bright"
							v-model="formData.meta_keywords.value.value"
							:error-messages="formData.meta_keywords.errorMessage.value"
							label="Meta keywords"
							variant="outlined"
							density="compact"
						></v-text-field>
					</v-col>
				</v-row>

				<v-row v-if="formData.type.value.value == 2">
					<v-col cols="12" sm="12" md="12" lg="12">
						<v-text-field
							class="text-surface-bright"
							v-model="formData.min_order_value.value.value"
							:error-messages="formData.min_order_value.errorMessage.value"
							label="Min order value"
							variant="outlined"
							density="compact"
						></v-text-field>
					</v-col>
				</v-row>

				<v-switch
					v-model="formData.is_active.value.value"
					color="primary"
					:label="`Is Active: ${formData.is_active.value.value}`"
					hide-details
				></v-switch>

				<v-row>
					<v-col cols="12">
						<div class="text-surface-bright mb-5">Logo</div>
						<v-btn
							@click="handleOpenImageChooser('icon')"
							prepend-icon="mdi-image"
							variant="tonal"
							v-if="!selectedIconImage"
							class="text-surface-bright"
						>
							Choose an Image
						</v-btn>
						<v-row>
							<v-col cols="12" class="d-flex align-center ga-5">
								<v-card
									height="140"
									width="140"
									theme="dark"
									elevation="5"
									class="d-flex flex-column align-center justify-center"
									v-if="selectedIconImage"
								>
									<v-img
										:src="HOST + selectedIconImage?.file_detail?.url"
										:height="selectedIconImage.height"
										max-height="140"
										:width="selectedIconImage.width"
									></v-img>
								</v-card>
								<div class="d-flex ga-5" v-if="selectedIconImage">
									<v-btn
										variant="tonal"
										size="small"
										@click="handleOpenImageChooser('icon')"
									>
										<v-icon>mdi-pencil</v-icon>
										<v-tooltip activator="parent" location="bottom"
											>Change</v-tooltip
										>
									</v-btn>
									<v-btn
										variant="tonal"
										size="small"
										color="error"
										@click="handleRemoveImage('icon')"
									>
										<v-icon color="red">mdi-trash-can</v-icon>
										<v-tooltip activator="parent" location="bottom"
											>Remove</v-tooltip
										>
									</v-btn>
								</div>
							</v-col>
						</v-row>
					</v-col>
				</v-row>
				<v-row>
					<v-col cols="12">
						<div class="text-surface-bright mb-5">Cover</div>
						<v-btn
							@click="handleOpenImageChooser('cover')"
							prepend-icon="mdi-image"
							variant="tonal"
							v-if="!selectedCoverImage"
							class="text-surface-bright"
						>
							Choose an Image
						</v-btn>
						<v-row>
							<v-col cols="12" class="d-flex align-center ga-5">
								<v-card
									height="140"
									width="140"
									theme="dark"
									elevation="5"
									class="d-flex flex-column align-center justify-center"
									v-if="selectedCoverImage"
								>
									<v-img
										:src="HOST + selectedCoverImage?.file_detail?.url"
										:height="selectedCoverImage.height"
										max-height="140"
										:width="selectedCoverImage.width"
									></v-img>
								</v-card>
								<div class="d-flex ga-5" v-if="selectedCoverImage">
									<v-btn
										variant="tonal"
										size="small"
										@click="handleOpenImageChooser('cover')"
									>
										<v-icon>mdi-pencil</v-icon>
										<v-tooltip activator="parent" location="bottom"
											>Change</v-tooltip
										>
									</v-btn>
									<v-btn
										variant="tonal"
										size="small"
										color="error"
										@click="handleRemoveImage('cover')"
									>
										<v-icon color="red">mdi-trash-can</v-icon>
										<v-tooltip activator="parent" location="bottom"
											>Remove</v-tooltip
										>
									</v-btn>
								</div>
							</v-col>
						</v-row>
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
						>
							Save
						</v-btn>
					</v-col>
				</v-row>
			</v-form>
		</v-col>
		<ModalsImageChooser
			v-if="imageChooserOpen"
			:isOpenModal="imageChooserOpen"
			:fieldName="imageFieldName"
			@close="handleImageModalClose"
		/>
		<ModalsCustomLoader v-if="loading" :isOpenModal="loading" />
		<ModalsDateTimeSelector
			v-if="openDateTimeSelector"
			:isOpenModal="openDateTimeSelector"
			v-model="selectedDateTime"
			@close="handleCloseDateTimeModal"
		/>
	</v-row>
</template>

<script setup>
import { useField, useForm } from "vee-validate";
import * as yup from "yup";
import { useProductStore } from "@/stores/product";
import { useToast } from "vue-toastification";

const config = useRuntimeConfig();
const productStore = useProductStore();
const toast = useToast();
const router = useRouter();
const dayjs = useDayjs();

const props = defineProps({
	data: null,
});

const selectedIconImage = ref(null);
const selectedCoverImage = ref(null);
const selectedDateTime = ref(dayjs());
const imageFieldName = ref(null);
var imageChooserOpen = ref(false);
const loading = ref(false);
const error_msg = ref("");
const openDateTimeSelector = ref(false);
const showedDateTime = ref(null);

const campaignTypeChoice = [
	{
		title: "Campaign on category",
		value: 0,
	},
	{
		title: "Campaign on product",
		value: 1,
	},
	{
		title: "Free shipping",
		value: 2,
	},
	{
		title: "Free Shipping (Category)",
		value: 3,
	},
	{
		title: "Free Shipping (Product)",
		value: 4,
	},
];

const validationSchema = yup.object().shape({
	name: yup.string().required(),
	type: yup.string().required(),
	min_order_value: yup.number().nullable(),
	is_active: yup.boolean().required(),
	meta_title: yup.string().nullable(),
	meta_description: yup.string().nullable(),
	meta_keywords: yup.string().nullable(),
});

const { handleSubmit, handleReset } = useForm({
	validationSchema,
});

var formData = {
	name: useField("name", validationSchema),
	type: useField("type", validationSchema),
	min_order_value: useField("min_order_value", validationSchema),
	is_active: useField("is_active", validationSchema),
	meta_title: useField("meta_title", validationSchema),
	meta_description: useField("meta_description", validationSchema),
	meta_keywords: useField("meta_keywords", validationSchema),
};

const handleFormSubmit = handleSubmit((values) => {
	loading.value = true;

	if (selectedIconImage.value) {
		values["logo"] = selectedIconImage.value.id;
	} else {
		values["logo"] = null;
	}

	if (selectedCoverImage.value) {
		values["cover_image"] = selectedCoverImage.value.id;
	} else {
		values["cover_image"] = null;
	}

	values["end_date"] = selectedDateTime.value.format();

	productStore
		.updateCampaign({
			slug: props?.data?.slug,
			data: values,
		})
		.then((d) => {
			loading.value = false;
			toast.success("Successfully updated!");
			router.push({
				name: "campaigns-slug",
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

const handleImageModalClose = (data = null) => {
	imageChooserOpen.value = false;
	if (data) {
		if (data.fieldName == "icon") {
			selectedIconImage.value = data.imageData;
			imageFieldName.value = null;
		} else if (data.fieldName == "cover") {
			selectedCoverImage.value = data.imageData;
			imageFieldName.value = null;
		}
	} else {
		selectedIconImage.value = null;
		imageFieldName.value = null;
	}
};

const HOST = computed(() => {
	return config.public.HOST;
});

const handleOpenImageChooser = (fieldName) => {
	imageFieldName.value = fieldName;
	imageChooserOpen.value = true;
};

const handleRemoveImage = (fieldName) => {
	if (fieldName == "icon") {
		selectedIconImage.value = null;
	} else {
		selectedCoverImage.value = null;
	}
};

const handleCloseDateTimeModal = () => {
	openDateTimeSelector.value = false;
	showedDateTime.value = selectedDateTime.value.format("YYYY / MM / DD HH:mm");
};

onMounted(() => {
	if (props.data) {
		formData.name.value.value = props?.data?.name;
		formData.type.value.value = props?.data?.type;
		formData.min_order_value.value.value = props?.data?.min_order_value;
		formData.is_active.value.value = props?.data?.is_active;
		formData.meta_title.value.value = props?.data?.meta_title;
		formData.meta_description.value.value = props?.data?.meta_description;
		formData.meta_keywords.value.value = props?.data?.meta_keywords;
		selectedIconImage.value = props?.data?.logo_detail;
		selectedCoverImage.value = props?.data?.cover_image_detail;
		selectedDateTime.value = dayjs(props?.data?.end_date);
		showedDateTime.value = selectedDateTime.value.format(
			"YYYY / MM / DD HH:mm",
		);
	}
});
</script>

<style scoped lang="scss"></style>
