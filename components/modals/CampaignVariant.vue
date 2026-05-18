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
							Campaign price
						</div>
						<div>
							<v-icon class="cursor-pointer" @click="close">mdi-close</v-icon>
						</div>
					</div>
				</v-col>
			</v-row>
			<v-row class="ma-0 pa-0">
				<v-col cols="12" class="pl-10 pt-10">
					<v-row v-for="(item, idx) in items" :key="'variants_' + idx">
						<v-col cols="6" sm="4" md="4" lg="4" xl="4" xxl="4">
							<v-text-field
								v-model="items[idx].variant_detail.name"
								class="text-surface-bright"
								label="Name"
								variant="outlined"
								density="compact"
								disabled
							></v-text-field>
						</v-col>
						<v-col cols="4" sm="3" md="3" lg="3" xl="3" xxl="3">
							<v-text-field
								v-model="items[idx].variant_detail.price"
								class="text-surface-bright"
								label="Current price"
								variant="outlined"
								density="compact"
								disabled
							></v-text-field>
						</v-col>
						<v-col cols="4" sm="3" md="3" lg="3" xl="3" xxl="3">
							<v-text-field
								v-model="items[idx].price"
								class="text-surface-bright"
								label="Offer price"
								variant="outlined"
								density="compact"
							></v-text-field>
						</v-col>
						<v-col cols="5" sm="2" md="2" lg="2" xl="2" xxl="2">
							<v-btn
								color="info"
								:loading="loading"
								@click="handleVariantSave(item)"
								class="mr-1"
							>
								<v-icon>mdi-check</v-icon>
								<v-tooltip activator="parent" location="bottom">Save</v-tooltip>
							</v-btn>
						</v-col>
						<v-divider
							v-if="items.length != idx + 1"
							class="pt-5 pb-5 d-lg-none d-xl-none d-xxl-none"
						></v-divider>
					</v-row>
				</v-col>
			</v-row>
		</v-sheet>
	</v-dialog>
</template>

<script setup>
import { useProductStore } from "@/stores/product";
import { useToast } from "vue-toastification";

const config = useRuntimeConfig();
const productStore = useProductStore();
const toast = useToast();

const { isOpenModal, campaign_product } = defineProps({
	isOpenModal: false,
	campaign_product: null,
});
const emit = defineEmits();

var openModal = ref(false);
var loading = ref(false);
var items = ref([]);

const handleVariantSave = (item) => {
	loading.value = true;
	var payload = {
		id: item.id,
		campaign_product: campaign_product,
		data: {
			price: item.price,
		},
	};
	productStore
		.updateCampaignVariantThrough(payload)
		.then((d) => {
			loading.value = false;
			toast.success("Variant successfully updated!");
		})
		.catch((e) => {
			loading.value = false;
			console.log(e);
			toast.error("Something went wrong!");
		});
};

const handleFetchItems = () => {
	items.value = [];
	loading.value = true;

	const params = {
		campaign_product: campaign_product,
	};

	productStore
		.fetchCampaignVariants(params)
		.then((d) => {
			items.value = d.results;
			loading.value = false;
		})
		.catch((e) => {
			console.log(e);
			loading.value = false;
		});
};

const close = () => {
	emit("close");
};

onMounted(() => {
	openModal.value = isOpenModal;
	handleFetchItems();
});
</script>

<style scoped lang="scss"></style>
