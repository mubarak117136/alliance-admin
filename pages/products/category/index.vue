<template>
	<div>
		<v-row class="pa-0 ma-0 pl-0 pr-0 pl-md-5 pr-md-5">
			<v-col cols="12" class="d-flex flex-column ga-5">
				<v-sheet
					rounded="lg"
					class="pa-4 d-flex justify-space-between ga-5"
					v-if="selectedCategory"
				>
					<div class="d-flex ga-5">
						<div class="cursor-pointer pa-0 ma-0 my-auto" @click="handleBack">
							<v-icon color="info" size="large">mdi-keyboard-backspace </v-icon>
						</div>
						<div class="pa-0 ma-0 my-auto">
							<div class="text-h6 text-surface-bright">
								{{ selectedCategory.name }}
							</div>
						</div>
					</div>
					<div
						class="pa-0 ma-0 cursor-pointer"
						@click="openDeleteConfirmationModal"
					>
						<v-icon color="error" size="large">mdi-trash-can</v-icon>
						<v-tooltip activator="parent" location="bottom"
							>Remove Category</v-tooltip
						>
					</div>
				</v-sheet>

				<v-sheet rounded="lg" class="pa-4 d-flex ga-5" v-if="selectedCategory">
					<CategoryDetail :data="selectedCategory" />
				</v-sheet>
				<v-sheet rounded="lg" class="pa-4 d-flex justify-space-between">
					<div>
						<div class="text-surface-bright">
							Categories ({{ renderedCategories?.length }})
						</div>
					</div>
					<v-btn
						variant="tonal"
						size="small"
						@click="createCategoryModalOpen = true"
					>
						<v-icon color="info" size="x-large">mdi-plus-thick</v-icon>
						<v-tooltip activator="parent" location="bottom"
							>Create Category</v-tooltip
						>
					</v-btn>
				</v-sheet>
				<v-sheet rounded="lg" class="pa-4">
					<v-table density="compact" v-if="renderedCategories?.length > 0">
						<thead>
							<tr class="text-surface-bright">
								<th class="text-left">Name</th>
								<th class="text-left">Slug</th>
								<th class="text-left">Is Active?</th>
								<th class="text-left">Serial No</th>
								<th class="text-left">Actions</th>
							</tr>
						</thead>
						<tbody>
							<tr
								v-for="(item, idx) in renderedCategories"
								:key="'categories_' + idx"
							>
								<td class="text-surface-bright">{{ item.name }}</td>
								<td class="text-surface-bright">{{ item.slug }}</td>
								<td class="text-surface-bright">
									<v-icon color="success" v-if="item.is_active == true"
										>mdi-check-circle</v-icon
									>
									<v-icon color="error" v-else>mdi-close-circle</v-icon>
								</td>
								<td class="text-surface-bright">{{ item.order_no }}</td>
								<td class="text-surface-bright">
									<div class="d-flex ga-2">
										<div class="cursor-pointer" @click="handleDetail(item)">
											<v-icon color="warning">mdi-open-in-new </v-icon>
											<v-tooltip activator="parent" location="top"
												>Details</v-tooltip
											>
										</div>
									</div>
								</td>
							</tr>
						</tbody>
					</v-table>
					<div v-else class="text-center text-surface-bright">
						Not any categories found!
					</div>
				</v-sheet>
			</v-col>
		</v-row>
		<ModalsYesNoModal
			v-if="deleteCategoryConfirmModalOpen"
			:isOpenModal="deleteCategoryConfirmModalOpen"
			@close="handleDeleteCategoryConfirmation"
		/>
		<ModalsCustomLoader v-if="loading" :isOpenModal="loading" />
		<ModalsCreateCategory
			v-if="createCategoryModalOpen"
			:isOpenModal="createCategoryModalOpen"
			:selectedCategory="selectedCategory"
			@close="handleCreateCategoryClose"
		/>
	</div>
</template>

<script setup>
import { useProductStore } from "@/stores/product";
import { useRoute } from "#vue-router";
import { deepCopy, findNestedObj } from "@/utils/utils";
import { useToast } from "vue-toastification";

const route = useRoute();
const router = useRouter();
const productStore = useProductStore();
const toast = useToast();

const { getCategories } = storeToRefs(productStore);

const selectedCategory = ref(null);
const renderedCategories = ref([]);
const deleteCategoryConfirmModalOpen = ref(false);
const createCategoryModalOpen = ref(false);
const loading = ref(false);

watch(
	() => getCategories.value,
	(val, oldVal) => {
		if (route.query.selectedCategory) {
			selectedCategory.value = findNestedObj(
				val,
				"slug",
				route.query.selectedCategory
			);
			renderedCategories.value = selectedCategory.value.children;
		} else {
			selectedCategory.value = null;
			renderedCategories.value = val;
		}
	}
);

watch(
	() => route,
	(val, oldVal) => {
		if (!val?.query?.selectedCategory) {
			selectedCategory.value = null;
			renderedCategories.value = getCategories.value;
		}
	},
	{ deep: true }
);

const handleDetail = (item) => {
	selectedCategory.value = item;
	renderedCategories.value = selectedCategory.value.children;
	var query = deepCopy(route.query);
	query["selectedCategory"] = item.slug;
	router.push({ query: query });
};

const handleBack = () => {
	var query = deepCopy(route.query);
	if (selectedCategory.value.parent) {
		const parentObj = findNestedObj(
			getCategories.value,
			"slug",
			selectedCategory.value.parent_slug
		);
		selectedCategory.value = parentObj;
		renderedCategories.value = parentObj.children;
		query["selectedCategory"] = parentObj.slug;
		router.push({ query: query });
	} else {
		selectedCategory.value = null;
		renderedCategories.value = getCategories.value;
		router.push({ query: {} });
	}
};

const handleFetchCategories = () => {
	productStore.fetchCategories().catch((e) => {
		console.log(e);
	});
};

const openDeleteConfirmationModal = () => {
	deleteCategoryConfirmModalOpen.value = true;
};

const handleCreateCategoryClose = () => {
	createCategoryModalOpen.value = false;
};

const handleCategoryDelete = () => {
	loading.value = true;
	productStore
		.deleteCategory(selectedCategory.value.id)
		.then((d) => {
			loading.value = false;
			handleBack();
			toast.success("Successfully deleted the category!");
		})
		.catch((e) => {
			loading.value = false;
			console.log(e);
			toast.error("Something went wrong!");
		});
};

const handleDeleteCategoryConfirmation = (status) => {
	if (status == true) {
		handleCategoryDelete();
	}
	deleteCategoryConfirmModalOpen.value = false;
};

onMounted(() => {
	handleFetchCategories();
});

useHead({
	title: "Categories",
});
</script>

<style scoped lang="scss"></style>
