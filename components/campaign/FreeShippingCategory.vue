<template>
	<v-row>
		<v-col cols="12">
			<v-sheet rounded="lg" class="pa-4 d-flex justify-space-between">
				<div class="d-flex ga-5">
					<div class="pa-0 ma-0 my-auto">
						<div class="text-h6 text-surface-bright">Categories</div>
					</div>
				</div>

				<v-btn variant="tonal" size="small" @click="createModalOpen = true">
					<v-icon color="info" size="x-large">mdi-plus-thick</v-icon>
					<v-tooltip activator="parent" location="bottom"
						>Add category</v-tooltip
					>
				</v-btn>
			</v-sheet>
		</v-col>
		<v-col cols="12">
			<CampaignFreeShippingCategoryList
				:refresh="refreshTableStatus"
				:campaign="props?.data"
				@changeStatus="handleChangeStatus"
			/>
		</v-col>
		<ModalsFreeShippingAddCampaignCategory
			v-if="createModalOpen"
			:isOpenModal="createModalOpen"
			:campaign="props?.data"
			@close="handleModalClose"
		/>
	</v-row>
</template>

<script setup>
import { useProductStore } from "@/stores/product";
import { useToast } from "vue-toastification";

const productStore = useProductStore();
const toast = useToast();
const router = useRouter();
const createModalOpen = ref(false);
const refreshTableStatus = ref(false);

const props = defineProps({
	data: null,
});

const loading = ref(false);
const error_msg = ref("");

const handleModalClose = (refresh = false) => {
	createModalOpen.value = false;
	if (refresh == true) {
		refreshTableStatus.value = true;
	}
};

const handleChangeStatus = () => {
	refreshTableStatus.value = false;
};

onMounted(() => {});
</script>

<style scoped lang="scss"></style>
