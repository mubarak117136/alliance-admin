<template>
	<div>
		<v-row class="pa-0 ma-0 pl-0 pr-0 pl-md-5 pr-md-5">
			<v-col cols="12" class="d-flex flex-column ga-5">
				<v-sheet rounded="lg" class="pa-4 d-flex justify-space-between">
					<div class="d-flex ga-5">
						<div class="cursor-pointer pa-0 ma-0 my-auto" @click="handleBack">
							<v-icon color="info" size="large">mdi-keyboard-backspace </v-icon>
						</div>
						<div class="pa-0 ma-0 my-auto">
							<div class="text-h6 text-surface-bright">
								{{ attribute?.name }}
							</div>
						</div>
					</div>

					<v-btn
						variant="tonal"
						size="small"
						@click="openDeleteConfirmationModal"
					>
						<v-icon color="error" size="x-large">mdi-trash-can</v-icon>
						<v-tooltip activator="parent" location="bottom"
							>Remove Attribute</v-tooltip
						>
					</v-btn>
				</v-sheet>

				<v-sheet rounded="lg" class="pa-4 d-flex ga-0" v-if="attribute">
					<AttributeDetail :data="attribute" />
				</v-sheet>

				<v-sheet rounded="lg" class="pa-4 d-flex justify-space-between">
					<div>
						<div class="text-surface-bright">
							Attribute Values ({{ totalCount }})
						</div>
					</div>
					<v-btn
						variant="tonal"
						size="small"
						@click="createAttributeValueModalOpen = true"
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
								<th class="text-left">Extra Price(৳)</th>
								<th class="text-left">Slug</th>
								<th class="text-left">In filter?</th>
								<th class="text-left">Actions</th>
							</tr>
						</thead>
						<tbody>
							<tr v-for="(item, idx) in items" :key="'item_' + idx">
								<td class="text-surface-bright">{{ item?.value }}</td>
								<td class="text-surface-bright">{{ item?.price_addition }}</td>
								<td class="text-surface-bright">{{ item?.slug }}</td>
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
									<div class="d-flex ga-4">
										<div
											class="cursor-pointer"
											@click="handleUpdateAttributeValueOpen(item)"
										>
											<v-icon color="warning">mdi-pencil </v-icon>
											<v-tooltip activator="parent" location="top"
												>Change</v-tooltip
											>
										</div>
										<div
											class="cursor-pointer"
											@click="handleOpenAttributeValueDelete(item)"
										>
											<v-icon color="error">mdi-trash-can </v-icon>
											<v-tooltip activator="parent" location="top"
												>Remove</v-tooltip
											>
										</div>
									</div>
								</td>
							</tr>
						</tbody>
					</v-table>
					<div v-else class="text-center text-surface-bright">
						Not any attribute value found!
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
		<ModalsCreateAttributeValue
			v-if="createAttributeValueModalOpen"
			:isOpenModal="createAttributeValueModalOpen"
			:attribute="attribute.id"
			@close="handleCreateAttributeValueClose"
		/>
		<ModalsYesNoModal
			v-if="deleteCategoryConfirmModalOpen"
			:isOpenModal="deleteCategoryConfirmModalOpen"
			@close="handleDeleteCategoryConfirmation"
		/>
		<ModalsYesNoModal
			v-if="deleteAttributeValueConfirmationOpen"
			:isOpenModal="deleteAttributeValueConfirmationOpen"
			@close="handleDeleteAttributeValueConfirmation"
		/>
		<AttributeUpdateAttributeValue
			v-if="openAttributeValueEditModal"
			:isOpenModal="openAttributeValueEditModal"
			:data="{
				slug: selectedAttributeValue,
				attribute: attribute?.slug,
				value: selectedAttributeValueName,
				price_addition: selectedAttributeValuePrice,
			}"
			@close="handleCloseUpdateAttributeValueModal"
		/>
		<ModalsCustomLoader v-if="loading" :isOpenModal="loading" />
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
const attribute = ref(null);
var items = ref([]);
const createAttributeValueModalOpen = ref(false);
const deleteCategoryConfirmModalOpen = ref(false);

const currentPage = ref(1);
const totalPage = ref(0);
const limit = ref(12);
const offset = ref(0);
const totalCount = ref(0);

const selectedAttributeValue = ref(null);
const selectedAttributeValueName = ref(null);
const selectedAttributeValuePrice = ref(null);
const deleteAttributeValueConfirmationOpen = ref(false);
const openAttributeValueEditModal = ref(false);

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

const handleCloseUpdateAttributeValueModal = (refresh = false) => {
	openAttributeValueEditModal.value = false;
	if (refresh == true) {
		handleFetchItems();
	}
};

const handleUpdateAttributeValueOpen = (attributeValue) => {
	selectedAttributeValue.value = attributeValue.slug;
	selectedAttributeValueName.value = attributeValue.value;
	selectedAttributeValuePrice.value = attributeValue.price_addition;
	openAttributeValueEditModal.value = true;
};

const handleOpenAttributeValueDelete = (attributeValue) => {
	selectedAttributeValue.value = attributeValue.slug;
	deleteAttributeValueConfirmationOpen.value = true;
};

const handleAttributeValueDelete = () => {
	loading.value = true;
	productStore
		.deleteAttributeValue({
			slug: selectedAttributeValue.value,
			attribute: attribute.value.slug,
		})
		.then((d) => {
			loading.value = false;
			handleFetchItems();
			toast.success("Successfully deleted the attribute value!");
		})
		.catch((e) => {
			loading.value = false;
			console.log(e);
			toast.error("Something went wrong!");
		});
};

const handleDeleteAttributeValueConfirmation = (status) => {
	if (status == true) {
		handleAttributeValueDelete();
	}
	deleteAttributeValueConfirmationOpen.value = false;
};

const handleFetchItems = () => {
	items.value = [];
	loading.value = true;

	if (route?.query?.offset) {
		offset.value = route?.query?.offset;
	}

	const params = {
		limit: limit.value,
		offset: offset.value,
		attribute: route.params.slug,
	};

	if (route?.query?.search?.length > 3) {
		params["search"] = route?.query?.search;
	}

	productStore
		.fetchAttributeValues(params)
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

const handleFetchAttributeDetail = () => {
	loading.value = true;
	productStore
		.fetchAttributeDetail(route?.params?.slug)
		.then((d) => {
			loading.value = false;
			attribute.value = d;
		})
		.catch((e) => {
			loading.value = false;
			console.log(e);
		});
};

const handleCreateAttributeValueClose = (refresh = false) => {
	createAttributeValueModalOpen.value = false;
	if (refresh == true) {
		handleFetchItems();
	}
};

const openDeleteConfirmationModal = () => {
	deleteCategoryConfirmModalOpen.value = true;
};

const handleAttributedDelete = () => {
	loading.value = true;
	productStore
		.deleteAttribute(attribute.value.slug)
		.then((d) => {
			loading.value = false;
			router.push({ name: "products-attribute" });
			toast.success("Successfully deleted the attribute!");
		})
		.catch((e) => {
			loading.value = false;
			console.log(e);
			toast.error("Something went wrong!");
		});
};

const handleDeleteCategoryConfirmation = (status) => {
	if (status == true) {
		handleAttributedDelete();
	}
	deleteCategoryConfirmModalOpen.value = false;
};

const handleBack = () => {
	router.push({ name: "products-attribute" });
};

onMounted(() => {
	handleFetchAttributeDetail();
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
		.updateAttributeValue({
			slug: slug,
			attribute: attribute?.value?.slug,
			data: { in_filter: value },
		})
		.then((d) => {
			handleFetchItems();
			loading.value = false;
			toast.success("Succesfully updated!");
		})
		.catch((e) => {
			loading.value = false;
			console.log(e);
		});
};

useHead({
	title: "Attribute details",
});
</script>

<style scoped lang="scss"></style>
