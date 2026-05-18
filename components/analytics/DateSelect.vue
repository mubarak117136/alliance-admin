<template>
	<div>
		<v-btn
			@click="startDateModalOpen = true"
			variant="tonal"
			class="mt-0 text-surface-bright"
			type="button"
		>
			{{ dayjs(startDate).format("DD / MM / YYYY") }}
		</v-btn>
		<v-icon class="ml-2 mr-2" color="surface-bright"
			>mdi-arrow-left-right</v-icon
		>
		<v-btn
			@click="endDateModalOpen = true"
			variant="tonal"
			class="mt-0 text-surface-bright"
			type="button"
		>
			{{ dayjs(endDate).format("DD / MM / YYYY") }}
		</v-btn>

		<ModalsDateSelector
			v-if="startDateModalOpen"
			:isOpenModal="startDateModalOpen"
			v-model="startDate"
			@close="handleCloseStartDateModal"
		/>
		<ModalsDateSelector
			v-if="endDateModalOpen"
			:isOpenModal="endDateModalOpen"
			v-model="endDate"
			@close="handleCloseEndDateModal"
		/>
	</div>
</template>

<script setup>
import { deepCopy } from "@/utils/utils";
import { useRoute } from "#vue-router";

const dayjs = useDayjs();
const router = useRouter();
const route = useRoute();

const startDateModalOpen = ref(false);
const endDateModalOpen = ref(false);
const startDate = ref(null);
const endDate = ref(null);

onMounted(() => {
	if (route?.query?.start_date) {
		startDate.value = dayjs(route?.query?.start_date);
	} else {
		startDate.value = dayjs().subtract(30, "day");
	}

	if (route?.query?.end_date) {
		endDate.value = dayjs(route?.query?.end_date);
	} else {
		endDate.value = dayjs().add(1, "day");
	}
});

const handleCloseStartDateModal = () => {
	startDateModalOpen.value = false;
};

const handleCloseEndDateModal = () => {
	endDateModalOpen.value = false;
};

watch(
	() => startDate.value,
	(val, oldVal) => {
		let query = deepCopy(route?.query);
		query["start_date"] = dayjs(val).format("YYYY-MM-DD");
		router.push({ query: query });
	},
	{ deep: true }
);

watch(
	() => endDate.value,
	(val, oldVal) => {
		let query = deepCopy(route?.query);
		query["start_date"] = dayjs(startDate.value).format("YYYY-MM-DD");
		query["end_date"] = dayjs(val).format("YYYY-MM-DD");
		router.push({ query: query });
	},
	{ deep: true }
);
</script>

<style scoped lang="scss"></style>
