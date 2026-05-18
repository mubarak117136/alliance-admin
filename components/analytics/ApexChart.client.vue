<template>
	<div class="">
		<apexchart height="350" :options="options" :series="series"></apexchart>
	</div>
</template>

<script setup>
const props = defineProps({
	data: null,
});

const options = ref(null);
const series = ref(null);

const getLabels = () => {
	let labels = [];
	props?.data?.map((obj) => {
		labels.push(obj?.date);
	});

	return labels;
};

const getSeries = () => {
	let series = [];
	props?.data?.map((obj) => {
		series.push(obj?.total);
	});

	return [
		{
			name: "Amount",
			data: series,
		},
	];
};

const getChartOptions = () => {
	return {
		chart: {
			height: 350,
			type: "area",
			zoom: {
				autoScaleYaxis: true,
			},
			id: "areachart-1",
			toolbar: { show: false },
		},
		colors: ["#8A56E1"],
		dataLabels: {
			enabled: false,
		},
		stroke: {
			width: 2,
			curve: "smooth",
			dashArray: 0,
		},
		labels: getLabels(),
		xaxis: {
			type: "datetime",
			tickAmount: 11,
			labels: {
				rotate: 0,
				style: {
					colors: "#BDBDC3",
					fontSize: "12px",
					fontFamily: "Inter, sans-serif",
					fontWeight: 400,
					cssClass: "apexcharts-xaxis-label",
				},
				datetimeUTC: true,
			},
			axisBorder: {
				show: true,
				color: "rgba(62, 69, 123, 0.5)",
				height: 0.25,
				width: "100%",
				offsetX: 0,
				offsetY: 0,
			},
			axisTicks: {
				show: false,
			},
		},
		yaxis: {
			labels: {
				style: {
					colors: "#BDBDC3",
					fontSize: "12px",
					fontFamily: "Inter, sans-serif",
					fontWeight: 400,
					cssClass: "apexcharts-xaxis-label",
				},
			},
		},
		grid: {
			borderColor: "rgba(62, 69, 123, 0.5)",
			padding: {
				right: 20,
				left: 20,
			},
			xaxis: {
				lines: {
					show: true,
				},
			},
			yaxis: {
				lines: {
					show: true,
				},
			},
		},
		tooltip: {
			theme: "dark",
			x: {
				show: true,
				format: "dd MMM hh:mm TT",
				formatter: undefined,
			},
		},
	};
};

onMounted(() => {
	series.value = getSeries();
	options.value = getChartOptions();
});

watch(
	() => props.data,
	(val, oldVal) => {
		series.value = getSeries();
		options.value = getChartOptions();
	},
	{ deep: true }
);
</script>

<style scoped lang="scss"></style>
