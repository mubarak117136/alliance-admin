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
							Choose product
						</div>
						<div>
							<v-icon class="cursor-pointer" @click="close">mdi-close</v-icon>
						</div>
					</div>
				</v-col>
			</v-row>
			<v-row align="center" justify="center" class="pa-0 ma-0">
				<v-col cols="6">
					<v-text-field
						v-model="search"
						variant="outlined"
						prepend-inner-icon="mdi-magnify"
						density="compact"
						class="text-surface-bright"
						placeholder="Search"
						v-debounce:500ms="debounceSearch"
						:loading="loading"
					></v-text-field>
				</v-col>
			</v-row>
			<v-table density="compact" v-if="items.length > 0 && loading == false">
				<thead>
					<tr class="text-surface-bright">
						<th class="text-left"></th>
						<th class="text-left">Name</th>
						<th class="text-left">Category</th>
						<th class="text-left">Is publish?</th>
					</tr>
				</thead>
				<tbody>
					<tr
						v-for="(item, idx) in items"
						:key="'item_' + idx"
						@click="handleRowClick(item)"
						class="cursor-pointer"
					>
						<td class="text-surface-bright" style="width: 80px !important">
							<v-img
								:src="HOST + item?.default_image?.file_detail?.url"
								height="60"
							></v-img>
						</td>
						<td class="text-surface-bright">
							{{ truncateText(item.name, 40) }}
						</td>
						<td class="text-surface-bright">
							{{ item.category_detail.title }}
						</td>
						<td class="text-surface-bright">
							<v-icon color="success" v-if="item.is_published == true"
								>mdi-check-circle</v-icon
							>
							<v-icon color="error" v-else>mdi-close-circle</v-icon>
						</td>
					</tr>
				</tbody>
			</v-table>

			<div
				v-if="items.length < 1 && loading == false"
				class="text-center text-surface-bright"
			>
				Not any product found!
			</div>

			<v-skeleton-loader
				v-if="loading"
				type="table-row@12 "
			></v-skeleton-loader>

			<v-row v-if="totalPage > 1" class="pa-0 ma-0">
				<v-col cols="12">
					<v-pagination
						v-model="currentPage"
						:length="totalPage"
						:total-visible="5"
					></v-pagination>
				</v-col>
			</v-row>
		</v-sheet>
	</v-dialog>
</template>

<script setup>
import { useProductStore } from "@/stores/product";
import { deepCopy, calculateTotalPage, truncateText } from "@/utils/utils";
import { useToast } from "vue-toastification";

const config = useRuntimeConfig();
const productStore = useProductStore();
const toast = useToast();

const { isOpenModal, campaign } = defineProps({
	isOpenModal: false,
	campaign: null,
});
const emit = defineEmits();

var openModal = ref(false);
var loading = ref(false);
var items = ref([]);

const currentPage = ref(1);
const totalPage = ref(0);
const limit = ref(12);
const offset = ref(0);
const totalCount = ref(0);
const search = ref("");

const searchParams = ref({
	limit: limit.value,
	offset: offset.value,
});

const HOST = computed(() => {
	return config.public.HOST;
});

const handleRowClick = (item) => {
	loading.value = true;
	const params = {
		campaign: campaign,
		product: item.id,
	};
	productStore
		.freeShippingCreateCampaignProductThrough(params)
		.then((d) => {
			loading.value = false;
			toast.success("Succussfully added this product!");
		})
		.catch((e) => {
			loading.value = false;
			console.log(e);
			toast.error("Something went wrong!");
		});
};

watch(
	() => searchParams.value,
	(val, oldVal) => {
		handleFetchItems();
	},
	{ deep: true },
);

watch(
	() => currentPage.value,
	(val, oldVal) => {
		offset.value = val * limit.value - limit.value;
		searchParams.value["limit"] = limit.value;
		searchParams.value["offset"] = offset.value;
	},
);

const debounceSearch = () => {
	if (search.value.length > 3) {
		searchParams.value["search_text"] = search?.value;
	} else {
		delete searchParams.value["search_text"];
	}
};

const handleFetchItems = () => {
	items.value = [];
	loading.value = true;

	productStore
		.fetchProducts(searchParams.value)
		.then((d) => {
			totalCount.value = d.count;
			totalPage.value = calculateTotalPage(d.count, 12);
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
