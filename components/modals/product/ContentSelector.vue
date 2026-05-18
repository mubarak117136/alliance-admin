<template>
	<v-row class="ma-0 d-flex flex-column" align="center" justify="center">
		<v-col cols="1">
			<v-btn
				density="compact"
				icon="mdi-plus-thick"
				title="Add content"
				@click="toggleContentTypeSelectOpen"
				color="cyan-darken-4"
			></v-btn>
		</v-col>
		<v-col cols="3">
			<v-expand-transition>
				<div class="d-flex ga-2" v-if="contentTypeSelectOpen">
					<v-btn
						size="x-large"
						density="compact"
						icon="mdi-text"
						title="Add text"
						color="cyan-darken-4"
						@click="handleContentTypeSelect(0)"
					></v-btn>
					<v-btn
						size="x-large"
						density="compact"
						icon="mdi-image"
						title="Add image"
						color="cyan-darken-4"
						@click="handleContentTypeSelect(1)"
					></v-btn>
					<v-btn
						size="x-large"
						density="compact"
						icon="mdi-video"
						title="Add video"
						color="cyan-darken-4"
						@click="handleContentTypeSelect(2)"
					></v-btn>
					<v-btn
						size="x-large"
						density="compact"
						icon="mdi-table"
						title="Add table"
						color="cyan-darken-4"
						@click="handleContentTypeSelect(3)"
					></v-btn>
				</div>
			</v-expand-transition>
		</v-col>
	</v-row>
</template>

<script setup>
const emit = defineEmits();

const contentTypeSelectOpen = ref(false);

const handleContentTypeSelect = (type) => {
	const params = {
		type: type,
	};
	emit("selectContentType", params);
	contentTypeSelectOpen.value = false;
};

const toggleContentTypeSelectOpen = () => {
	contentTypeSelectOpen.value = !contentTypeSelectOpen.value;
};
</script>

<style scoped lang="scss"></style>
