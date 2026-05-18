<template>
	<v-dialog v-model="openModal" scroll-strategy="none" width="365" persistent>
		<v-sheet rounded="lg" class="pa-0 ma-0" style="">
			<v-row class="bg-cyan-darken-4 pa-0 ma-0 pt-3">
				<v-col cols="12">
					<div class="d-flex justify-space-between">
						<div class="text-h6">
							<v-icon class="mr-4">mdi-clock-time-eight-outline</v-icon>
							Select date time
						</div>
						<div class="d-flex align-center justify-space-center">
							<v-icon class="cursor-pointer" @click="close">mdi-close</v-icon>
						</div>
					</div>
				</v-col>
			</v-row>
			<v-row class="ma-0">
				<v-col cols="12">
					<v-date-picker
						:min="disabledDate"
						:hide-header="true"
						v-model="selectedDate"
					></v-date-picker>
				</v-col>
			</v-row>
			<v-row align="center" justify="center" class="pa-0 ma-0">
				<v-col cols="5" class="">
					<v-select
						label="Hour"
						:items="hours"
						variant="outlined"
						density="compact"
						v-model="selectedHour"
					></v-select>
				</v-col>
				<v-col cols="5" class="">
					<v-select
						label="Minute"
						:items="minutes"
						variant="outlined"
						density="compact"
						v-model="selectedMinute"
					></v-select>
				</v-col>
			</v-row>
			<v-row class="pa-0 ma-0" align="center" justify="center">
				<v-col cols="3" class="mb-5">
					<v-btn color="surface-bright" @click="handleSelectedDate">OK</v-btn>
				</v-col>
			</v-row>
		</v-sheet>
	</v-dialog>
</template>

<script setup>
import { hours, minutes } from "@/utils/utils";

const dayjs = useDayjs();

const props = defineProps({
	isOpenModal: false,
	modelValue: null,
});
const emit = defineEmits(["update:modelValue"], close);

var openModal = ref(false);
const disabledDate = ref(null);
const selectedDate = ref(null);
const selectedHour = ref("00");
const selectedMinute = ref("00");

const close = () => {
	emit("close");
};

const handleSelectedDate = () => {
	var d = selectedDate.value.format("YYYY-MM-DD");
	var ds = `${d} ${selectedHour.value}:${selectedMinute.value}:00`;
	emit("update:modelValue", dayjs(ds));
	close();
};

watch(
	() => props.modelValue,
	(val, oldVal) => {
		selectedDate.value = dayjs(val.toDate());
		selectedHour.value = val.hour();
		selectedMinute.value = val.minute();
	},
	{ deep: true }
);

onMounted(() => {
	openModal.value = props.isOpenModal;
	const previousDay = dayjs().subtract(1, "day");
	disabledDate.value = previousDay;
	selectedDate.value = dayjs(props.modelValue.toDate());
	selectedHour.value = props.modelValue.hour();
	selectedMinute.value = props.modelValue.minute();
});
</script>

<style scoped lang="scss"></style>
