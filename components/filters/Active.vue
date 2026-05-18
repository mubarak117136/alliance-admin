<template>
	<div>
		<v-select
			label="Active Status"
			:items="statuses"
			item-title="title"
			item-value="value"
			variant="outlined"
			density="compact"
			@update:modelValue="hanldeUpdateData"
			v-model="selectedStatus"
		></v-select>
	</div>
</template>

<script setup>
import { deepCopy } from "@/utils/utils";
import { useRoute } from "#vue-router";

const route = useRoute();
const router = useRouter();

const statuses = ref([
	{
		title: "Active",
		value: "true",
	},
	{
		title: "Deactive",
		value: "false",
	},
]);
const selectedStatus = ref(null);

const hanldeUpdateData = (val) => {
	if (val) {
		const query = deepCopy(route.query);
		query["is_active"] = val;
		query["offset"] = 0;
		router.push({ query: query });
	} else {
		const query = deepCopy(route.query);
		delete query["is_active"];
		router.push({ query: query });
	}
};

watch(
	() => route,
	(val, oldVal) => {
		if (val?.query?.is_active === "true") {
			selectedStatus.value = "true";
		} else if (val?.query?.is_active === "false") {
			selectedStatus.value = "false";
		} else {
			selectedStatus.value = null;
		}
	},
	{ deep: true }
);

onMounted(() => {
	if (route?.query?.is_active == "true") {
		selectedStatus.value = "true";
	} else if (route?.query?.is_active == "false") {
		selectedStatus.value = "false";
	} else {
		selectedStatus.value = null;
	}
});
</script>

<style scoped lang="scss"></style>
