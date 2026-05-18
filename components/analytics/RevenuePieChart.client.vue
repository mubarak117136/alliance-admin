<template>
	<apexchart
		v-if="series.length > 0"
		type="pie"
		width="380"
		:options="chartOptions"
		:series="series"
	></apexchart>
</template>

<script setup>
const props = defineProps({
	data: null,
});

const series = ref([]);

const chartOptions = {
	chart: {
		width: 380,
		type: "pie",
	},
	labels: ["Revenue", "Shipping", "Coupon", "Profit"],
	responsive: [
		{
			breakpoint: 480,
			options: {
				chart: {
					width: 200,
				},
				legend: {
					position: "bottom",
				},
			},
		},
	],
};

const setSeries = (val) => {
	series.value.push(val?.total_revenue);
	series.value.push(val?.total_shipping_amount);
	series.value.push(val?.total_coupon_amount);
	series.value.push(val?.total_profit);
};

onMounted(() => {
	if (props?.data) {
		setSeries(props?.data);
	}
});

watch(
	() => props.data,
	(val, oldVal) => {
		setSeries(val);
	},
	{ deep: true }
);
</script>

<style scoped lang="scss"></style>
