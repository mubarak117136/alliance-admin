<template>
	<div>
		<v-autocomplete
			v-model="selectedCategory"
			label="Filter category"
			:items="categories"
			item-title="name"
			variant="outlined"
			density="compact"
			@update:search="handleSearch"
			@update:modelValue="hanldeUpdateData"
			class="text-surface-bright"
			:loading="loading"
		></v-autocomplete>
	</div>
</template>

<script setup>
import { useProductStore } from "@/stores/product";
import { deepCopy } from "@/utils/utils";
import { useRoute } from "#vue-router";

const productStore = useProductStore();
const route = useRoute();
const router = useRouter();

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
		const query = deepCopy(route.query);
		query["category"] = val;
		query["offset"] = 0;
		router.push({ query: query });
	} else {
		const query = deepCopy(route.query);
		delete query["category"];
		router.push({ query: query });
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
	() => route,
	(val, oldVal) => {
		selectedCategory.value = val?.query?.category;
	},
	{ deep: true }
);

onMounted(() => {
	if (route?.query?.category) {
		selectedCategory.value = route?.query?.category;
	}
	handleFetchCategory();
});
</script>

<style scoped lang="scss"></style>
