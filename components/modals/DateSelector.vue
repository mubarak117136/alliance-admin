<template>
	<v-dialog v-model="openModal" scroll-strategy="none" width="365" persistent>
		<v-sheet rounded="lg" class="pa-0 ma-0" style="">
			<v-row class="bg-cyan-darken-4 pa-0 ma-0 pt-3">
				<v-col cols="12">
					<div class="d-flex justify-space-between">
						<div class="text-h6">
							<v-icon class="mr-4">mdi-clock-time-eight-outline</v-icon>
							Select date
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
						:hide-header="true"
						v-model="selectedDate"
					></v-date-picker>
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
const dayjs = useDayjs();

const props = defineProps({
	isOpenModal: false,
	modelValue: null,
});
const emit = defineEmits(["update:modelValue"], close);

var openModal = ref(false);
const disabledDate = ref(null);
const selectedDate = ref(null);

const close = () => {
	emit("close");
};

const handleSelectedDate = () => {
	var d = selectedDate.value.format("YYYY-MM-DD");
	emit("update:modelValue", dayjs(d));
	close();
};

watch(
	() => props.modelValue,
	(val, oldVal) => {
		selectedDate.value = dayjs(val.toDate());
	},
	{ deep: true }
);

onMounted(() => {
	openModal.value = props.isOpenModal;
	selectedDate.value = dayjs(props.modelValue.toDate());
});
</script>

<style scoped lang="scss"></style>
