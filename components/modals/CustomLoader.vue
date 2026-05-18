<template>
	<v-dialog
		v-model="openModal"
		scroll-strategy="none"
		max-width="320"
		persistent
	>
		<v-list class="py-2" color="primary" elevation="12" rounded="lg">
			<v-list-item title="Please wait...">
				<template v-slot:append>
					<v-progress-circular
						color="primary"
						indeterminate="disable-shrink"
						size="16"
						width="2"
					></v-progress-circular>
				</template>
			</v-list-item>
		</v-list>
	</v-dialog>
</template>

<script setup>
const { isOpenModal } = defineProps({
	isOpenModal: false,
});

var openModal = ref(false);

onMounted(() => {
	openModal.value = isOpenModal;
});
</script>

<style scoped lang="scss"></style>
