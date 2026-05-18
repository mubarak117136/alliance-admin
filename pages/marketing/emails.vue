<template>
	<div>
		<v-row class="pa-0 ma-0 pl-0 pr-0 pl-md-5 pr-md-5">
			<v-col cols="12" class="d-flex flex-column ga-5">
				<v-sheet rounded="lg" class="pa-4 d-flex justify-space-between">
					<div>
						<div class="text-surface-bright">Emails ({{ totalCount }})</div>
					</div>
				</v-sheet>
				<v-sheet rounded="lg" class="pa-4 d-flex justify-space-between">
					<v-row class="d-flex justify-center">
						<v-col cols="12" md="6" class="mt-2 mb-0 pb-0">
							<FiltersSearch />
						</v-col>
					</v-row>
				</v-sheet>
				<v-sheet rounded="lg" class="pa-4">
					<div class="d-flex ga-2" v-if="items.length > 0">
						<div class="d-flex ga-2">
							<v-btn
								@click="handleSelectAll"
								color="surface-bright"
								class="text-capitalize"
								size="small"
								>Select All</v-btn
							>
							<v-btn
								@click="handleUnselectAll"
								color="surface-bright"
								class="bg-red text-capitalize"
								size="small"
								>UnSelect All</v-btn
							>
							<v-btn
								@click="handleSendEmail"
								color="surface-bright"
								class="bg-blue text-capitalize ml-4"
								size="small"
								>Send Email</v-btn
							>
						</div>
						<v-spacer></v-spacer>
						<div>
							<v-btn
								color="surface-bright"
								class="text-capitalize"
								size="small"
								@click="handleExportCsv"
								>Export AS CSV</v-btn
							>
							<v-btn
								color="surface-bright"
								class="ml-4 text-capitalize"
								size="small"
								@click="handleExportXlsx"
								>Export AS Excel</v-btn
							>
						</div>
					</div>

					<v-table density="compact" v-if="items.length > 0" class="mt-4">
						<thead>
							<tr class="text-surface-bright">
								<th class="text-left"></th>
								<th class="text-left">Name</th>
								<th class="text-left">Email</th>
								<th class="text-left">Is Active</th>
							</tr>
						</thead>
						<tbody>
							<tr v-for="(item, idx) in items" :key="'emails_' + idx">
								<td class="text-surface-bright">
									<v-checkbox
										v-model="item.checked"
										hide-details="auto"
									></v-checkbox>
								</td>
								<td class="text-surface-bright">{{ item?.full_name }}</td>
								<td class="text-surface-bright">{{ item?.email }}</td>
								<td class="text-surface-bright">
									<v-icon color="success" v-if="item.is_active == true"
										>mdi-check-circle</v-icon
									>
									<v-icon color="error" v-else>mdi-close-circle</v-icon>
								</td>
							</tr>
						</tbody>
					</v-table>
					<div v-else class="text-center text-surface-bright">
						Not any emails found!
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
		<ModalsSendMarketingEmail
			v-if="sendEmailModalOpen"
			:isOpenModal="sendEmailModalOpen"
			:emails="selectedItems"
			@close="sendEmailModalOpen = false"
		/>
	</div>
</template>

<script setup>
import { useRoute } from "#vue-router";
import { deepCopy, calculateTotalPage } from "@/utils/utils";
import { useToast } from "vue-toastification";
import { useSaleStore } from "@/stores/sale";
import { useUserStore } from "@/stores/user";

const config = useRuntimeConfig();
const route = useRoute();
const router = useRouter();
const saleStore = useSaleStore();
const userStore = useUserStore();
const toast = useToast();

const { getToken } = storeToRefs(userStore);

var loading = ref(false);
var items = ref([]);
const selectedItems = ref([]);
const sendEmailModalOpen = ref(false);

const currentPage = ref(1);
const totalPage = ref(0);
const limit = ref(25);
const offset = ref(0);
const totalCount = ref(0);

const HOST = computed(() => {
	return config.public.HOST;
});

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

	saleStore
		.fetchAllEmails(params)
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

const handleSelectAll = () => {
	for (var i = 0; i < items?.value?.length; i++) {
		items.value[i].checked = true;
	}
};

const handleUnselectAll = () => {
	for (var i = 0; i < items?.value?.length; i++) {
		items.value[i].checked = false;
	}
};

const handleSendEmail = () => {
	selectedItems.value = items.value
		.filter((item) => item.checked && item.email)
		.map((item) => item.email);
	sendEmailModalOpen.value = true;
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

const handleExportCsv = () => {
	const link = `${HOST.value}/api/v1/sell/admin/marketing/emails/export_csv/?token=${getToken.value}`;
	window.open(link, "_blank");
};

const handleExportXlsx = () => {
	const link = `${HOST.value}/api/v1/sell/admin/marketing/emails/export_xlsx/?token=${getToken.value}`;
	window.open(link, "_blank");
};

useHead({
	title: "Emails",
});
</script>

<style scoped lang="scss"></style>
