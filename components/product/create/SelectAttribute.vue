<template>
	<div>
		<v-autocomplete
			:custom-filter="customFilter"
			v-model="selectedAttribute"
			label="Select Attribute"
			:items="attributes"
			item-title="name"
			variant="outlined"
			density="compact"
			@update:search="handleSearch"
			@update:modelValue="hanldeUpdateData"
			:loading="loading"
			class="text-surface-bright"
			return-object
		></v-autocomplete>
	</div>
</template>

<script setup>
import { useProductStore } from "@/stores/product";

const productStore = useProductStore();

const props = defineProps({
	modelValue: null,
});

const emit = defineEmits(["update:modelValue"]);

var loading = ref(false);
const attributes = ref([]);
const selectedAttribute = ref(null);

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
		emit("update:modelValue", null);
	}
};

const customFilter = (itemTitle, queryText, item) => {
	const searchOnName = item.raw.name.toLowerCase();
	const searchText = queryText.toLowerCase();
	return searchOnName.indexOf(searchText) > -1;
};

const handleFetchAttribute = (searchText = null) => {
	loading.value = true;
	var params = {};

	if (searchText) {
		params["name"] = searchText;
	}
	productStore
		.fetchAttributes(params)
		.then((d) => {
			attributes.value = d.results;
			loading.value = false;
		})
		.catch((e) => {
			console.log(e);
			loading.value = false;
		});
};

onMounted(() => {
	handleFetchAttribute();
});
</script>

<style scoped lang="scss"></style>
