<template>
	<div>
		<v-select
			label="Change status"
			:items="statuses"
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
import { useRoute } from "#vue-router";
import { useToast } from "vue-toastification";
import { useSaleStore } from "@/stores/sale";

const route = useRoute();
const router = useRouter();
const saleStore = useSaleStore();
const toast = useToast();

const props = defineProps({
	data: null,
	orderID: null,
});
const emit = defineEmits();

const statuses = ref([
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
]);
const selectedStatus = ref("");
const loading = ref(false);

const hanldeUpdateData = (val) => {
	loading.value = true;
	const payload = {
		order: props?.orderID,
		status: val,
	};

	saleStore
		.changeOrderStatus(payload)
		.then((d) => {
			loading.value = false;
			toast.success("Order status updated!");
			emit("refresh");
		})
		.catch((e) => {
			loading.value = false;
			console.log(e);
			var err_msg = "";
			if (e.response.status === 400) {
				for (const [key, value] of Object.entries(e.response._data)) {
					const err = `${value}`;
					err_msg = err_msg + err;
				}
				toast.error(err_msg);
			} else {
				var msg = `Something went wrong!`;
				toast.error(msg);
			}
		});
};

onMounted(() => {
	if (props?.data) {
		selectedStatus.value = props?.data?.type.toString();
	}
});

watch(
	() => props.data,
	(val, oldVal) => {
		selectedStatus.value = val?.type?.toString();
	},
	{ deep: true }
);
</script>

<style scoped lang="scss"></style>
