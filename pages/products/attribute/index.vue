<template>
	<div>
		<v-row class="pa-0 ma-0 pl-0 pr-0 pl-md-5 pr-md-5">
			<v-col cols="12" class="d-flex flex-column ga-5">
				<v-sheet rounded="lg" class="pa-4 d-flex justify-space-between">
					<div>
						<div class="text-surface-bright">Attributes ({{ totalCount }})</div>
					</div>
					<v-btn
						variant="tonal"
						size="small"
						@click="createAttributeModalOpen = true"
					>
						<v-icon color="info" size="x-large">mdi-plus-thick</v-icon>
						<v-tooltip activator="parent" location="bottom"
							>Create Attribute</v-tooltip
						>
					</v-btn>
				</v-sheet>
				<v-sheet rounded="lg" class="pa-4 d-flex justify-space-between">
					<v-row align="center" justify="center">
						<v-col cols="12" md="6" class="mt-2 mb-0 pb-0">
							<FiltersSearch />
						</v-col>
					</v-row>
				</v-sheet>
				<v-sheet rounded="lg" class="pa-4">
					<v-table density="compact" v-if="items.length > 0">
						<thead>
							<tr class="text-surface-bright">
								<th class="text-left">Name</th>
								<th class="text-left">Slug</th>
								<th class="text-left">In Filter?</th>
								<th class="text-left">Actions</th>
							</tr>
						</thead>
						<tbody>
							<tr v-for="(item, idx) in items" :key="'item_' + idx">
								<td class="text-surface-bright">{{ item.name }}</td>
								<td class="text-surface-bright">{{ item.slug }}</td>

								<td class="text-surface-bright">
									<v-switch
										v-model="item.in_filter"
										color="primary"
										@update:model-value="
											handleUpdateInFilter(item.slug, $event)
										"
										hide-details
									></v-switch>
								</td>

								<td class="text-surface-bright">
									<div class="d-flex ga-2">
										<NuxtLink
											:to="{
												name: 'products-attribute-slug',
												params: { slug: item.slug },
											}"
											class="cursor-pointer"
										>
											<v-icon color="warning">mdi-open-in-new </v-icon>
											<v-tooltip activator="parent" location="top"
												>Details</v-tooltip
											>
										</NuxtLink>
									</div>
								</td>
							</tr>
						</tbody>
					</v-table>
					<div v-else class="text-center text-surface-bright">
						Not any attribute found!
					</div>
					<v-row v-if="totalPage > 1" class="mt-5">
						<v-col cols="12">
							<v-pagination
								v-model="currentPage"
								:length="totalPage"
								:total-visible="5"
							></v-pagination>
						</v-col>
					</v-row>
				</v-sheet>
			</v-col>
		</v-row>
		<ModalsCreateAttribute
			v-if="createAttributeModalOpen"
			:isOpenModal="createAttributeModalOpen"
			@close="handleCreateAttributeClose"
		/>
	</div>
</template>

<script setup>
import { useProductStore } from "@/stores/product";
import { useRoute } from "#vue-router";
import { deepCopy, calculateTotalPage } from "@/utils/utils";
import { useToast } from "vue-toastification";

const route = useRoute();
const router = useRouter();
const productStore = useProductStore();
const toast = useToast();

var loading = ref(false);
var items = ref([]);
const createAttributeModalOpen = ref(false);

const currentPage = ref(1);
const totalPage = ref(0);
const limit = ref(12);
const offset = ref(0);
const totalCount = ref(0);

const resetParams = () => {
	limit.value = 12;
	offset.value = 0;
};

watch(
	() => currentPage.value,
	(val, oldVal) => {
		offset.value = val * limit.value - limit.value;
		const query = deepCopy(route.query);
		query["limit"] = limit.value;
		query["offset"] = offset.value;
		router.push({ query: query });
	}
);

watch(
	() => route,
	(val, oldVal) => {
		if (val?.query?.limit == 12 && val?.query?.offset == 0) {
			currentPage.value = 1;
		}
		if (!val?.query?.limit && !val?.query?.offset) {
			currentPage.value = 1;
		}
		handleFetchItems();
	},
	{ deep: true }
);

const handleFetchItems = () => {
	items.value = [];
	loading.value = true;

	if (route?.query?.offset) {
		offset.value = route?.query?.offset;
	}

	const params = {
		limit: limit.value,
		offset: offset.value,
	};

	if (route?.query?.search?.length > 3) {
		params["search"] = route?.query?.search;
	}

	productStore
		.fetchAttributes(params)
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

const handleCreateAttributeClose = (refresh = false) => {
	createAttributeModalOpen.value = false;
	if (refresh == true) {
		handleFetchItems();
	}
};

onMounted(() => {
	if (route?.query?.limit) {
		if (route?.query?.limit != 12) {
			limit.value = 12;
		} else {
			limit.value = route.query.limit;
		}
	}
	if (route?.query?.offset) {
		offset.value = route.query.offset;
		currentPage.value = route.query.offset / limit.value + 1;
	}
	handleFetchItems();
});

const handleUpdateInFilter = (slug, value) => {
	loading.value = true;
	productStore
		.updateAttribute({
			slug: slug,
			data: { in_filter: value },
		})
		.then((d) => {
			toast.success("Successfully updated!");
			handleFetchItems();
			loading.value = false;
		})
		.catch((e) => {
			loading.value = false;
			console.log(e);
		});
};

useHead({
	title: "Attributes",
});
</script>

<style scoped lang="scss"></style>
