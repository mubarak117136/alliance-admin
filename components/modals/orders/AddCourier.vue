<template>
	<v-dialog
		v-model="openModal"
		width="auto"
		scroll-strategy="none"
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
							<v-icon class="mr-4">mdi-truck-fast</v-icon>
							Add courier
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
						<v-tab value="manual" class="text-surface-bright">Manual</v-tab>
					</v-tabs>
				</v-col>
			</v-row>
			<v-row class="ma-0">
				<v-col cols="12">
					<ModalsOrdersManual
						:shippingPrice="order?.shipping_price"
						@close="close(true)"
						v-if="tab == 'manual'"
					/>
				</v-col>
			</v-row>
		</v-sheet>
	</v-dialog>
</template>

<script setup>
import { useDisplay } from "vuetify";

const { isOpenModal, order } = defineProps({
	isOpenModal: false,
	order: null,
});
const emit = defineEmits();

const { name } = useDisplay();

var openModal = ref(false);
var tab = ref("manual");

const dialogWidth = computed(() => {
	switch (name.value) {
		case "xs":
			return "90vw";
		case "sm":
			return "90vw";
		case "md":
			return "70vw";
		case "lg":
			return "50vw";
		case "xl":
			return "40vw";
		case "xxl":
			return "40vw";
	}

	return undefined;
});

const close = (refresh = true) => {
	emit("close", refresh);
};

onMounted(() => {
	openModal.value = isOpenModal;
});
</script>

<style scoped lang="scss"></style>
