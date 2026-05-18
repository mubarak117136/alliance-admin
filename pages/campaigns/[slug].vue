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
							<div class="text-h6 text-surface-bright">Campaigns</div>
						</div>
					</div>

					<v-btn
						variant="tonal"
						size="small"
						@click="openDeleteConfirmationModal"
					>
						<v-icon color="error" size="x-large">mdi-trash-can</v-icon>
						<v-tooltip activator="parent" location="bottom"
							>Remove Campaign</v-tooltip
						>
					</v-btn>
				</v-sheet>

				<v-sheet rounded="lg" class="pa-4 d-flex ga-5" v-if="campaign">
					<CampaignDetail :data="campaign" />
				</v-sheet>
				<v-row>
					<v-col cols="12">
						<CampaignCategory v-if="campaign?.type == 0" :data="campaign" />
						<CampaignProduct v-if="campaign?.type == 1" :data="campaign" />
						<CampaignFreeShippingCategory
							v-if="campaign?.type == 3"
							:data="campaign"
						/>
						<CampaignFreeShippingProduct
							v-if="campaign?.type == 4"
							:data="campaign"
						/>
					</v-col>
				</v-row>
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
var campaign = ref(null);
const deleteCategoryConfirmModalOpen = ref(false);

const handleFetchCampaign = () => {
	loading.value = true;
	productStore
		.fetchCampaignDetail(route?.params?.slug)
		.then((d) => {
			campaign.value = d;
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

const handleCampaignDelete = () => {
	loading.value = true;
	productStore
		.deleteCampaign(campaign.value.slug)
		.then((d) => {
			loading.value = false;
			router.push({ name: "campaigns" });
			toast.success("Successfully deleted the campaign!");
		})
		.catch((e) => {
			loading.value = false;
			console.log(e);
			toast.error("Something went wrong!");
		});
};

const handleDeleteCategoryConfirmation = (status) => {
	if (status == true) {
		handleCampaignDelete();
	}
	deleteCategoryConfirmModalOpen.value = false;
};

const handleBack = () => {
	router.push({ name: "campaigns" });
};

onMounted(() => {
	handleFetchCampaign();
});

useHead({
	title: "Campaign detail",
});
</script>

<style scoped lang="scss"></style>
