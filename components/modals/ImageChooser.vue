<template>
	<v-dialog
		v-model="openModal"
		scroll-strategy="none"
		width="auto"
		@click:outside="close"
	>
		<v-sheet
			rounded="lg"
			class="pa-0 ma-0"
			:style="{ width: dialogWidth, 'max-height': '90vh' }"
		>
			<v-row class="bg-cyan-darken-4 pa-0 ma-0 pt-3">
				<v-col cols="12">
					<div class="d-flex justify-space-between">
						<div class="text-h6 text-surface-bright">
							<v-icon class="mr-4">mdi-image</v-icon>
							Choose an image
						</div>
						<div>
							<v-icon class="cursor-pointer" @click="close">mdi-close</v-icon>
						</div>
					</div>
				</v-col>
			</v-row>
			<v-row class="pa-0 ma-0 bg-teal-darken-4">
				<v-col cols="12" class="pa-0 ma-0">
					<v-tabs v-model="tab">
						<v-tab value="search" class="text-surface-bright">Search</v-tab>
						<v-tab value="upload" class="text-surface-bright">Upload</v-tab>
					</v-tabs>
				</v-col>
			</v-row>
			<v-row class="ma-0">
				<v-col cols="12">
					<ModalsImageTab
						v-if="tab == 'search'"
						@selectedImage="handleSelectedImage"
					/>
					<ModalsImageUpload
						v-if="tab == 'upload'"
						@selectedImage="handleSelectedImage"
					/>
				</v-col>
			</v-row>
		</v-sheet>
	</v-dialog>
</template>

<script setup>
import { useDisplay } from "vuetify";

const { isOpenModal, fieldName } = defineProps({
	isOpenModal: false,
	fieldName: null,
});
const emit = defineEmits();

const { name } = useDisplay();

var openModal = ref(false);
var tab = ref("search");

const dialogWidth = computed(() => {
	switch (name.value) {
		case "xs":
			return "90vw";
		case "sm":
			return "90vw";
		case "md":
			return "80vw";
		case "lg":
			return "60vw";
		case "xl":
			return "60vw";
		case "xxl":
			return "60vw";
	}

	return undefined;
});

const handleSelectedImage = (d) => {
	close({ fieldName: fieldName, imageData: d });
};

const close = (data = null) => {
	emit("close", data);
};

onMounted(() => {
	openModal.value = isOpenModal;
});
</script>

<style scoped lang="scss"></style>
