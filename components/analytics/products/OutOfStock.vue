<template>
	<div>
		<div class="mt-6">
			<div v-if="!loading && items?.length === 0" class="text-center text-surface-bright py-10">
				No results found
			</div>
			<v-table density="compact" v-if="items?.length > 0">
				<thead>
					<tr class="text-surface-bright">
						<th class="text-left"></th>
						<th class="text-left">Name</th>
						<th class="text-left">Variant</th>
						<th class="text-left">Qty.</th>
					</tr>
				</thead>
				<tbody>
					<tr v-for="(item, idx) in items" :key="'item_' + idx">
						<td class="text-surface-bright" style="width: 80px !important">
							<NuxtLink :to="'/products/' + item?.product?.slug">
								<v-img
									:src="HOST + item?.product?.default_image?.file_detail?.url"
									height="60"
								></v-img>
							</NuxtLink>
						</td>
						<td>
							<NuxtLink
								class="text-surface-bright text-decoration-none"
								:to="'/products/' + item?.product?.slug"
								>{{ truncateText(item?.product?.name, 40) }}</NuxtLink
							>
						</td>
						<td class="text-surface-bright">
							{{ item?.name }}
						</td>
						<td class="text-surface-bright">
							{{ item?.quantity }}
						</td>
					</tr>
				</tbody>
			</v-table>
			<v-row v-if="totalPage > 1" class="mt-5">
				<v-col cols="12">
					<v-pagination
						v-model="currentPage"
						:length="totalPage"
						:total-visible="5"
					></v-pagination>
				</v-col>
			</v-row>
		</div>
	</div>
</template>

<script setup>
import { useSaleStore } from "@/stores/sale";
import { calculateTotalPage } from "@/utils/utils";

const router = useRouter();
const config = useRuntimeConfig();
const saleStore = useSaleStore();

const loading = ref(false);
const items = ref([]);

const currentPage = ref(1);
const totalPage = ref(0);
const limit = ref(12);
const offset = ref(0);
const totalCount = ref(0);

const HOST = computed(() => {
	return config.public.HOST;
});

const handleFetchAnalyticsItem = () => {
	loading.value = true;

	const params = {
		limit: limit.value,
		offset: offset.value,
		type: "out_of_stock",
	};

	saleStore
		.lowStockedAnalytics(params)
		.then((d) => {
			console.log(d);
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
	handleFetchAnalyticsItem();
});

watch(
	() => currentPage.value,
	(val, oldVal) => {
		offset.value = val * limit.value - limit.value;
		handleFetchAnalyticsItem();
	},
);

defineExpose({ handleFetchAnalyticsItem });
</script>

<style scoped lang="scss"></style>
