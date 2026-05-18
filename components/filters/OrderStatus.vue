<template>
	<div>
		<v-select
			label="Order status"
			:items="orderStatuses"
			item-title="title"
			item-value="value"
			variant="outlined"
			density="compact"
			@update:modelValue="hanldeUpdateData"
			v-model="selectedStatus"
			width="200"
		></v-select>
	</div>
</template>

<script setup>
import { deepCopy } from "@/utils/utils";
import { useRoute } from "#vue-router";

const route = useRoute();
const router = useRouter();

const selectedStatus = ref("");

const orderStatuses = [
	{
		title: "All",
		value: "",
	},
	{
		title: "Pending",
		value: "1",
	},
	{
		title: "Processing",
		value: "2",
	},
	{
		title: "In transit",
		value: "3",
	},
	{
		title: "Delivered",
		value: "4",
	},
	{
		title: "Returned",
		value: "5",
	},
	{
		title: "Cancelled",
		value: "6",
	},
];

const hanldeUpdateData = (val) => {
	if (val) {
		const query = deepCopy(route.query);
		query["status"] = val;
		query["offset"] = 0;
		router.push({ query: query });
	} else {
		const query = deepCopy(route.query);
		delete query["status"];
		router.push({ query: query });
	}
};

watch(
	() => route,
	(val, oldVal) => {
		if (val?.query?.status) {
			selectedStatus.value = val?.query?.status;
		} else {
			selectedStatus.value = "";
		}
	},
	{ deep: true }
);

onMounted(() => {
	if (route?.query?.status) {
		selectedStatus.value = route?.query?.status;
	} else {
		selectedStatus.value = "";
	}
});
</script>

<style scoped lang="scss"></style>
