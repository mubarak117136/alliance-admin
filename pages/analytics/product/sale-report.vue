<template>
	<div>
		<v-row class="pa-0 ma-0 pl-0 pr-0 pl-md-5 pr-md-5">
			<v-col cols="12" class="d-flex flex-column ga-5">
				<v-sheet rounded="lg" class="pa-4 d-flex justify-space-between">
					<div>
						<div class="text-surface-bright">Sale Reports</div>
					</div>
				</v-sheet>
				<v-sheet rounded="lg" class="pa-4 d-flex justify-space-between">
					<v-row align="center" justify="center">
						<v-col cols="12" sm="8" md="3" class="mt-2 mb-0 pb-0">
							<FiltersSearch />
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
					<AnalyticsDateSelect class="mb-10" />
					<v-table density="compact" v-if="items.length > 0">
						<thead>
							<tr class="text-surface-bright">
								<th class="text-left">Date</th>
								<th class="text-left">Product Name</th>
								<th class="text-left">Total Sale</th>
							</tr>
						</thead>
						<tbody>
							<tr v-for="(item, idx) in items" :key="'item_' + idx">
								<td class="text-surface-bright">
									{{ dayjs(item?.date).format("DD / MM / YYYY") }}
								</td>
								<td class="text-surface-bright">
									<NuxtLink
										class="text-surface-bright text-decoration-none"
										:to="`/products/${item?.product__slug}`"
									>
										{{ truncateText(item?.product__name, 100) }}
									</NuxtLink>
								</td>
								<td class="text-surface-bright">
									{{ item?.total_sale }}
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
	</div>
</template>

<script setup>
import { useSaleStore } from "@/stores/sale";
import { useRoute } from "#vue-router";
import { deepCopy, calculateTotalPage, truncateText } from "@/utils/utils";

const config = useRuntimeConfig();
const route = useRoute();
const router = useRouter();
const saleStore = useSaleStore();
const dayjs = useDayjs();

var loading = ref(false);
var items = ref([]);

const currentPage = ref(1);
const totalPage = ref(0);
const limit = ref(30);
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
	},
);

watch(
	() => route,
	(val, oldVal) => {
		if (val?.query?.limit == 30 && val?.query?.offset == 0) {
			currentPage.value = 1;
		}
		if (!val?.query?.limit && !val?.query?.offset) {
			currentPage.value = 1;
		}
		handleFetchItems();
	},
	{ deep: true },
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
		start_date: route?.query?.start_date,
		end_date: route?.query?.end_date,
		limit: limit.value,
		offset: offset.value,
	};

	if (route?.query?.search?.length > 2) {
		params["search"] = route?.query?.search;
	}

	saleStore
		.getSaleReport(params)
		.then((d) => {
			totalCount.value = d.count;
			totalPage.value = calculateTotalPage(d.count, 30);
			items.value = d.results;
			loading.value = false;
		})
		.catch((e) => {
			console.log(e);
			loading.value = false;
		});
};

const handleClearFilters = () => {
	const query = {
		start_date: route?.query?.start_date,
		end_date: route?.query?.end_date,
	};
	router.push({ query: query });
};

onMounted(() => {
	if (route?.query?.limit) {
		if (route?.query?.limit != 30) {
			limit.value = 30;
		} else {
			limit.value = route.query.limit;
		}
	}
	if (route?.query?.offset) {
		offset.value = route.query.offset;
		currentPage.value = route.query.offset / limit.value + 1;
	}
	if (route?.query?.start_date && route?.query?.end_date) {
		handleFetchItems();
	}
});

useHead({
	title: "Sale Report",
});
</script>

<style scoped lang="scss"></style>
