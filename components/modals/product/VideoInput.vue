<template>
	<v-row>
		<v-col cols="12">
			<v-text-field
				v-model="inputData"
				class="text-surface-bright"
				label="Youtube video id"
				variant="outlined"
				density="compact"
				@change="updateChangeValue"
			></v-text-field>
		</v-col>
	</v-row>
</template>

<script setup>
const props = defineProps({
	modelValue: null,
});

const emit = defineEmits(["update:modelValue"]);

const inputData = ref("");

const updateChangeValue = (value) => {
	emit("update:modelValue", inputData.value);
};

watch(
	() => props.modelValue,
	(val, oldVal) => {
		inputData.value = props.modelValue;
	},
	{ deep: true }
);

onMounted(() => {
	inputData.value = props.modelValue;
});
</script>

<style scoped lang="scss"></style>
