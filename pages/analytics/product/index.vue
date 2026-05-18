<template>
	<div>
		<v-row class="pa-0 ma-0 pl-0 pr-0 pl-md-5 pr-md-5">
			<v-col cols="12" class="d-flex flex-column ga-5">
				<v-sheet rounded="lg" class="pa-4 d-flex justify-space-between">
					<div>
						<div class="text-surface-bright">Product analytics</div>
					</div>
				</v-sheet>
				<v-sheet rounded="lg" class="pa-4">
					<div class="d-flex ga-4 flex-wrap mb-10">
						<v-sheet
							class="pa-4 mt-4 d-flex ga-4"
							elevation="12"
							rounded="lg"
							width="300"
						>
							<div>
								<v-icon size="50" color="surface-bright">mdi-package</v-icon>
							</div>
							<div>
								<p class="text-body-2 text-surface-bright">Total</p>
								<h3 class="text-surface-bright">{{ item?.total_product }}</h3>
							</div>
						</v-sheet>
						<v-sheet
							class="pa-4 mt-4 d-flex ga-4"
							elevation="12"
							rounded="lg"
							width="300"
						>
							<div>
								<v-icon size="50" color="surface-bright">mdi-check</v-icon>
							</div>
							<div>
								<NuxtLink
									to="/products?status=true"
									class="text-body-2 text-surface-bright text-decoration-none"
									>Published</NuxtLink
								>
								<h3 class="text-surface-bright">
									{{ item?.published_product }}
								</h3>
							</div>
						</v-sheet>
						<v-sheet
							class="pa-4 mt-4 d-flex ga-4"
							elevation="12"
							rounded="lg"
							width="300"
						>
							<div>
								<v-icon size="50" color="surface-bright">mdi-close</v-icon>
							</div>
							<div>
								<NuxtLink
									to="/products?status=false"
									class="text-body-2 text-surface-bright text-decoration-none"
									>Unpublished</NuxtLink
								>
								<h3 class="text-surface-bright">
									{{ item?.unpublished_product }}
								</h3>
							</div>
						</v-sheet>
						<v-sheet
							class="pa-4 mt-4 d-flex ga-4 bg-surface-light"
							elevation="12"
							rounded="lg"
							width="300"
						>
							<div>
								<v-icon size="50" color="surface-bright"
									>mdi-arrow-down-bold</v-icon
								>
							</div>
							<div>
								<a
									href="#lowStockedProducts"
									class="text-body-2 text-surface-bright text-decoration-none"
									>Low stock</a
								>
								<h3 class="text-surface-bright">
									{{ item?.limited_quantity_product }}
								</h3>
							</div>
						</v-sheet>
						<v-sheet
							class="pa-4 mt-4 d-flex ga-4 cursor-pointer"
							elevation="12"
							rounded="lg"
							width="300"
							@click="router.push('/analytics/product/sale-report')"
						>
							<div>
								<v-icon size="50" color="surface-bright">mdi-chart-line</v-icon>
							</div>
							<div>
								<a
									href="#"
									class="text-body-2 text-surface-bright text-decoration-none"
									>Sale Report</a
								>
								<h3 class="text-surface-bright">Monthly</h3>
							</div>
						</v-sheet>
					</div>
				</v-sheet>
				<div class="two-column">
					<v-sheet rounded="lg" class="pa-4">
						<div class="text-surface-bright text-body-1">
							Most viewed products
						</div>
						<div>
							<AnalyticsProductsMostViewed
								:items="item?.top_view_products_data"
								type="view"
							/>
						</div>
					</v-sheet>
					<v-sheet rounded="lg" class="pa-4">
						<div class="text-surface-bright text-body-1">
							Most sold products
						</div>
						<div>
							<AnalyticsProductsMostViewed
								:items="item?.top_sold_products_data"
								type="sell"
							/>
						</div>
					</v-sheet>
					<v-sheet rounded="lg" class="pa-4" id="lowStockedProducts">
						<v-tabs v-model="stockTab">
							<v-tab value="low_stocked">Low Stocked</v-tab>
							<v-tab value="out_of_stock">Out Of Stock</v-tab>
						</v-tabs>
						<v-tabs-window v-model="stockTab">
							<v-tabs-window-item value="low_stocked">
								<AnalyticsProductsLowStocked ref="lowStockedRef" />
							</v-tabs-window-item>
							<v-tabs-window-item value="out_of_stock">
								<AnalyticsProductsOutOfStock ref="outOfStockRef" />
							</v-tabs-window-item>
						</v-tabs-window>
					</v-sheet>
				</div>
			</v-col>
		</v-row>
	</div>
</template>

<script setup>
import { useSaleStore } from "@/stores/sale";
import { useRoute } from "#vue-router";

const saleStore = useSaleStore();
const route = useRoute();
const router = useRouter();

const stockTab = ref(route.query.stock_tab || "low_stocked");
const lowStockedRef = ref(null);
const outOfStockRef = ref(null);
const loading = ref(false);

watch(stockTab, (val) => {
	const query = { ...route.query, stock_tab: val };
	router.push({ query });
});

watch(
	() => route.query.stock_tab,
	(val) => {
		const tab = val || "low_stocked";
		if (stockTab.value !== tab) stockTab.value = tab;
		if (tab === "low_stocked") lowStockedRef.value?.handleFetchAnalyticsItem();
		else if (tab === "out_of_stock") outOfStockRef.value?.handleFetchAnalyticsItem();
	},
);

const item = ref(null);

const handleFetchAnalytics = () => {
	loading.value = true;

	saleStore
		.productAnalytics()
		.then((d) => {
			item.value = d;
			loading.value = false;
		})
		.catch((e) => {
			loading.value = false;
			console.log(e);
		});
};

onMounted(() => {
	handleFetchAnalytics();
	if (!route.query.stock_tab) {
		router.replace({ query: { ...route.query, stock_tab: "low_stocked" } });
	}
});

watch(
	() => route.query,
	(val, oldVal) => {
		handleFetchAnalytics();
	},
	{ deep: true },
);

useHead({
	title: "Product analytics",
});
</script>

<style scoped lang="scss">
.two-column {
	display: grid;
	grid-template-columns: 1fr 1fr;
	gap: 20px;

	@media screen and (max-width: 960px) {
		grid-template-columns: 1fr;
		gap: 10px;
	}
}
</style>
