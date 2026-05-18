<template>
	<div>
		<v-row class="pl-10 pt-5 pr-10">
			<v-col cols="12">
				<v-text-field
					v-model="search"
					label="Search"
					variant="outlined"
					density="compact"
					v-debounce:500ms="debounceSearch"
				></v-text-field>
			</v-col>
		</v-row>
		<v-row class="pl-10 pr-10">
			<v-col
				cols="12"
				sm="6"
				md="4"
				lg="3"
				xl="3"
				v-for="(item, idx) in images"
				:key="'images_' + idx"
			>
				<v-card
					height="240"
					theme="dark"
					class="d-flex flex-column align-center justify-center"
					elevation="0"
					@click="handleSelectImage(item)"
				>
					<v-img
						:src="HOST + item?.file_detail?.url"
						:height="item.height"
						max-height="200"
						:width="item.width"
					></v-img>
					<div class="mt-4 text-body-2 text-surface-bright">
						{{ item.title }}
					</div>
				</v-card>
			</v-col>
			<v-col
				cols="12"
				sm="6"
				md="4"
				lg="3"
				xl="3"
				v-for="(skeleton, sidx) in 20"
				:key="'skeleton_' + sidx"
				v-if="loading"
			>
				<v-skeleton-loader :loading="loading" height="200" type="image">
					<v-responsive> </v-responsive>
				</v-skeleton-loader>
			</v-col>
		</v-row>
		<v-row v-if="totalPage > 1">
			<v-col cols="12">
				<v-pagination
					v-model="currentPage"
					:length="totalPage"
					:total-visible="5"
				></v-pagination>
			</v-col>
		</v-row>
	</div>
</template>

<script setup>
import { useUtilityStore } from "@/stores/utility";
import { calculateTotalPage } from "@/utils/utils";

const emit = defineEmits();

const config = useRuntimeConfig();
const utilityStore = useUtilityStore();

var search = ref("");
var loading = ref(false);
var images = ref([]);

const currentPage = ref(1);
const totalPage = ref(0);
const limit = ref(20);
const offset = ref(0);

const HOST = computed(() => {
	return config.public.HOST;
});

watch(
	() => currentPage.value,
	(val, oldVal) => {
		offset.value = val * limit.value - limit.value;
		handleFetchImages();
	}
);

const resetParams = () => {
	limit.value = 20;
	offset.value = 0;
};

const debounceSearch = () => {
	if (search?.value?.length > 3) {
		resetParams();
		handleFetchImages();
	} else if (search?.value?.length < 1) {
		resetParams();
		handleFetchImages();
	}
};

const handleFetchImages = () => {
	images.value = [];
	loading.value = true;

	const params = {
		limit: limit.value,
		offset: offset.value,
	};

	if (search?.value?.length > 3) {
		params["title"] = search.value;
	}

	utilityStore
		.fetchImages(params)
		.then((d) => {
			totalPage.value = calculateTotalPage(d.count, 20);
			images.value = d.results;
			loading.value = false;
		})
		.catch((e) => {
			console.log(e);
			loading.value = false;
		});
};

const handleSelectImage = (d) => {
	emit("selectedImage", d);
};

onMounted(() => {
	handleFetchImages();
});
</script>

<style scoped lang="scss"></style>
