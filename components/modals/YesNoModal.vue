<template>
	<v-dialog
		v-model="openModal"
		max-width="400"
		scroll-strategy="none"
		persistent
	>
		<v-card>
			<template v-slot:text>
				<div v-if="source == 'copy'">Are you sure want to copy this item?</div>
				<div v-else>This action is not reversible.</div>
			</template>
			<template v-slot:title>
				<div v-if="source != 'copy'">Are you sure?</div></template
			>
			<template v-slot:actions>
				<v-spacer></v-spacer>

				<v-btn @click="close(false)"> No </v-btn>

				<v-btn class="bg-info" @click="close(true)"> Yes </v-btn>
			</template>
		</v-card>
	</v-dialog>
</template>

<script setup>
const { isOpenModal, source } = defineProps({
	isOpenModal: false,
	source: null,
});

const emit = defineEmits();

var openModal = ref(false);

const close = (status) => {
	emit("close", status);
};

onMounted(() => {
	openModal.value = isOpenModal;
});
</script>

<style scoped lang="scss"></style>
