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
							<div class="text-h6 text-surface-bright">
								{{ coupon?.name }} ({{ coupon?.code }})
							</div>
						</div>
					</div>
				</v-sheet>
				<v-sheet rounded="lg" class="pa-4">
					<v-table density="compact" v-if="items.length > 0">
						<thead>
							<tr class="text-surface-bright">
								<th class="text-left">Date</th>
								<th class="text-left">Order</th>
								<th class="text-left">Order Status</th>
								<th class="text-left">User</th>
								<th class="text-left">Discount Amount</th>
							</tr>
						</thead>
						<tbody>
							<tr v-for="(item, idx) in items" :key="'item_' + idx">
								<td class="text-surface-bright">
									{{ dayjs(item?.creation_time).format("DD / MM / YYYY") }}
								</td>
								<td class="text-surface-bright">
									{{ item?.order?.order_id }}
								</td>
								<td class="text-surface-bright">
									{{ orderStatusTypeToText(item?.order?.order_status) }}
								</td>
								<td class="text-surface-bright">{{ item?.user }}</td>
								<td class="text-surface-bright">
									{{ item?.discount_amount }}৳
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
	</div>
</template>

<script setup>
import { useSaleStore } from "@/stores/sale";
import { useRoute } from "#vue-router";
import {
	deepCopy,
	calculateTotalPage,
	orderStatusTypeToText,
} from "@/utils/utils";

const saleStore = useSaleStore();
const route = useRoute();
const router = useRouter();
const dayjs = useDayjs();

const loading = ref(false);
const coupon = ref(null);
const items = ref([]);

const currentPage = ref(1);
const totalPage = ref(0);
const limit = ref(12);
const offset = ref(0);
const totalCount = ref(0);

const handleFetchAnalytics = () => {
	loading.value = true;

	if (route?.query?.offset) {
		offset.value = route?.query?.offset;
	}

	const params = {
		coupon: route?.params?.id,
		limit: limit.value,
		offset: offset.value,
	};

	saleStore
		.appliedCoupon(params)
		.then((d) => {
			totalCount.value = d.count;
			totalPage.value = calculateTotalPage(d.count, 12);
			items.value = d.results;
			loading.value = false;
		})
		.catch((e) => {
			loading.value = false;
			console.log(e);
		});
};

const handleFetchCoupon = () => {
	loading.value = true;

	saleStore
		.couponDetail({ id: route?.params?.id })
		.then((d) => {
			coupon.value = d;
			loading.value = false;
		})
		.catch((e) => {
			loading.value = false;
			console.log(e);
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
	handleFetchCoupon();
	handleFetchAnalytics();
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
		if (val?.query?.limit == 12 && val?.query?.offset == 0) {
			currentPage.value = 1;
		}
		if (!val?.query?.limit && !val?.query?.offset) {
			currentPage.value = 1;
		}
		handleFetchAnalytics();
	},
	{ deep: true }
);

const handleBack = () => {
	router.push({ name: "analytics-coupon" });
};

useHead({
	title: "Coupon analytics",
});
</script>

<style scoped lang="scss"></style>
