<template>
	<div>
		<v-row class="pa-0 ma-0 pl-0 pr-0 pl-md-5 pr-md-5">
			<v-col cols="12" class="d-flex flex-column ga-5">
				<v-sheet rounded="lg" class="pa-4 d-flex justify-space-between">
					<div class="d-flex ga-5">
						<div class="cursor-pointer pa-0 ma-0 my-auto" @click="handleBack">
							<v-icon color="info" size="large">mdi-keyboard-backspace </v-icon>
						</div>
						<div class="pa-0 ma-0 my-auto">
							<div class="text-h6 text-surface-bright">Brands</div>
						</div>
					</div>

					<v-btn
						variant="tonal"
						size="small"
						@click="openDeleteConfirmationModal"
					>
						<v-icon color="error" size="x-large">mdi-trash-can</v-icon>
						<v-tooltip activator="parent" location="bottom"
							>Remove Brand</v-tooltip
						>
					</v-btn>
				</v-sheet>

				<v-sheet rounded="lg" class="pa-4 d-flex ga-5" v-if="brand">
					<BrandDetail :data="brand" />
				</v-sheet>
			</v-col>
		</v-row>
		<ModalsYesNoModal
			v-if="deleteCategoryConfirmModalOpen"
			:isOpenModal="deleteCategoryConfirmModalOpen"
			@close="handleDeleteCategoryConfirmation"
		/>
	</div>
</template>

<script setup>
import { useProductStore } from "@/stores/product";
import { useRoute } from "#vue-router";
import { deepCopy, calculateTotalPage } from "@/utils/utils";
import { useToast } from "vue-toastification";

const route = useRoute();
const router = useRouter();
const productStore = useProductStore();
const toast = useToast();

var loading = ref(false);
var brand = ref(null);
const deleteCategoryConfirmModalOpen = ref(false);

const handleFetchBrand = () => {
	loading.value = true;
	productStore
		.fetchBrandDetail(route?.params?.slug)
		.then((d) => {
			brand.value = d;
			loading.value = false;
		})
		.catch((e) => {
			console.log(e);
			loading.value = false;
		});
};

const openDeleteConfirmationModal = () => {
	deleteCategoryConfirmModalOpen.value = true;
};

const handleBrandDelete = () => {
	loading.value = true;
	productStore
		.deleteBrand(brand.value.slug)
		.then((d) => {
			loading.value = false;
			router.push({ name: "products-brand" });
			toast.success("Successfully deleted the brand!");
		})
		.catch((e) => {
			loading.value = false;
			console.log(e);
			toast.error("Something went wrong!");
		});
};

const handleDeleteCategoryConfirmation = (status) => {
	if (status == true) {
		handleBrandDelete();
	}
	deleteCategoryConfirmModalOpen.value = false;
};

const handleBack = () => {
	router.push({ name: "products-brand" });
};

onMounted(() => {
	handleFetchBrand();
});

useHead({
	title: "Brand details",
});
</script>

<style scoped lang="scss"></style>
