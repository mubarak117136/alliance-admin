<template>
	<div>
		<v-row>
			<v-col cols="12" class="text-surface-bright">
				<ProductEditSelectAttribute v-model="selectedAttribute" />
				<v-col cols="12" class="ml-0 mr-0 pl-0 pr-0">
					<v-select
						label="Input type"
						:items="inputTypeChoice"
						variant="outlined"
						density="compact"
						v-model="input_type"
						item-title="title"
						item-value="value"
						class="text-surface-bright"
					></v-select>
				</v-col>
				<ProductEditSelectAttributeValue
					v-if="selectedAttribute != null && input_type == 1"
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
const input_type = ref(1);

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
	() => input_type.value,
	(val, oldVal) => {
		if (selectedAttribute.value) {
			const prepareAttribute = selectedAttribute.value;
			prepareAttribute["input_type"] = input_type.value;
			prepareAttribute["values"] = [];
			emit("update:modelValue", prepareAttribute);
		} else {
			emit("update:modelValue", {});
		}
	}
);

watch(
	() => selectedAttributeValues.value,
	(val, oldVal) => {
		if (val && val.length > 0) {
			const prepareAttribute = selectedAttribute.value;
			prepareAttribute["input_type"] = input_type.value;
			prepareAttribute["values"] = val;
			emit("update:modelValue", prepareAttribute);
		}
	},
	{ deep: true }
);

watch(
	() => props.modelValue,
	(val, oldVal) => {
		selectedAttribute.value = isObjectEmpty(val) ? null : val;
		selectedAttributeValues.value = val.values;
		input_type.value = val?.input_type;
	},
	{ deep: true }
);

onMounted(() => {
	selectedAttribute.value = isObjectEmpty(props.modelValue)
		? null
		: props.modelValue;
	selectedAttributeValues.value = props.modelValue.values;
	input_type.value = props?.modelValue?.input_type;
});

const inputTypeChoice = [
	{
		title: "Dropdown",
		value: 1,
	},
	{
		title: "Text",
		value: 2,
	},
];
</script>

<style scoped lang="scss"></style>
