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
			style="width: 400px; max-height: 400px"
		>
			<v-row class="bg-cyan-darken-4 pa-0 ma-0 pt-3">
				<v-col cols="12">
					<div class="d-flex justify-space-between">
						<div class="text-h6">
							<v-icon class="mr-4">mdi-vector-difference</v-icon>
							Edit campaign
						</div>
						<div class="d-flex align-center justify-space-center">
							<v-icon class="cursor-pointer" @click="close">mdi-close</v-icon>
						</div>
					</div>
				</v-col>
			</v-row>
			<v-row class="ma-0">
				<v-col cols="12">
					<v-form
						@submit.prevent="handleFormSubmit"
						class="d-flex flex-column ga-2 pa-4"
						id="create-modal-form"
					>
						<v-row class="ma-0">
							<v-col cols="12" class="pb-0 ma-0">
								<v-text-field
									class="text-surface-bright"
									label="Discount percent"
									variant="outlined"
									density="compact"
									v-model="discountPercent"
								></v-text-field>
							</v-col>
						</v-row>

						<v-row class="ma-0 ml-4 mt-4 pa-0">
							<v-col cols="12" class="ma-0 pa-0">
								<v-alert
									v-if="error_msg"
									:text="error_msg"
									type="error"
									class="mb-6"
								></v-alert>
								<v-btn :loading="loading" variant="tonal" type="submit">
									Save
								</v-btn>
							</v-col>
						</v-row>
					</v-form>
				</v-col>
			</v-row>
		</v-sheet>
	</v-dialog>
</template>

<script setup>
import { useProductStore } from "@/stores/product";
import { useToast } from "vue-toastification";
import { useRoute } from "#vue-router";

const props = defineProps({
	isOpenModal: false,
	data: null,
});
const emit = defineEmits();

const productStore = useProductStore();
const toast = useToast();
const route = useRoute();

var openModal = ref(false);
const loading = ref(false);
const error_msg = ref("");
const discountPercent = ref(10);

const handleFormSubmit = () => {
	if (!discountPercent) {
		error_msg.value = "Please enter discount percent!";
		return;
	}

	loading.value = true;

	const payload = {
		campaign_through: props?.data?.id,
		discount_percent: discountPercent?.value,
	};

	productStore
		.updateCampaignCategoryThrough(payload)
		.then((d) => {
			loading.value = false;
			close(true);
			toast.success("Succesfully add category to campaign!");
		})
		.catch((e) => {
			loading.value = false;
			console.log(e);
			error_msg.value = "";
			var err_msg = "";
			if (e.response.status === 400) {
				for (const [key, value] of Object.entries(e.response._data)) {
					const err = `${value}`;
					err_msg = err_msg + err;
				}
				error_msg.value = err_msg;
			} else {
				var msg = `Something went wrong!`;
				error_msg.value = msg;
			}
		});
};

const close = (refresh = false) => {
	emit("close", refresh);
};

onMounted(() => {
	openModal.value = props?.isOpenModal;
	discountPercent.value = props?.data?.discount_percent;
});
</script>

<style scoped lang="scss"></style>
