<template>
	<div>
		<v-row class="pa-0 ma-0 pl-0 pr-0 pl-md-5 pr-md-5">
			<v-col cols="12" class="d-flex flex-column ga-5">
				<v-sheet rounded="lg" class="pa-4 d-flex justify-space-between">
					<div>
						<div class="text-surface-bright">Coupons ({{ totalCount }})</div>
					</div>
					<v-btn
						variant="tonal"
						size="small"
						@click="createCampaignModalOpen = true"
					>
						<v-icon color="info" size="x-large">mdi-plus-thick</v-icon>
						<v-tooltip activator="parent" location="bottom"
							>Create Coupon</v-tooltip
						>
					</v-btn>
				</v-sheet>
				<v-sheet rounded="lg" class="pa-4 d-flex justify-space-between">
					<v-row align="center" justify="center">
						<v-col cols="12" md="6" class="mt-2 mb-0 pb-0">
							<FiltersSearch />
						</v-col>
					</v-row>
				</v-sheet>
				<v-sheet rounded="lg" class="pa-4">
					<v-table density="compact" v-if="coupons.length > 0">
						<thead>
							<tr class="text-surface-bright">
								<th class="text-left">Name</th>
								<th class="text-left">Code</th>
								<th class="text-left">Quantity</th>
								<th class="text-left">Type</th>
								<th class="text-left">Is active</th>
								<th class="text-left">Actions</th>
							</tr>
						</thead>
						<tbody>
							<tr v-for="(campaign, idx) in coupons" :key="'campaign_' + idx">
								<td class="text-surface-bright">{{ campaign?.name }}</td>
								<td class="text-surface-bright">
									{{ campaign?.code }}
								</td>
								<td class="text-surface-bright">
									{{ campaign?.quantity }}
								</td>
								<td class="text-surface-bright">
									{{ couponTypeToText(campaign?.price_type) }}
								</td>
								<td class="text-surface-bright">
									<v-icon color="success" v-if="campaign.is_active == true"
										>mdi-check-circle</v-icon
									>
									<v-icon color="error" v-else>mdi-close-circle</v-icon>
								</td>
								<td class="text-surface-bright">
									<div class="d-flex ga-2">
										<div
											class="cursor-pointer"
											@click="handleChangeModalOpen(campaign)"
										>
											<v-icon color="warning">mdi-pencil </v-icon>
											<v-tooltip activator="parent" location="top"
												>Change</v-tooltip
											>
										</div>
										<div
											class="cursor-pointer"
											@click="openDeleteConfirmationModal(campaign)"
										>
											<v-icon color="error">mdi-trash-can </v-icon>
											<v-tooltip activator="parent" location="top"
												>Remove</v-tooltip
											>
										</div>
									</div>
								</td>
							</tr>
						</tbody>
					</v-table>
					<div v-else class="text-center text-surface-bright">
						Not any coupon found!
					</div>
					<v-row v-if="totalPage > 1" class="mt-5">
						<v-col cols="12">
							<v-pagination
								v-model="currentPage"
								:length="totalPage"
								:total-visible="5"
							></v-pagination>
						</v-col>
					</v-row>
				</v-sheet>
			</v-col>
		</v-row>
		<ModalsCouponCreateCoupon
			v-if="createCampaignModalOpen"
			:isOpenModal="createCampaignModalOpen"
			@close="handleCreateCampaignClose"
		/>
		<ModalsCouponEditCoupon
			v-if="updateCouponModalOpen"
			:isOpenModal="updateCouponModalOpen"
			:data="selectedCoupon"
			@close="handleUpdateCouponModalClose"
		/>
		<ModalsYesNoModal
			v-if="deleteCategoryConfirmModalOpen"
			:isOpenModal="deleteCategoryConfirmModalOpen"
			@close="handleDeleteCategoryConfirmation"
		/>
	</div>
</template>

<script setup>
import { useRoute } from "#vue-router";
import { deepCopy, calculateTotalPage, couponTypeToText } from "@/utils/utils";
import { useToast } from "vue-toastification";
import { useUtilityStore } from "@/stores/utility";

const route = useRoute();
const router = useRouter();
const utilityStore = useUtilityStore();
const toast = useToast();

var loading = ref(false);
var coupons = ref([]);
const selectedCoupon = ref(null);
const createCampaignModalOpen = ref(false);
const updateCouponModalOpen = ref(false);
const deleteCategoryConfirmModalOpen = ref(false);

const currentPage = ref(1);
const totalPage = ref(0);
const limit = ref(12);
const offset = ref(0);
const totalCount = ref(0);

watch(
	() => currentPage.value,
	(val, oldVal) => {
		offset.value = val * limit.value - limit.value;
		const query = deepCopy(route.query);
		query["limit"] = limit.value;
		query["offset"] = offset.value;
		router.push({ query: query });
	}
);

watch(
	() => route,
	(val, oldVal) => {
		if (val?.query?.limit == 12 && val?.query?.offset == 0) {
			currentPage.value = 1;
		}
		if (!val?.query?.limit && !val?.query?.offset) {
			currentPage.value = 1;
		}
		handleFetchCampaigns();
	},
	{ deep: true }
);

const handleFetchCampaigns = () => {
	coupons.value = [];
	loading.value = true;

	if (route?.query?.offset) {
		offset.value = route?.query?.offset;
	}

	const params = {
		limit: limit.value,
		offset: offset.value,
	};

	if (route?.query?.search?.length > 3) {
		params["search"] = route?.query?.search;
	}

	utilityStore
		.fetchCoupons(params)
		.then((d) => {
			totalCount.value = d.count;
			totalPage.value = calculateTotalPage(d.count, 12);
			coupons.value = d.results;
			loading.value = false;
		})
		.catch((e) => {
			console.log(e);
			loading.value = false;
		});
};

const handleCreateCampaignClose = (refresh = false) => {
	createCampaignModalOpen.value = false;
	if (refresh == true) {
		handleFetchCampaigns();
	}
};

onMounted(() => {
	if (route?.query?.limit) {
		if (route?.query?.limit != 12) {
			limit.value = 12;
		} else {
			limit.value = route.query.limit;
		}
	}
	if (route?.query?.offset) {
		offset.value = route.query.offset;
		currentPage.value = route.query.offset / limit.value + 1;
	}
	handleFetchCampaigns();
});

const handleChangeModalOpen = (item) => {
	selectedCoupon.value = item;
	updateCouponModalOpen.value = true;
};

const handleUpdateCouponModalClose = (refresh = false) => {
	updateCouponModalOpen.value = false;
	selectedCoupon.value = null;
	if (refresh == true) {
		handleFetchCampaigns();
	}
};

const openDeleteConfirmationModal = (item) => {
	selectedCoupon.value = item;
	deleteCategoryConfirmModalOpen.value = true;
};

const handleCampaignDelete = () => {
	loading.value = true;
	utilityStore
		.deleteCoupon(selectedCoupon?.value?.id)
		.then((d) => {
			loading.value = false;
			handleFetchCampaigns();
			toast.success("Successfully deleted coupon!");
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
	selectedCoupon.value = null;
	deleteCategoryConfirmModalOpen.value = false;
};

useHead({
	title: "Coupons",
});
</script>

<style scoped lang="scss"></style>
