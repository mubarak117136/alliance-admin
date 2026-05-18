<template>
	<div>
		<div class="text-body-2 text-surface-bright">Last month</div>
		<v-sparkline
			v-if="values.length > 0"
			:auto-line-width="autoLineWidth"
			:fill="fill"
			:gradient="gradient"
			:gradient-direction="gradientDirection"
			:line-width="width"
			:model-value="values"
			:padding="padding"
			:smooth="radius || false"
			:stroke-linecap="lineCap"
			:type="type"
			auto-draw
		>
			<template v-slot:label="item">
				{{ item?.value }}
			</template>
		</v-sparkline>
	</div>
</template>

<script setup>
const props = defineProps({
	data: null,
});

const gradients = [
	["#222"],
	["#42b3f4"],
	["red", "orange", "yellow"],
	["purple", "violet"],
	["#00c6ff", "#F0F", "#FF0"],
	["#f72047", "#ffd200", "#1feaea"],
];

const width = 2;
const radius = 10;
const padding = 8;
const lineCap = "round";
const gradient = gradients[5];
const values = ref([]);
const gradientDirection = "top";
const fill = false;
const type = "trend";
const autoLineWidth = false;

onMounted(() => {
	setValues(props?.data);
});

const setValues = (graph) => {
	graph?.map((obj) => {
		values.value.push(obj?.total);
	});
};

watch(
	() => props.data,
	(val, oldVal) => {
		setValues(val);
	},
	{ deep: true }
);
</script>

<style lang="scss" scoped>
:deep(text) {
	color: gray !important;
	font-size: 7px !important;
}
</style>
