<template>
	<div>
		<v-autocomplete
			v-model="selectedCompany"
			label="Shipping company"
			:items="shippingCompanies"
			item-title="name"
			item-value="id"
			variant="outlined"
			density="compact"
			:loading="loading"
			@update:modelValue="hanldeUpdateData"
		></v-autocomplete>
	</div>
</template>

<script setup>
import { useUtilityStore } from "@/stores/utility";
import { deepCopy } from "@/utils/utils";
import { useRoute } from "#vue-router";

const utilityStore = useUtilityStore();
const route = useRoute();
const router = useRouter();

const emit = defineEmits(["update:modelValue"]);

var loading = ref(false);
const shippingCompanies = ref([]);
const selectedCompany = ref(null);

const hanldeUpdateData = (val) => {
	if (val) {
		const query = deepCopy(route.query);
		query["company"] = val;
		query["offset"] = 0;
		router.push({ query: query });
	} else {
		const query = deepCopy(route.query);
		delete query["company"];
		router.push({ query: query });
	}
};

const handleFetchShippingCompany = () => {
	loading.value = true;

	utilityStore
		.fetchShippingCompany()
		.then((d) => {
			loading.value = false;
			shippingCompanies.value = d;
		})
		.catch((e) => {
			loading.value = false;
			console.log(e);
		});
};

onMounted(() => {
	if (route?.query?.company) {
		selectedCompany.value = parseInt(route?.query?.company);
	}
	handleFetchShippingCompany();
});
</script>

<style scoped lang="scss"></style>
