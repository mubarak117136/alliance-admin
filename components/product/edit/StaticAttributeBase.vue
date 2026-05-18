<template>
	<div>
		<v-row>
			<v-col cols="12" class="text-surface-bright text-h6">Attributes</v-col>
			<v-col cols="12" class="text-surface-bright">
				<v-sheet
					v-for="(item, idx) in attributes"
					:key="'attr_item_' + idx"
					class="bg-surface-light rounded-lg pa-4 mb-4"
				>
					<ProductEditStaticAttributeWrapper v-model="attributes[idx]" />
					<v-btn size="small" color="error" @click="removeAttribute(idx)">
						<v-icon>mdi-trash-can</v-icon>
						<v-tooltip activator="parent" location="bottom">Remove</v-tooltip>
					</v-btn>
				</v-sheet>
			</v-col>
			<v-col cols="12" class="text-surface-bright">
				<v-btn
					variant="tonal"
					class="text-surface-bright mr-2"
					type="button"
					@click="handleAddAttribute"
				>
					<v-icon color="info" size="x-large">mdi-plus-thick</v-icon>
					<v-tooltip activator="parent" location="bottom"
						>Add new attribute</v-tooltip
					>
				</v-btn>
				<v-btn
					variant="tonal"
					class="text-surface-bright"
					type="button"
					@click="handleUpdateAttribute"
					:loading="loading"
				>
					<v-icon color="info" size="x-large">mdi-check</v-icon>
					<v-tooltip activator="parent" location="bottom"
						>Save attribute</v-tooltip
					>
				</v-btn>
			</v-col>
		</v-row>
		<ModalsCustomLoader v-if="loading" :isOpenModal="loading" />
	</div>
</template>

<script setup>
import { useProductStore } from "@/stores/product";
import { useToast } from "vue-toastification";

const productStore = useProductStore();
const toast = useToast();

const props = defineProps({
	data: null,
	product: null,
});

const emit = defineEmits();

const attributes = ref([]);
const loading = ref(false);

const removeAttribute = (index) => {
	attributes.value.splice(index, 1);
};

const handleAddAttribute = () => {
	attributes.value.push({});
};

const handleUpdateAttribute = () => {
	loading.value = true;
	const prepareAttribute = [];
	if (attributes.value.length > 0) {
		for (var i = 0; i < attributes.value.length; i++) {
			const createAttObj = {
				id: attributes.value[i].id,
				input_type: attributes.value[i].input_type,
				values: attributes.value[i].values.map((obj) => obj.id),
			};
			prepareAttribute.push(createAttObj);
		}
	}
	const payload = {
		product: props.product,
		attributes: prepareAttribute,
	};
	productStore
		.updateProductStaticAttribute(payload)
		.then((d) => {
			loading.value = false;
			toast.success("Product attribute updated successfully!");
			emit("refreshData");
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
		attributes.value = val;
		console.log(val);
	},
	{ deep: true }
);

onMounted(() => {
	attributes.value = props.data;
});
</script>

<style scoped lang="scss"></style>
