<template>
	<div>
		<v-text-field
			v-model="search"
			variant="outlined"
			prepend-inner-icon="mdi-magnify"
			density="compact"
			class="text-surface-bright"
			placeholder="Search"
			v-debounce:500ms="debounceSearch"
		></v-text-field>
	</div>
</template>

<script setup>
import { deepCopy } from "@/utils/utils";
import { useRoute } from "#vue-router";

const route = useRoute();
const router = useRouter();

const search = ref("");

const debounceSearch = () => {
	const query = deepCopy(route.query);
	if (search.value.length > 2) {
		query["search"] = search.value;
		query["offset"] = 0;
		router.push({ query: query });
	} else {
		delete query["search"];
		router.push({ query: query });
	}
};

watch(
	() => route,
	(val, oldVal) => {
		search.value = val?.query?.search;
	},
	{ deep: true },
);

onMounted(() => {
	if (route?.query?.search) {
		search.value = route?.query?.search;
	}
});
</script>

<style scoped lang="scss"></style>
