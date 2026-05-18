<template>
	<v-row class="pa-10">
		<v-col cols="8">
			<v-form
				@submit.prevent="handleFormSubmit"
				method="post"
				class="d-flex flex-column ga-4"
				id="image-form"
			>
				<v-row>
					<v-col cols="12">
						<v-text-field
							v-model="formData.title"
							label="Title"
							variant="outlined"
							density="compact"
						></v-text-field>
					</v-col>
					<v-col cols="12">
						<v-file-input
							v-model="imageFile"
							accept="image/png, image/jpeg, image/jpg, image/webp"
							label="Image"
							placeholder="Pick an Image"
							prepend-icon="mdi-image"
							density="compact"
							show-size
							@update:modelValue="handleImageSelect"
						></v-file-input>
					</v-col>
					<v-col cols="12">
						<v-alert
							v-if="error_msg"
							:text="error_msg"
							type="error"
							class="mb-6"
						></v-alert>
					</v-col>

					<v-btn
						type="submit"
						:loading="loading"
						variant="tonal"
						class="text-surface-bright"
					>
						Upload
					</v-btn>
				</v-row>
			</v-form>
		</v-col>
		<ModalsCustomLoader v-if="loading" :isOpenModal="loading" />
	</v-row>
</template>

<script setup>
import { useUtilityStore } from "@/stores/utility";

const emit = defineEmits();

const utilityStore = useUtilityStore();

var imageFile = ref(null);
var loading = ref(false);
var error_msg = ref("");

var formData = reactive({
	title: "",
});

const handleImageSelect = () => {
	console.log(imageFile.value);
	if (imageFile.value) {
		var imageName = imageFile.value.name.split(".")[0];
		formData.title = imageName;
		var imageSize = imageFile.value.size;
		const sizeLimit = 6 * 1024 * 1024;
		if (imageSize > sizeLimit) {
			imageFile.value = null;
			formData.title = "";
			error_msg.value = "Image size exceed the max size limit 6 mb";
		}
	} else {
		imageFile.value = null;
		formData.title = "";
	}
};

const handleFormSubmit = () => {
	if (!formData.title) {
		error_msg.value = "Title is required!";
		return false;
	}

	if (!imageFile.value) {
		error_msg.value = "Please select an image!";
		return false;
	}
	loading.value = true;
	let form = new FormData();
	form.append("image", imageFile.value);
	form.append("title", formData.title);
	utilityStore
		.uploadImage(form)
		.then((d) => {
			loading.value = false;
			emit("selectedImage", d);
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
</script>

<style scoped lang="scss"></style>
