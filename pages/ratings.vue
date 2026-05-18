<template>
	<div>
		<v-row class="pa-0 ma-0 pl-0 pr-0 pl-md-5 pr-md-5">
			<v-col cols="12" class="d-flex flex-column ga-5">
				<v-sheet rounded="lg" class="pa-4 d-flex justify-space-between">
					<div>
						<div class="text-surface-bright">Ratings ({{ totalCount }})</div>
					</div>
				</v-sheet>
				<v-sheet rounded="lg" class="pa-4 d-flex justify-space-between">
					<v-row align="center" justify="center">
						<v-col cols="12" md="6" class="mt-2 mb-0 pb-0">
							<FiltersSearch />
						</v-col>
						<v-col cols="12" md="2" class="mt-2 mb-0 pb-0">
							<FiltersActive />
						</v-col>
						<v-col cols="2" md="1" class="ma-0 mb-0 pb-0 pt-0">
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
								<th class="text-left">Product</th>
								<th class="text-left">User</th>
								<th class="text-left">Rating</th>
								<th class="text-left">Review</th>
								<th class="text-left">Date</th>
								<th class="text-left">Is active</th>
							</tr>
						</thead>
						<tbody>
							<tr v-for="(item, idx) in items" :key="'ratings_' + idx">
								<td class="text-surface-bright">
									<NuxtLink :to="'/products/' + item?.product?.slug">
										<v-img
											:src="HOST + item?.product?.default_image?.original?.src"
											width="60"
										></v-img>
									</NuxtLink>
								</td>
								<td class="text-surface-bright">
									<NuxtLink
										:to="'/products/' + item?.product?.slug"
										class="text-surface-variant text-decoration-none"
										>{{ truncateText(item?.product?.name, 40) }}</NuxtLink
									>
								</td>
								<td class="text-surface-variant" style="max-width: 250px">
									{{ item?.user?.full_name }}
								</td>
								<td class="text-surface-bright">
									<v-rating
										v-model="item.rating"
										active-color="orange-lighten-1"
										color="blue"
										density="compact"
										readonly
									></v-rating>
								</td>
								<td class="text-surface-variant" style="max-width: 300px">
									{{ item?.review }}
								</td>
								<td class="text-surface-variant">
									{{ dayjs(item?.creation_time).format("DD / MM / YYYY") }}
								</td>
								<td class="text-surface-variant" style="max-width: 200px">
									<v-switch
										v-model="item.is_active"
										color="primary"
										label=""
										hide-details
										@update:modelValue="handleStatusChange(item)"
									></v-switch>
								</td>
							</tr>
						</tbody>
					</v-table>
					<div v-else class="text-center text-surface-bright">
						Not any ratings found!
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
import { truncateText } from "@/utils/utils";
import { useToast } from "vue-toastification";
import { useUserStore } from "@/stores/user";

const config = useRuntimeConfig();
const route = useRoute();
const router = useRouter();
const userStore = useUserStore();
const toast = useToast();
const dayjs = useDayjs();

var loading = ref(false);
var items = ref([]);

const currentPage = ref(1);
const totalPage = ref(0);
const limit = ref(12);
const offset = ref(0);
const totalCount = ref(0);

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

	if (route?.query?.is_active) {
		params["is_active"] = route?.query?.is_active;
	}

	userStore
		.fetchRatings(params)
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

const handleStatusChange = (item) => {
	loading.value = true;

	const payload = {
		rating: item?.id,
		status: item?.is_active,
	};
	userStore
		.updateRatingStatus(payload)
		.then((d) => {
			loading.value = false;
			toast.success("Successfully updated!");
		})
		.catch((e) => {
			loading.value = false;
			console.log(e);
			toast.error("Something went wrong!");
		});
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

const handleClearFilters = () => {
	limit.value = 12;
	offset.value = 0;
	const query = {};
	router.push({ query: query });
};

useHead({
	title: "Ratings",
});
</script>

<style scoped lang="scss"></style>
