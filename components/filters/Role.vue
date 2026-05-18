<template>
	<div>
		<v-select
			label="Role"
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
		title: "Super User",
		value: 1,
	},
	{
		title: "Staff",
		value: 2,
	},
	{
		title: "Customer",
		value: 3,
	},
]);
const selectedStatus = ref(null);

const hanldeUpdateData = (val) => {
	if (val) {
		const query = deepCopy(route.query);
		query["role"] = val;
		query["offset"] = 0;
		router.push({ query: query });
	} else {
		const query = deepCopy(route.query);
		delete query["role"];
		router.push({ query: query });
	}
};

watch(
	() => route,
	(val, oldVal) => {
		if (val?.query?.role) {
			if (route?.query?.role == 1) {
				selectedStatus.value = "Super User";
			} else if (route?.query?.role == 2) {
				selectedStatus.value = "Staff";
			} else if (route?.query?.role == 3) {
				selectedStatus.value = "Customer";
			}
		} else {
			selectedStatus.value = null;
		}
	},
	{ deep: true }
);

onMounted(() => {
	if (route?.query?.role) {
		if (route?.query?.role == 1) {
			selectedStatus.value = "Super User";
		} else if (route?.query?.role == 2) {
			selectedStatus.value = "Staff";
		} else if (route?.query?.role == 3) {
			selectedStatus.value = "Customer";
		}
	} else {
		selectedStatus.value = null;
	}
});
</script>

<style scoped lang="scss"></style>
