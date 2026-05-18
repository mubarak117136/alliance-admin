<template>
	<div>
		<v-row>
			<v-col
				cols="12"
				class="d-flex flex-wrap align-center ga-5"
				v-if="props?.source == 'create' && images.length > 0"
			>
				<v-card
					height="180"
					width="140"
					theme="dark"
					elevation="5"
					class="d-flex flex-column align-center justify-center"
					v-for="(image, idx) in images"
					:key="'image_' + idx"
				>
					<v-img
						:src="HOST + image?.file_detail?.url"
						:height="image?.height"
						max-height="140"
						:width="image?.width"
					></v-img>
					<v-card-actions>
						<v-btn
							variant="tonal"
							size="small"
							@click="imageModalOpenFromEdit(idx)"
						>
							<v-icon color="surface-bright">mdi-pencil</v-icon>
							<v-tooltip activator="parent" location="bottom">Change</v-tooltip>
						</v-btn>
						<v-btn
							variant="tonal"
							size="small"
							color="error"
							@click="handleRemoveImage(idx)"
						>
							<v-icon color="red">mdi-trash-can</v-icon>
							<v-tooltip activator="parent" location="bottom">Remove</v-tooltip>
						</v-btn>
					</v-card-actions>
				</v-card>
			</v-col>

			<v-col
				cols="12"
				class="d-flex flex-wrap align-center ga-5"
				v-if="props?.source == 'edit' && images.length > 0"
			>
				<v-card
					height="180"
					width="140"
					theme="dark"
					elevation="5"
					class="d-flex flex-column align-center justify-center"
					v-for="(image, idx) in images"
					:key="'image_' + idx"
				>
					<v-img
						:src="HOST + image?.image_detail?.file_detail?.url"
						:height="image?.image_detail?.height"
						max-height="140"
						:width="image?.image_detail?.width"
					></v-img>
					<v-card-actions>
						<v-btn
							variant="tonal"
							size="small"
							@click="imageModalOpenFromEdit(idx)"
						>
							<v-icon color="surface-bright">mdi-pencil</v-icon>
							<v-tooltip activator="parent" location="bottom">Change</v-tooltip>
						</v-btn>
						<v-btn
							variant="tonal"
							size="small"
							color="error"
							@click="handleRemoveProductImage(image)"
						>
							<v-icon color="red">mdi-trash-can</v-icon>
							<v-tooltip activator="parent" location="bottom">Remove</v-tooltip>
						</v-btn>
					</v-card-actions>
				</v-card>
			</v-col>

			<v-col cols="12" v-if="images.length < 5">
				<v-btn
					prepend-icon="mdi-image"
					variant="tonal"
					class="text-surface-bright"
					@click="imageChooserOpen = true"
				>
					Choose an Image
				</v-btn>
			</v-col>
		</v-row>
		<ModalsImageChooser
			v-if="imageChooserOpen"
			:isOpenModal="imageChooserOpen"
			:fieldName="updatableImageIndex"
			@close="handleImageModalClose"
		/>
	</div>
</template>

<script setup>
import { useProductStore } from "@/stores/product";
import { useToast } from "vue-toastification";
import { useRoute } from "#vue-router";

const config = useRuntimeConfig();
const route = useRoute();
const toast = useToast();
const productStore = useProductStore();

const props = defineProps({
	modelValue: null,
	source: null,
});

const emit = defineEmits(["update:modelValue", "refreshData"]);

var loading = ref(false);
const images = ref([]);
const imageChooserOpen = ref(false);
const updatableImageIndex = ref(null);

const HOST = computed(() => {
	return config.public.HOST;
});

const handleRemoveImage = (index) => {
	images.value.splice(index, 1);
};

const imageModalOpenFromEdit = (index) => {
	updatableImageIndex.value = index.toString();
	imageChooserOpen.value = true;
};

const handleRemoveProductImage = (image) => {
	loading.value = true;

	const payload = {
		product: route.params.slug,
		product_image: image.id,
	};

	productStore
		.deleteProductImage(payload)
		.then((d) => {
			emit("refreshData");
			loading.value = false;
			toast.success("Image remove successfully!");
		})
		.catch((e) => {
			loading.value = false;
			console.log(e);
			toast.error("Something went wrong!");
		});
};

const handleAddProductImageForEdit = (imageId) => {
	loading.value = true;

	const payload = {
		product: route.params.slug,
		image: imageId,
	};
	productStore
		.addProductImage(payload)
		.then((d) => {
			emit("refreshData");
			loading.value = false;
			toast.success("Image added successfully!");
		})
		.catch((e) => {
			loading.value = false;
			console.log(e);
			toast.error("Something went wrong!");
		});
};

const handleEditProductImageForEdit = (imageId) => {
	loading.value = true;
	const payload = {
		product: route.params.slug,
		product_image: images.value[updatableImageIndex.value].id,
		image: imageId,
	};

	productStore
		.updateProductImage(payload)
		.then((d) => {
			emit("refreshData");
			loading.value = false;
			toast.success("Image updated successfully!");
			updatableImageIndex.value = null;
		})
		.catch((e) => {
			loading.value = false;
			console.log(e);
			toast.error("Something went wrong!");
		});
};

const handleImageModalClose = (data = null) => {
	imageChooserOpen.value = false;

	if (props.source == "create") {
		if (data?.fieldName) {
			if (data?.fieldName == updatableImageIndex.value) {
				handleRemoveImage(data?.fieldName);
				images.value.splice(data?.fieldName, 0, data?.imageData);
				updatableImageIndex.value = null;
				emit("update:modelValue", images.value);
				return;
			}
		}

		if (data?.imageData) {
			images.value.push(data.imageData);
			emit("update:modelValue", images.value);
		}
	} else if (props.source == "edit") {
		if (data?.fieldName) {
			if (data?.fieldName == updatableImageIndex.value) {
				handleEditProductImageForEdit(data?.imageData?.id);
				return;
			}
		}
		if (data?.imageData) {
			handleAddProductImageForEdit(data?.imageData?.id);
		}
	}
};

watch(
	() => props.modelValue,
	(val, oldVal) => {
		images.value = val;
	},
	{ deep: true }
);

onMounted(() => {});
</script>

<style scoped lang="scss"></style>
