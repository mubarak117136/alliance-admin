<template>
	<div>
		<v-row>
			<v-col cols="12" class="text-surface-bright">
				<ProductCreateSelectAttribute v-model="selectedAttribute" />
				<ProductCreateSelectAttributeValue
					v-if="selectedAttribute"
					:attribute="selectedAttribute"
					v-model="selectedAttributeValues"
				/>
			</v-col>
		</v-row>
	</div>
</template>

<script setup>
const props = defineProps({
	modelValue: null,
});

const emit = defineEmits(["update:modelValue"]);

const selectedAttribute = ref(null);
const selectedAttributeValues = ref([]);

watch(
	() => selectedAttribute.value,
	(val, oldVal) => {
		if (!val) {
			selectedAttributeValues.value = null;
		}
	},
	{ deep: true }
);

watch(
	() => selectedAttributeValues.value,
	(val, oldVal) => {
		if (val && val.length > 0) {
			const prepareAttribute = selectedAttribute.value;
			prepareAttribute["values"] = val;
			emit("update:modelValue", prepareAttribute);
		} else {
			emit("update:modelValue", {});
		}
	},
	{ deep: true }
);

onMounted(() => {});
</script>

<style scoped lang="scss"></style>
