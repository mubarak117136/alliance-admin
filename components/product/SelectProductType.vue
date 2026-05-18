<template>
	<div>
		<v-select
			label="Product type"
			:items="inputTypeChoice"
			variant="outlined"
			density="compact"
			v-model="productType"
			item-title="title"
			item-value="value"
			class="text-surface-bright"
		></v-select>
	</div>
</template>

<script setup>
const props = defineProps({
	modelValue: null,
});

const emit = defineEmits(["update:modelValue"]);

const productType = ref(1);

watch(
	() => productType.value,
	(val, oldVal) => {
		emit("update:modelValue", val);
	}
);

watch(
	() => props.modelValue,
	(val, oldVal) => {
		productType.value = val;
	}
);

onMounted(() => {
	productType.value = props?.modelValue;
});

const inputTypeChoice = [
	{
		title: "Physical Product",
		value: 1,
	},
	{
		title: "Digital Product",
		value: 2,
	},
];
</script>

<style scoped lang="scss"></style>
