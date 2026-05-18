<template>
	<div>
		<v-autocomplete
			:custom-filter="customFilter"
			v-model="selectedBrand"
			label="Filter brand"
			:items="brands"
			item-title="name"
			variant="outlined"
			density="compact"
			@update:search="handleSearch"
			@update:modelValue="hanldeUpdateData"
			:loading="loading"
			class="text-surface-bright"
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
const brands = ref([]);
const selectedBrand = ref(null);

const handleSearch = (val) => {
	if (val.length > 2) {
		handleFetchBrand(val);
	} else {
		handleFetchBrand();
	}
};

const hanldeUpdateData = (val) => {
	if (val) {
		const query = deepCopy(route.query);
		query["brand"] = val;
		query["offset"] = 0;
		router.push({ query: query });
	} else {
		const query = deepCopy(route.query);
		delete query["brand"];
		router.push({ query: query });
	}
};

const customFilter = (itemTitle, queryText, item) => {
	const searchOnName = item.raw.name.toLowerCase();
	const searchText = queryText.toLowerCase();
	return searchOnName.indexOf(searchText) > -1;
};

const handleFetchBrand = (searchText = null) => {
	loading.value = true;
	var params = {};

	if (searchText) {
		params["name"] = searchText;
	}
	productStore
		.fetchBrands(params)
		.then((d) => {
			brands.value = d.results;
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
		selectedBrand.value = val?.query?.brand;
	},
	{ deep: true }
);

onMounted(() => {
	if (route?.query?.brand) {
		selectedBrand.value = route?.query?.brand;
	}
	handleFetchBrand();
});
</script>

<style scoped lang="scss"></style>
