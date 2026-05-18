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
	labels: ["Processing", "In transit", "Delivered", "Returned", "Cancelled"],
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
	series.value.push(val?.new);
	series.value.push(val?.in_transit);
	series.value.push(val?.delivered);
	series.value.push(val?.returned);
	series.value.push(val?.cancelled);
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
