<template>
	<div>
		<v-row class="pa-0 ma-0 pl-0 pr-0 pl-md-5 pr-md-5">
			<v-col cols="12" class="d-flex flex-column ga-5">
				<v-sheet rounded="lg" class="pa-4 d-flex justify-space-between">
					<div>
						<div class="text-surface-bright">Products ({{ totalCount }})</div>
					</div>
					<v-btn variant="tonal" size="small" @click="createProductClick">
						<v-icon color="info" size="x-large">mdi-plus-thick</v-icon>
						<v-tooltip activator="parent" location="bottom"
							>Create Product</v-tooltip
						>
					</v-btn>
				</v-sheet>
				<v-sheet rounded="lg" class="pa-4 d-flex justify-space-between">
					<v-row align="center" justify="center">
						<v-col cols="12" sm="8" md="3" class="mt-2 mb-0 pb-0">
							<FiltersSearch />
						</v-col>
						<v-col cols="6" sm="3" md="2" class="mt-2 mb-0 pb-0">
							<FiltersCategory />
						</v-col>
						<v-col cols="6" sm="4" md="2" class="mt-2 mb-0 pb-0">
							<FiltersBrand />
						</v-col>
						<v-col cols="6" sm="4" md="2" class="mt-2 mb-0 pb-0">
							<FiltersStatus />
						</v-col>
						<v-col cols="3" sm="2" md="1" class="ma-0 mb-0 pb-0 pt-0">
							<v-btn color="error" size="small" @click="handleClearFilters">
								<v-icon>mdi-close</v-icon>
								<v-tooltip activator="parent" location="bottom"
									>Clear filters</v-tooltip
								>
							</v-btn>
						</v-col>
					</v-row>
				</v-sheet>
				<v-sheet rounded="lg" class="pa-4">
					<v-table density="compact" v-if="items.length > 0">
						<thead>
							<tr class="text-surface-bright">
								<th class="text-left"></th>
								<th class="text-left">Name</th>
								<th class="text-left">Category</th>
								<th class="text-left">Is publish?</th>
								<th class="text-left">Last Update</th>
								<th class="text-left">Actions</th>
							</tr>
						</thead>
						<tbody>
							<tr v-for="(item, idx) in items" :key="'item_' + idx">
								<td class="text-surface-bright" style="width: 80px !important">
									<v-img
										:src="HOST + item?.default_image?.file_detail?.url"
										height="60"
									></v-img>
								</td>
								<td class="text-surface-bright">
									{{ truncateText(item?.name, 40) }}
								</td>
								<td class="text-surface-bright">
									{{ item?.category_detail?.title }}
								</td>
								<td class="text-surface-bright">
									<v-icon color="success" v-if="item?.is_published == true"
										>mdi-check-circle</v-icon
									>
									<v-icon color="error" v-else>mdi-close-circle</v-icon>
								</td>
								<td class="text-surface-bright">
									{{ dayjs(item?.update_time).format("DD / MM / YYYY") }}
								</td>
								<td class="text-surface-bright">
									<div class="d-flex ga-2">
										<NuxtLink
											:to="{
												name: 'products-slug',
												params: { slug: item?.slug },
											}"
											class="cursor-pointer"
										>
											<v-icon color="warning">mdi-open-in-new </v-icon>
											<v-tooltip activator="parent" location="top"
												>Details</v-tooltip
											>
										</NuxtLink>

										<a
											href="#"
											@click.prevent="handleOpenCopyModal(item?.id)"
											class="cursor-pointer"
										>
											<v-icon color="blue">mdi-content-copy </v-icon>
											<v-tooltip activator="parent" location="top"
												>Copy</v-tooltip
											>
										</a>
									</div>
								</td>
							</tr>
						</tbody>
					</v-table>
					<div v-else class="text-center text-surface-bright">
						Not any product found!
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
		<ModalsYesNoModal
			v-if="copyModalOpen"
			:isOpenModal="copyModalOpen"
			source="copy"
			@close="handleCloseCopyModal"
		/>
	</div>
</template>

<script setup>
import { useProductStore } from "@/stores/product";
import { useRoute } from "#vue-router";
import { deepCopy, calculateTotalPage, truncateText } from "@/utils/utils";
import { useToast } from "vue-toastification";

const config = useRuntimeConfig();
const route = useRoute();
const router = useRouter();
const productStore = useProductStore();
const toast = useToast();
const dayjs = useDayjs();

var loading = ref(false);
var items = ref([]);

const currentPage = ref(1);
const totalPage = ref(0);
const limit = ref(12);
const offset = ref(0);
const totalCount = ref(0);
const copyId = ref(null);
const copyModalOpen = ref(false);

const resetParams = () => {
	limit.value = 12;
	offset.value = 0;
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

const HOST = computed(() => {
	return config.public.HOST;
});

const handleFetchItems = () => {
	items.value = [];
	loading.value = true;

	if (route?.query?.offset) {
		offset.value = route?.query?.offset;
	}

	const params = {
		limit: limit.value,
		offset: offset.value,
	};

	if (route?.query?.search?.length > 2) {
		params["search"] = route?.query?.search;
	}

	if (route?.query?.category) {
		params["category"] = route?.query?.category;
	}

	if (route?.query?.brand) {
		params["brand"] = route?.query?.brand;
	}

	if (route?.query?.status) {
		params["status"] = route?.query?.status;
	}

	productStore
		.fetchProducts(params)
		.then((d) => {
			totalCount.value = d.count;
			totalPage.value = calculateTotalPage(d.count, 12);
			items.value = d.results;
			loading.value = false;
		})
		.catch((e) => {
			console.log(e);
			loading.value = false;
		});
};

const createProductClick = () => {
	router.push({ name: "products-create" });
};

const handleClearFilters = () => {
	const query = {};
	router.push({ query: query });
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
	handleFetchItems();
});

const handleCopyItem = (id) => {
	loading.value = true;
	productStore
		.copyProduct({
			product: id,
		})
		.then((d) => {
			handleFetchItems();
			loading.value = false;
		})
		.catch((e) => {
			loading.value = false;
			console.log(e);
		});
};

const handleCloseCopyModal = (status = false) => {
	if (status == true) {
		handleCopyItem(copyId.value);
	}
	copyId.value = null;
	copyModalOpen.value = false;
};

const handleOpenCopyModal = (id) => {
	copyId.value = id;
	copyModalOpen.value = true;
};

useHead({
	title: "Products",
});
</script>

<style scoped lang="scss"></style>
