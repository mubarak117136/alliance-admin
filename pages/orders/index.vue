<template>
	<div>
		<v-row class="pa-0 ma-0 pl-0 pr-0 pl-md-5 pr-md-5">
			<v-col cols="12" class="d-flex flex-column ga-5">
				<v-sheet rounded="lg" class="pa-4 d-flex justify-space-between">
					<div>
						<div class="text-surface-bright">Orders ({{ totalCount }})</div>
					</div>
				</v-sheet>
				<v-sheet rounded="lg" class="pa-4 d-flex justify-space-between">
					<v-row align="center" justify="center">
						<v-col cols="12" sm="8" md="3" class="mt-2 mb-0 pb-0">
							<FiltersSearch />
						</v-col>

						<v-col cols="6" sm="3" md="2" class="mt-2 mb-0 pb-0">
							<FiltersOrderStatus />
						</v-col>

						<v-col cols="6" sm="3" md="2" class="mt-2 mb-0 pb-0">
							<FiltersShippingCompany />
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
								<th class="text-left">Order ID</th>
								<th class="text-left">QTY</th>
								<th class="text-left">Price</th>
								<th class="text-left">Status</th>
								<th class="text-left">Handle by</th>
								<th class="text-left">Date</th>
								<th class="text-left">Actions</th>
							</tr>
						</thead>
						<tbody>
							<tr v-for="(item, idx) in items" :key="'item_' + idx">
								<td class="text-surface-bright">{{ item?.order_id }}</td>
								<td class="text-surface-bright">
									{{ item?.total_item }}
								</td>
								<td class="text-surface-bright">{{ item?.order_amount }}৳</td>
								<td class="text-surface-bright">
									{{ orderStatusTypeToText(item?.status?.type) }}
								</td>
								<td class="text-surface-bright">
									{{
										item?.authorized_by?.full_name
											? item?.authorized_by?.full_name
											: "Unseen"
									}}
								</td>
								<td class="text-surface-bright">
									{{ dayjs(item.creation_time).format("DD / MM / YYYY") }}
								</td>
								<td class="text-surface-bright">
									<div class="d-flex ga-2">
										<NuxtLink
											:to="{
												name: 'orders-slug',
												params: { slug: item?.order_id },
											}"
											class="cursor-pointer"
										>
											<v-icon color="warning">mdi-open-in-new </v-icon>
											<v-tooltip activator="parent" location="top"
												>Details</v-tooltip
											>
										</NuxtLink>
									</div>
								</td>
							</tr>
						</tbody>
					</v-table>
					<div v-else class="text-center text-surface-bright">
						Not any orders found!
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
import { useRoute } from "#vue-router";
import {
	deepCopy,
	calculateTotalPage,
	orderStatusTypeToText,
	orderStatusColor,
} from "@/utils/utils";
import { useToast } from "vue-toastification";
import { useSaleStore } from "@/stores/sale";

const config = useRuntimeConfig();
const route = useRoute();
const router = useRouter();
const saleStore = useSaleStore();
const toast = useToast();
const dayjs = useDayjs();

var loading = ref(false);
var items = ref([]);

const currentPage = ref(1);
const totalPage = ref(0);
const limit = ref(25);
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
		if (val?.query?.limit == 25 && val?.query?.offset == 0) {
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

	if (route?.query?.status) {
		params["status"] = route?.query?.status;
	}

	if (route?.query?.company) {
		params["company"] = route?.query?.company;
	}

	saleStore
		.fetchOrders(params)
		.then((d) => {
			totalCount.value = d.count;
			totalPage.value = calculateTotalPage(d.count, 25);
			items.value = d.results;
			loading.value = false;
		})
		.catch((e) => {
			console.log(e);
			loading.value = false;
		});
};

const handleClearFilters = () => {
	const query = {};
	router.push({ query: query });
};

onMounted(() => {
	if (route?.query?.limit) {
		if (route?.query?.limit != 25) {
			limit.value = 25;
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

useHead({
	title: "Orders",
});
</script>

<style scoped lang="scss"></style>
