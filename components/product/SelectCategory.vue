<template>
	<div>
		<v-autocomplete
			v-model="selectedCategory"
			label="Select category"
			:items="categories"
			variant="outlined"
			density="compact"
			@update:search="handleSearch"
			@update:modelValue="hanldeUpdateData"
			class="text-surface-bright"
			:loading="loading"
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
const categories = ref([]);
const selectedCategory = ref(null);

const handleSearch = (val) => {
	if (val.length > 2) {
		handleFetchCategory(val);
	} else {
		handleFetchCategory();
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

const handleFetchCategory = (searchText = null) => {
	loading.value = true;
	var params = {};

	if (searchText) {
		params["name"] = searchText;
	}
	productStore
		.fetchCategoryList(params)
		.then((d) => {
			categories.value = d.results;
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
		selectedCategory.value = val;
	},
	{ deep: true }
);

onMounted(() => {
	handleFetchCategory();
});
</script>

<style scoped lang="scss"></style>
