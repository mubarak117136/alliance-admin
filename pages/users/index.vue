<template>
	<div>
		<v-row class="pa-0 ma-0 pl-0 pr-0 pl-md-5 pr-md-5">
			<v-col cols="12" class="d-flex flex-column ga-5">
				<v-sheet rounded="lg" class="pa-4 d-flex justify-space-between">
					<div>
						<div class="text-surface-bright">Users ({{ totalCount }})</div>
					</div>
				</v-sheet>
				<v-sheet rounded="lg" class="pa-4 d-flex justify-space-between">
					<v-row align="center" justify="center">
						<v-col cols="12" sm="8" md="3" class="mt-2 mb-0 pb-0">
							<FiltersSearch />
						</v-col>
						<v-col cols="6" sm="3" md="2" class="mt-2 mb-0 pb-0">
							<FiltersRole />
						</v-col>
						<v-col cols="6" sm="4" md="2" class="mt-2 mb-0 pb-0">
							<FiltersActive />
						</v-col>
						<v-col cols="6" sm="4" md="2" class="mt-2 mb-0 pb-0">
							<FiltersVerified />
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
					<div v-if="items.length > 0">
						<v-btn color="surface-bright" size="small" @click="handleExportCsv"
							>Export AS CSV</v-btn
						>
						<v-btn
							color="surface-bright"
							class="ml-4"
							size="small"
							@click="handleExportXlsx"
							>Export AS Excel</v-btn
						>
					</div>
					<v-table density="compact" v-if="items.length > 0" class="mt-4">
						<thead>
							<tr class="text-surface-bright">
								<th class="text-left">Name</th>
								<th class="text-left">Username</th>
								<th class="text-left">Role</th>
								<th class="text-left">Verified?</th>
								<th class="text-left">Active?</th>
								<th class="text-left">Join Date</th>
								<th class="text-left">Actions</th>
							</tr>
						</thead>
						<tbody>
							<tr v-for="(item, idx) in items" :key="'item_' + idx">
								<td class="text-surface-bright">
									{{ truncateText(item.full_name, 40) }}
								</td>
								<td class="text-surface-bright">
									{{ item?.username }}
								</td>
								<td class="text-surface-bright">
									{{ item.role }}
								</td>
								<td class="text-surface-bright">
									<v-icon color="success" v-if="item.is_verified == true"
										>mdi-check-circle</v-icon
									>
									<v-icon color="error" v-else>mdi-close-circle</v-icon>
								</td>
								<td class="text-surface-bright">
									<v-icon color="success" v-if="item.is_active == true"
										>mdi-check-circle</v-icon
									>
									<v-icon color="error" v-else>mdi-close-circle</v-icon>
								</td>
								<td class="text-surface-bright">
									{{ dayjs(item.join_date).format("DD / MM / YYYY") }}
								</td>
								<td class="text-surface-bright">
									<div class="d-flex ga-2">
										<NuxtLink
											:to="{ name: 'users-id', params: { id: item.id } }"
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
						Not any users found!
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
import { deepCopy, calculateTotalPage, truncateText } from "@/utils/utils";
import { useUserStore } from "@/stores/user";

const config = useRuntimeConfig();
const route = useRoute();
const router = useRouter();
const userStore = useUserStore();
const dayjs = useDayjs();

const { getToken } = storeToRefs(userStore);

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

watch(
	() => currentPage.value,
	(val, oldVal) => {
		if (val != oldVal) {
			offset.value = val * limit.value - limit.value;
			const query = deepCopy(route.query);
			query["limit"] = limit.value;
			query["offset"] = offset.value;
			router.push({ query: query });
		}
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

	if (route?.query?.search?.length > 3) {
		params["search"] = route?.query?.search;
	}

	if (route?.query?.is_active) {
		params["is_active"] = route?.query?.is_active;
	}

	if (route?.query?.role) {
		params["role"] = route?.query?.role;
	}

	if (route?.query?.is_verified) {
		params["is_verified"] = route?.query?.is_verified;
	}

	userStore
		.fetchUsers(params)
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

const handleClearFilters = () => {
	limit.value = 12;
	offset.value = 0;
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

const handleExportCsv = () => {
	const link = `${HOST.value}/api/v1/account/admin/users/export_csv/?token=${getToken.value}`;
	window.open(link, "_blank");
};

const handleExportXlsx = () => {
	const link = `${HOST.value}/api/v1/account/admin/users/export_xlsx/?token=${getToken.value}`;
	window.open(link, "_blank");
};

useHead({
	title: "Users",
});
</script>

<style scoped lang="scss"></style>
