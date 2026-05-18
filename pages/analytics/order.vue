<template>
	<div>
		<v-row class="pa-0 ma-0 pl-0 pr-0 pl-md-5 pr-md-5">
			<v-col cols="12" class="d-flex flex-column ga-5">
				<v-sheet rounded="lg" class="pa-4 d-flex justify-space-between">
					<div>
						<div class="text-surface-bright">Order analytics</div>
					</div>
				</v-sheet>
				<v-sheet rounded="lg" class="pa-4">
					<AnalyticsDateSelect class="mb-10" />
					<div class="d-flex ga-4 flex-wrap mb-10">
						<v-sheet
							class="pa-4 mt-4 d-flex ga-4 bg-surface-light"
							elevation="12"
							rounded="lg"
							width="300"
						>
							<div>
								<v-icon size="50" color="surface-bright">mdi-gavel</v-icon>
							</div>
							<div>
								<NuxtLink
									to="/orders?status=2"
									class="text-body-2 text-surface-bright text-decoration-none"
									>New</NuxtLink
								>
								<h3 class="text-surface-bright">{{ item?.new_order }}</h3>
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
									>mdi-truck-delivery</v-icon
								>
							</div>
							<div>
								<NuxtLink
									to="/orders?status=3"
									class="text-body-2 text-surface-bright text-decoration-none"
									>In transit</NuxtLink
								>
								<h3 class="text-surface-bright">
									{{ item?.new_in_transit_order }}
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
								<v-icon size="50" color="surface-bright">mdi-gavel</v-icon>
							</div>
							<div>
								<p class="text-body-2 text-surface-bright">Total</p>
								<h3 class="text-surface-bright">{{ item?.total_order }}</h3>
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
									>mdi-clock-time-eight-outline</v-icon
								>
							</div>
							<div>
								<p class="text-body-2 text-surface-bright">Pending</p>
								<h3 class="text-surface-bright">
									{{ item?.total_pending }}
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
								<v-icon size="50" color="surface-bright">mdi-check</v-icon>
							</div>
							<div>
								<p class="text-body-2 text-surface-bright">Delivered</p>
								<h3 class="text-surface-bright">
									{{ item?.total_delivered }}
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
									>mdi-keyboard-return</v-icon
								>
							</div>
							<div>
								<p class="text-body-2 text-surface-bright">Returned</p>
								<h3 class="text-surface-bright">
									{{ item?.total_returned }}
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
								<p class="text-body-2 text-surface-bright">Cancelled</p>
								<h3 class="text-surface-bright">
									{{ item?.total_cancelled }}
								</h3>
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

const handleFetchAnalytics = () => {
	loading.value = true;

	const params = {
		start_date: route?.query?.start_date,
		end_date: route?.query?.end_date,
	};
	saleStore
		.orderAnalytics(params)
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
		handleFetchAnalytics();
	}
});

watch(
	() => route.query,
	(val, oldVal) => {
		handleFetchAnalytics();
	},
	{ deep: true }
);

useHead({
	title: "Order analytics",
});
</script>

<style scoped lang="scss"></style>
