<template>
	<div>
		<v-row class="pa-0 ma-0 pl-0 pr-0 pl-md-5 pr-md-5">
			<v-col cols="12" class="d-flex flex-column ga-5">
				<v-sheet rounded="lg" class="pa-4 d-flex justify-space-between">
					<div>
						<div class="text-surface-bright">Business analytics</div>
					</div>
				</v-sheet>
				<v-sheet rounded="lg" class="pa-4">
					<AnalyticsDateSelect class="mb-10" />
					<div class="d-flex ga-4 flex-wrap mb-10">
						<v-sheet
							class="pa-4 mt-4 d-flex ga-4"
							elevation="12"
							rounded="lg"
							width="300"
						>
							<div>
								<v-icon size="50" color="surface-bright"
									>mdi-currency-bdt</v-icon
								>
							</div>
							<div>
								<p class="text-body-2 text-surface-bright">Revenue</p>
								<h3 class="text-surface-bright">{{ item?.total_revenue }}৳</h3>
							</div>
						</v-sheet>
						<v-sheet
							class="pa-4 mt-4 d-flex ga-4"
							elevation="12"
							rounded="lg"
							width="300"
						>
							<div>
								<v-icon size="50" color="surface-bright">mdi-ticket</v-icon>
							</div>
							<div>
								<p class="text-body-2 text-surface-bright">Total coupon</p>
								<h3 class="text-surface-bright">
									{{ item?.total_coupon_amount }}৳
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
								<v-icon size="50" color="surface-bright"
									>mdi-truck-delivery</v-icon
								>
							</div>
							<div>
								<p class="text-body-2 text-surface-bright">Total shipping</p>
								<h3 class="text-surface-bright">
									{{ item?.total_shipping_amount }}৳
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
								<v-icon size="50" color="surface-bright"
									>mdi-currency-bdt</v-icon
								>
							</div>
							<div>
								<p class="text-body-2 text-surface-bright">Profit</p>
								<h3 class="text-surface-bright">{{ item?.total_profit }}৳</h3>
							</div>
						</v-sheet>
					</div>
					<AnalyticsApexChart :data="item?.graph" />
				</v-sheet>
			</v-col>
		</v-row>
	</div>
</template>

<script setup>
import { useSaleStore } from "@/stores/sale";
import { useRoute } from "#vue-router";

const saleStore = useSaleStore();
const route = useRoute();

const loading = ref(false);
const item = ref(null);

const handleFetchBusinessAnalytics = () => {
	loading.value = true;

	const params = {
		start_date: route?.query?.start_date,
		end_date: route?.query?.end_date,
	};
	saleStore
		.businessAnalytics(params)
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
	if (route?.query?.start_date && route?.query?.end_date) {
		handleFetchBusinessAnalytics();
	}
});

watch(
	() => route.query,
	(val, oldVal) => {
		handleFetchBusinessAnalytics();
	},
	{ deep: true }
);

useHead({
	title: "Business analytics",
});
</script>

<style scoped lang="scss"></style>
