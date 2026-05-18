<template>
	<div>
		<v-row>
			<v-col cols="12" class="text-surface-bright text-h6">Variants</v-col>
			<v-col cols="12" class="text-surface-bright">
				<v-sheet
					v-for="(item, idx) in attributes"
					:key="'attr_item_' + idx"
					class="bg-surface-light rounded-lg pa-4 mb-4"
				>
					<ProductCreateAttributeWrapper v-model="attributes[idx]" />
					<v-btn size="small" color="error" @click="removeAttribute(idx)">
						<v-icon>mdi-trash-can</v-icon>
						<v-tooltip activator="parent" location="bottom">Remove</v-tooltip>
					</v-btn>
				</v-sheet>
			</v-col>

			<v-col cols="12" class="text-surface-bright">
				<v-btn
					variant="tonal"
					class="text-surface-bright"
					type="button"
					@click="handleAddAttribute"
				>
					Add Attribute
				</v-btn>
			</v-col>
		</v-row>
	</div>
</template>

<script setup>
import { useProductStore } from "@/stores/product";

const productStore = useProductStore();

const props = defineProps({
	modelValue: null,
});

const emit = defineEmits(["update:modelValue"]);

var loading = ref(false);
const attributes = ref([{}]);

watch(
	() => attributes.value,
	(val, oldVal) => {
		emit("update:modelValue", val);
	},
	{ deep: true }
);

const handleAddAttribute = () => {
	attributes.value.push({});
};

const removeAttribute = (index) => {
	attributes.value.splice(index, 1);
};

onMounted(() => {});
</script>

<style scoped lang="scss"></style>
