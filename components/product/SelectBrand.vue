<template>
	<div>
		<v-autocomplete
			:custom-filter="customFilter"
			v-model="selectedBrand"
			label="Select brand"
			:items="brands"
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
	() => props.modelValue,
	(val, oldVal) => {
		selectedBrand.value = val;
	},
	{ deep: true }
);

onMounted(() => {
	handleFetchBrand();
});
</script>

<style scoped lang="scss"></style>
