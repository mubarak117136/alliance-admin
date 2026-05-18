<template>
	<div>
		<v-autocomplete
			:custom-filter="customFilter"
			v-model="selectedAttributeValues"
			label="Select attribute value"
			:items="attributeValues"
			item-title="value"
			variant="outlined"
			density="compact"
			@update:search="handleSearch"
			@update:modelValue="hanldeUpdateData"
			:loading="loading"
			class="text-surface-bright"
			chips
			closable-chips
			multiple
			return-object
		>
			<template v-slot:chip="{ props, item }">
				<v-chip
					@click:close="handleChipClose(item)"
					v-bind="props"
					:text="item.raw.value"
				></v-chip>
			</template>

			<template v-slot:item="{ props, item }">
				<v-list-item v-bind="props" :title="item.raw.value"></v-list-item>
			</template>
		</v-autocomplete>
	</div>
</template>

<script setup>
import { useProductStore } from "@/stores/product";

const productStore = useProductStore();

const handleChipClose = (v) => {
	console.log("+++++", v);
};

const props = defineProps({
	modelValue: null,
	attribute: null,
});

const emit = defineEmits(["update:modelValue"]);

var loading = ref(false);
const attributeValues = ref([]);
const selectedAttributeValues = ref([]);

const handleSearch = (val) => {
	if (val.length > 2) {
		handleFetchAttribute(val);
	} else {
		handleFetchAttribute();
	}
};

const hanldeUpdateData = (val) => {
	if (val) {
		emit("update:modelValue", val);
	} else {
		emit("update:modelValue", []);
	}
};

const customFilter = (itemTitle, queryText, item) => {
	const searchOnName = item.raw.value.toLowerCase();
	const searchText = queryText.toLowerCase();
	return searchOnName.indexOf(searchText) > -1;
};

const handleFetchAttribute = (searchText = null) => {
	loading.value = true;
	var params = {};

	if (searchText) {
		params["name"] = searchText;
	}

	params["attribute"] = props?.attribute;
	productStore
		.fetchAttributeValues(params)
		.then((d) => {
			attributeValues.value = d.results;
			loading.value = false;
		})
		.catch((e) => {
			console.log(e);
			loading.value = false;
		});
};

watch(
	() => props.modelValue,
	(val, oldVal) => {
		selectedAttributeValues.value = val;
	},
	{ deep: true }
);

onMounted(() => {
	handleFetchAttribute();
	selectedAttributeValues.value = props.modelValue;
});
</script>

<style scoped lang="scss"></style>
