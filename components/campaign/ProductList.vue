<template>
	<div>
		<v-sheet rounded="lg" class="pa-4">
			<v-row align="center" justify="center" class="pa-0 ma-0">
				<v-col cols="6">
					<v-text-field
						v-model="search"
						variant="outlined"
						prepend-inner-icon="mdi-magnify"
						density="compact"
						class="text-surface-bright"
						placeholder="Search"
						v-debounce:500ms="debounceSearch"
						:loading="loading"
					></v-text-field>
				</v-col>
			</v-row>
			<v-table density="compact" v-if="items.length > 0">
				<thead>
					<tr class="text-surface-bright">
						<th class="text-left"></th>
						<th class="text-left">Name</th>
						<th class="text-left">Category</th>
						<th class="text-left">Is publish?</th>
						<th class="text-left">Actions</th>
					</tr>
				</thead>
				<tbody>
					<tr v-for="(item, idx) in items" :key="'item_' + idx">
						<td class="text-surface-bright" style="width: 80px !important">
							<v-img
								:src="HOST + item?.product?.default_image?.file_detail?.url"
								height="60"
							></v-img>
						</td>
						<td class="text-surface-bright">
							{{ truncateText(item?.product?.name, 40) }}
						</td>
						<td class="text-surface-bright">
							{{ item?.product?.category_detail?.title }}
						</td>
						<td class="text-surface-bright">
							<v-icon color="success" v-if="item?.product?.is_published == true"
								>mdi-check-circle</v-icon
							>
							<v-icon color="error" v-else>mdi-close-circle</v-icon>
						</td>
						<td class="text-surface-bright">
							<div class="d-flex ga-2">
								<div
									class="cursor-pointer"
									@click="handleOpenVariantModal(item)"
								>
									<v-icon color="warning">mdi-pencil </v-icon>
									<v-tooltip activator="parent" location="top"
										>Edit city</v-tooltip
									>
								</div>
								<div
									class="cursor-pointer"
									@click="handleOpenDeleteModal(item)"
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
				Not any item found!
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
		<ModalsEditCampaignCategory
			v-if="editCampaignModalOpen"
			:data="selectedItem"
			:isOpenModal="editCampaignModalOpen"
			@close="handleCloseEditModal"
		/>
		<ModalsYesNoModal
			v-if="deleteCategoryConfirmModalOpen"
			:isOpenModal="deleteCategoryConfirmModalOpen"
			@close="handleDeleteCategoryConfirmation"
		/>
		<ModalsCampaignVariant
			v-if="variantModalOpen"
			:isOpenModal="variantModalOpen"
			:campaign_product="selectedItem.id"
			@close="handleVariantModalClose"
		/>
	</div>
</template>

<script setup>
import { useProductStore } from "@/stores/product";
import { useToast } from "vue-toastification";
import { useRoute } from "#vue-router";
import { truncateText } from "@/utils/utils";

const productStore = useProductStore();
const toast = useToast();
const router = useRouter();
const route = useRoute();
const config = useRuntimeConfig();

const props = defineProps({
	refresh: null,
});
const emit = defineEmits();

const loading = ref(false);
const error_msg = ref("");
var items = ref([]);
const selectedItem = ref(null);
const editCampaignModalOpen = ref(false);
const deleteCategoryConfirmModalOpen = ref(false);
const variantModalOpen = ref(false);
const search = ref("");

const currentPage = ref(1);
const totalPage = ref(0);
const limit = ref(12);
const offset = ref(0);
const totalCount = ref(0);

const handleOpenVariantModal = (item) => {
	selectedItem.value = item;
	variantModalOpen.value = true;
};

const handleVariantModalClose = () => {
	selectedItem.value = null;
	variantModalOpen.value = false;
};

const HOST = computed(() => {
	return config.public.HOST;
});

const debounceSearch = () => {
	const query = deepCopy(route.query);
	if (search.value.length > 3) {
		query["search_text"] = search.value;
		query["offset"] = 0;
		router.push({ query: query });
	} else {
		delete query["search_text"];
		router.push({ query: query });
	}
};

const handleFetchItems = () => {
	loading.value = true;

	if (route?.query?.offset) {
		offset.value = route?.query?.offset;
	}

	const params = {
		limit: limit.value,
		offset: offset.value,
		campaign: route.params.slug,
	};

	if (route?.query?.search_text?.length > 3) {
		params["search_text"] = route?.query?.search_text;
	}

	productStore
		.fetchCampaignProducts(params)
		.then((d) => {
			loading.value = false;
			items.value = d.results;
			totalCount.value = d.count;
			totalPage.value = calculateTotalPage(d.count, 12);
		})
		.catch((e) => {
			console.log(e);
			loading.value = false;
		});
};

const handleOpenEditModal = (item) => {
	selectedItem.value = item;
	editCampaignModalOpen.value = true;
};

const handleCloseEditModal = (refresh = false) => {
	editCampaignModalOpen.value = false;
	if (refresh == true) {
		handleFetchCategories();
	}
};

const handleCategoryThroughDelete = () => {
	loading.value = true;

	const payload = {
		id: selectedItem.value.id,
		campaign: route.params.slug,
	};
	productStore
		.deleteCampaignProductThrough(payload)
		.then((d) => {
			selectedItem.value = null;
			loading.value = false;
			toast.success("Successfully deleted the product!");
			handleFetchItems();
		})
		.catch((e) => {
			selectedItem.value = null;
			loading.value = false;
			console.log(e);
			toast.error("Something went wrong!");
		});
};

const handleDeleteCategoryConfirmation = (status) => {
	if (status == true) {
		handleCategoryThroughDelete();
		deleteCategoryConfirmModalOpen.value = false;
	} else {
		deleteCategoryConfirmModalOpen.value = false;
		selectedItem.value = null;
	}
};

const handleOpenDeleteModal = (item) => {
	selectedItem.value = item;
	deleteCategoryConfirmModalOpen.value = true;
};

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
		handleFetchItems();
	},
	{ deep: true }
);

watch(
	() => props.refresh,
	(val, oldVal) => {
		handleFetchItems();
		emit("handleRefreshDone");
	},
	{ deep: true }
);

onMounted(() => {
	if (route?.query?.search_text) {
		search.value = route?.query?.search_text;
	}
	handleFetchItems();
});
</script>

<style scoped lang="scss"></style>
