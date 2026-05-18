<template>
	<div>
		<v-row class="pa-0 ma-0 pl-0 pr-0 pl-md-5 pr-md-5">
			<v-col cols="12">
				<h2 class="text-surface-bright">Order</h2>
				<v-row class="mt-3 d-flex justify-md-space-between ga-4 ma-2">
					<v-col
						cols="12"
						md="5"
						lg="4"
						class="bg-surface d-flex flex-column justify-center"
						style="border-radius: 8px; height: 250px"
					>
						<HomeOrderGraph :data="item?.order_graph_data" />
					</v-col>
					<v-col
						cols="12"
						md="6"
						lg="4"
						class="bg-surface d-flex flex-column justify-center align-center"
						style="border-radius: 8px; height: 250px"
					>
						<AnalyticsOrderPieChart :data="item" />
					</v-col>
					<v-col
						cols="12"
						md="12"
						lg="3"
						class="d-flex flex-column ga-2 pa-0 ma-0 justify-space-between"
						style="height: 250px"
					>
						<v-sheet class="pa-3 d-flex ga-4" elevation="12" rounded="lg">
							<div>
								<v-icon size="50" color="surface-bright">mdi-gavel</v-icon>
							</div>
							<div>
								<NuxtLink
									to="/orders?status=2"
									class="text-body-2 text-surface-bright text-decoration-none"
									>New orders</NuxtLink
								>
								<h3 class="text-surface-bright">{{ item?.new }}</h3>
							</div>
						</v-sheet>
						<v-sheet class="pa-3 d-flex ga-4" elevation="12" rounded="lg">
							<div>
								<v-icon size="50" color="surface-bright"
									>mdi-clock-time-eight-outline</v-icon
								>
							</div>
							<div>
								<p class="text-body-2 text-surface-bright">Last 24hrs</p>
								<h3 class="text-surface-bright">{{ item?.day_before }}</h3>
							</div>
						</v-sheet>
						<v-sheet class="pa-3 d-flex ga-4" elevation="12" rounded="lg">
							<div>
								<v-icon size="50" color="surface-bright"
									>mdi-calendar-range</v-icon
								>
							</div>
							<div>
								<p class="text-body-2 text-surface-bright">Last 30days</p>
								<h3 class="text-surface-bright">{{ item?.month_before }}</h3>
							</div>
						</v-sheet>
					</v-col>
				</v-row>
			</v-col>
			<v-col cols="12" class="mt-4">
				<h2 class="text-surface-bright">Revenue</h2>

				<v-row class="mt-3 d-flex justify-md-space-between ga-4 ma-2">
					<v-col
						cols="12"
						md="5"
						lg="4"
						class="bg-surface d-flex flex-column justify-center"
						style="border-radius: 8px; height: 250px"
					>
						<HomeRevenueGraph :data="item?.revenue_graph_data" />
					</v-col>
					<v-col
						cols="12"
						md="6"
						lg="4"
						class="bg-surface d-flex flex-column justify-center align-center"
						style="border-radius: 8px; height: 250px"
					>
						<AnalyticsRevenuePieChart :data="item" />
					</v-col>
					<v-col
						cols="12"
						md="12"
						lg="3"
						class="d-flex flex-column ga-2 pa-0 ma-0 justify-space-between"
						style="height: 250px"
					>
						<v-sheet class="pa-3 d-flex ga-4" elevation="12" rounded="lg">
							<div>
								<v-icon size="50" color="surface-bright"
									>mdi-currency-usd</v-icon
								>
							</div>
							<div>
								<NuxtLink
									to="/orders?status=2"
									class="text-body-2 text-surface-bright text-decoration-none"
									>Last 24hr</NuxtLink
								>
								<h3 class="text-surface-bright">
									{{ item?.last_day_revenue }}৳
								</h3>
							</div>
						</v-sheet>
						<v-sheet class="pa-3 d-flex ga-4" elevation="12" rounded="lg">
							<div>
								<v-icon size="50" color="surface-bright"
									>mdi-clock-time-eight-outline</v-icon
								>
							</div>
							<div>
								<p class="text-body-2 text-surface-bright">Last 30days</p>
								<h3 class="text-surface-bright">
									{{ item?.last_month_revenue }}৳
								</h3>
							</div>
						</v-sheet>
						<v-sheet class="pa-3 d-flex ga-4" elevation="12" rounded="lg">
							<div>
								<v-icon size="50" color="surface-bright"
									>mdi-calendar-range</v-icon
								>
							</div>
							<div>
								<p class="text-body-2 text-surface-bright">Last 1year</p>
								<h3 class="text-surface-bright">
									{{ item?.last_year_revenue }}৳
								</h3>
							</div>
						</v-sheet>
					</v-col>
				</v-row>
			</v-col>
			<v-col cols="12" class="mt-4">
				<h2 class="text-surface-bright">Others</h2>
				<div class="d-flex ga-4 flex-wrap ma-2">
					<v-sheet
						class="pa-4 mt-4 d-flex ga-4"
						elevation="12"
						rounded="lg"
						width="300"
					>
						<div>
							<v-icon size="50" color="surface-bright">mdi-account-box</v-icon>
						</div>
						<div>
							<NuxtLink
								to="/users"
								class="text-body-2 text-surface-bright text-decoration-none"
								>New users</NuxtLink
							>
							<h3 class="text-surface-bright">{{ item?.new_user }}</h3>
						</div>
					</v-sheet>
					<v-sheet
						class="pa-4 mt-4 d-flex ga-4"
						elevation="12"
						rounded="lg"
						width="300"
					>
						<div>
							<v-icon size="50" color="surface-bright">mdi-headphones</v-icon>
						</div>
						<div>
							<NuxtLink
								to="/contact-us?status=1"
								class="text-body-2 text-surface-bright text-decoration-none"
								>Unseen message</NuxtLink
							>
							<h3 class="text-surface-bright">{{ item?.unseen_msg }}</h3>
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
							<NuxtLink
								to="/analytics/product"
								class="text-body-2 text-surface-bright text-decoration-none"
								>Low stock product</NuxtLink
							>
							<h3 class="text-surface-bright">
								{{ item?.limited_quantity_product }}
							</h3>
						</div>
					</v-sheet>
				</div>
			</v-col>
		</v-row>
	</div>
</template>

<script setup>
import { useSaleStore } from "@/stores/sale";

const dayjs = useDayjs();
const saleStore = useSaleStore();

const item = ref(null);
const loading = ref(false);
const startDate = ref(null);
const endDate = ref(null);

const handleFetchAnalytics = () => {
	loading.value = true;

	const params = {
		start_date: startDate.value.format("YYYY-MM-DD"),
		end_date: endDate.value.format("YYYY-MM-DD"),
	};

	saleStore
		.dashboardAnalytics(params)
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
	startDate.value = dayjs().subtract(30, "day");
	endDate.value = dayjs().add(1, "day");
	handleFetchAnalytics();
});

useHead({
	title: "Dashboard",
});
</script>

<style scoped lang="scss"></style>
