<template>
	<div>
		<v-row class="pa-0 ma-0 pl-0 pr-0 pl-md-5 pr-md-5">
			<v-col cols="12" class="d-flex flex-column ga-5">
				<v-sheet rounded="lg" class="pa-4 d-flex justify-space-between">
					<div>
						<div class="text-surface-bright">Shipping analytics</div>
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
								<v-icon size="50" color="surface-bright">mdi-truck</v-icon>
							</div>
							<div>
								<NuxtLink
									to="/orders?status=2"
									class="text-body-2 text-surface-bright text-decoration-none"
									>Total</NuxtLink
								>
								<h3 class="text-surface-bright">{{ item?.total_count }}</h3>
								<h3 class="text-surface-bright">{{ item?.total_cost }}৳</h3>
							</div>
						</v-sheet>
						<v-sheet
							class="pa-4 mt-4 d-flex ga-4"
							elevation="12"
							rounded="lg"
							width="300"
							v-for="(i, idx) in item?.qs"
							:key="'item_' + idx"
						>
							<div>
								<v-icon size="50" color="surface-bright">mdi-truck</v-icon>
							</div>
							<div>
								<NuxtLink
									to="/orders?status=3"
									class="text-body-2 text-surface-bright text-decoration-none"
									>{{ i?.name }}</NuxtLink
								>
								<h3 class="text-surface-bright">
									{{ i?.total }}
								</h3>
								<h3 class="text-surface-bright">
									{{ i?.cost ? i?.cost : 0 }}৳
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
								<v-icon size="50" color="surface-bright">mdi-truck</v-icon>
							</div>
							<div>
								<NuxtLink
									to="/orders?status=2"
									class="text-body-2 text-surface-bright text-decoration-none"
									>Others</NuxtLink
								>
								<h3 class="text-surface-bright">{{ item?.other_count }}</h3>
								<h3 class="text-surface-bright">{{ item?.other_cost }}৳</h3>
							</div>
						</v-sheet>
					</div>
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

	saleStore
		.shippingAnalytics()
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
});

useHead({
	title: "Shipping analytics",
});
</script>

<style scoped lang="scss"></style>
