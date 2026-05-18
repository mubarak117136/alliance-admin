<template>
	<div>
		<v-row>
			<v-col cols="12">
				<v-row v-for="(item, idx) in variants" :key="'variants_' + idx">
					<v-col cols="6" sm="4" lg="3">
						<v-text-field
							v-model="variants[idx].name"
							class="text-surface-bright"
							label="Name"
							variant="outlined"
							density="compact"
							disabled
							hide-details="auto"
						></v-text-field>
					</v-col>
					<v-col cols="6" sm="4" lg="3">
						<v-text-field
							v-model="variants[idx].sku"
							class="text-surface-bright"
							label="SKU"
							variant="outlined"
							density="compact"
							hide-details="auto"
						></v-text-field>
					</v-col>
					<v-col cols="6" sm="4" lg="3">
						<v-text-field
							v-model="variants[idx].quantity"
							class="text-surface-bright"
							label="Quantity"
							variant="outlined"
							density="compact"
							hide-details="auto"
						></v-text-field>
					</v-col>
					<v-col cols="6" sm="4" lg="3">
						<v-text-field
							v-model="variants[idx].min_purchase"
							class="text-surface-bright"
							label="Minimum purchase"
							variant="outlined"
							density="compact"
							hide-details="auto"
						></v-text-field>
					</v-col>
					<v-col cols="6" sm="4" lg="3">
						<v-text-field
							v-model="variants[idx].cost"
							class="text-surface-bright"
							label="Product cost"
							variant="outlined"
							density="compact"
							hide-details="auto"
						></v-text-field>
					</v-col>
					<v-col cols="6" sm="4" lg="3">
						<v-text-field
							v-model="variants[idx].price"
							class="text-surface-bright"
							label="Price"
							variant="outlined"
							density="compact"
							hide-details="auto"
						></v-text-field>
					</v-col>
					<v-col cols="6" sm="4" lg="3">
						<v-btn
							color="info"
							:loading="loading"
							@click="handleVariantSave(item)"
							class="mr-1"
						>
							<v-icon>mdi-check</v-icon>
							<v-tooltip activator="parent" location="bottom">Save</v-tooltip>
						</v-btn>

						<!-- <v-btn
							color="error"
							:loading="loading"
							@click="handleVariantDelete(item, idx)"
						>
							<v-icon>mdi-trash-can</v-icon>
							<v-tooltip activator="parent" location="bottom">Remove</v-tooltip>
						</v-btn> -->
					</v-col>
					<v-divider
						v-if="variants.length != idx + 1"
						class="mt-5 mb-5"
					></v-divider>
				</v-row>
			</v-col>
		</v-row>
	</div>
</template>

<script setup>
import { useProductStore } from "@/stores/product";
import { useToast } from "vue-toastification";
import { useRoute } from "#vue-router";

const route = useRoute();
const toast = useToast();
const productStore = useProductStore();

const variants = ref([]);

const props = defineProps({
	data: null,
});

var loading = ref(false);

const handleVariantSave = (item) => {
	loading.value = true;
	var payload = {
		product: item.product,
		variant: item.id,
		sku: item.sku ? item.sku : "",
		quantity: item.quantity ? item.quantity : 0,
		price: item.price ? item.price : 0,
		min_purchase: item?.min_purchase ? item?.min_purchase : 0,
		cost: item?.cost ? item?.cost : 0,
	};
	productStore
		.updateProductVariant(payload)
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

const handleVariantDelete = (item, idx) => {
	loading.value = true;

	if (variants.value.length < 2) {
		loading.value = false;
		toast.error("Cant delete last variant!");
		return;
	}

	var payload = {
		product: item.product,
		variant: item.id,
	};
	productStore
		.deleteProductVariant(payload)
		.then((d) => {
			loading.value = false;
			toast.success("Variant successfully updated!");
			variants.value.splice(idx, 1);
		})
		.catch((e) => {
			loading.value = false;
			console.log(e);
			toast.error("Something went wrong!");
		});
};

watch(
	() => props.data,
	(val, oldVal) => {
		variants.value = val;
	},
	{ deep: true }
);

onMounted(() => {
	variants.value = props?.data;
});
</script>

<style scoped lang="scss"></style>
