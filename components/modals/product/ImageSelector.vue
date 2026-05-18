<template>
	<v-row>
		<v-col cols="12">
			<v-btn
				prepend-icon="mdi-image"
				variant="tonal"
				class="text-surface-bright"
				@click="imageChooserOpen = true"
				v-if="!selectedImage"
			>
				Choose an Image
			</v-btn>
			<v-card
				height="180"
				width="140"
				theme="dark"
				elevation="5"
				class="d-flex flex-column align-center justify-center"
				v-if="selectedImage"
			>
				<v-img
					:src="HOST + selectedImage?.file_detail?.url"
					:height="selectedImage?.height"
					max-height="140"
					:width="selectedImage?.width"
				></v-img>
				<v-card-actions>
					<v-btn variant="tonal" size="small" @click="imageChooserOpen = true">
						<v-icon color="surface-bright">mdi-pencil</v-icon>
						<v-tooltip activator="parent" location="bottom">Change</v-tooltip>
					</v-btn>
					<v-btn
						variant="tonal"
						size="small"
						color="error"
						@click="handleRemoveImage"
					>
						<v-icon color="red">mdi-trash-can</v-icon>
						<v-tooltip activator="parent" location="bottom">Remove</v-tooltip>
					</v-btn>
				</v-card-actions>
			</v-card>
		</v-col>
		<ModalsImageChooser
			v-if="imageChooserOpen"
			:isOpenModal="imageChooserOpen"
			@close="handleImageModalClose"
		/>
	</v-row>
</template>

<script setup>
const config = useRuntimeConfig();

const props = defineProps({
	modelValue: null,
});
const emit = defineEmits(["update:modelValue"]);

const imageChooserOpen = ref(false);
const selectedImage = ref(null);

const HOST = computed(() => {
	return config.public.HOST;
});

const handleRemoveImage = () => {
	selectedImage.value = null;
	emit("update:modelValue", null);
};

const handleImageModalClose = (data = null) => {
	imageChooserOpen.value = false;
	selectedImage.value = data.imageData;
	emit("update:modelValue", selectedImage.value);
};

watch(
	() => props.modelValue,
	(val, oldVal) => {
		selectedImage.value = props.modelValue;
	},
	{ deep: true }
);

onMounted(() => {
	selectedImage.value = props.modelValue;
});
</script>

<style scoped lang="scss"></style>
