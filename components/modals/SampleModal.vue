<template>
	<v-dialog
		v-model="openModal"
		width="auto"
		scroll-strategy="none"
		@click:outside="close"
	>
		<v-sheet rounded="lg" class="pa-0 ma-0" style="width: 60vw; height: 70vh">
			<v-row class="bg-cyan-darken-4 pa-0 ma-0 pt-3">
				<v-col cols="12">
					<div class="d-flex justify-space-between">
						<div class="text-h6">
							<v-icon class="mr-4">mdi-image</v-icon>
							Choose an image
						</div>
						<div>
							<v-icon class="cursor-pointer" @click="close">mdi-close</v-icon>
						</div>
					</div>
				</v-col>
			</v-row>
		</v-sheet>
	</v-dialog>
</template>

<script setup>
const { isOpenModal } = defineProps({
	isOpenModal: false,
});
const emit = defineEmits();

var openModal = ref(false);

const close = () => {
	emit("close");
};

onMounted(() => {
	openModal.value = isOpenModal;
});
</script>

<style scoped lang="scss"></style>
