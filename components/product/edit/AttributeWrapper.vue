<template>
	<div>
		<v-row>
			<v-col cols="12" class="text-surface-bright">
				<ProductEditSelectAttribute v-model="selectedAttribute" />
				<ProductEditSelectAttributeValue
					v-if="selectedAttribute != null"
					:attribute="selectedAttribute.slug"
					v-model="selectedAttributeValues"
				/>
			</v-col>
		</v-row>
	</div>
</template>

<script setup>
import { isObjectEmpty } from "@/utils/utils";
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

watch(
	() => props.modelValue,
	(val, oldVal) => {
		selectedAttribute.value = isObjectEmpty(val) ? null : val;
		selectedAttributeValues.value = val.values;
	},
	{ deep: true }
);

onMounted(() => {
	selectedAttribute.value = isObjectEmpty(props.modelValue)
		? null
		: props.modelValue;
	selectedAttributeValues.value = props.modelValue.values;
});
</script>

<style scoped lang="scss"></style>
