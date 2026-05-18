<template>
	<div>
		<v-sheet rounded="lg" class="pa-4">
			<v-table density="compact" v-if="categories?.length > 0">
				<thead>
					<tr class="text-surface-bright">
						<th class="text-left">Name</th>
						<th class="text-left">Slug</th>
						<th class="text-left">Discount (%)</th>
						<th class="text-left">Is Active?</th>
						<th class="text-left">Actions</th>
					</tr>
				</thead>
				<tbody>
					<tr v-for="(item, idx) in categories" :key="'categories_' + idx">
						<td class="text-surface-bright">
							{{ item?.category_detail?.title }}
						</td>
						<td class="text-surface-bright">
							{{ item?.category_detail?.slug }}
						</td>
						<td class="text-surface-bright">
							{{ item?.discount_percent }}
						</td>
						<td class="text-surface-bright">
							<v-icon
								color="success"
								v-if="item?.category_detail?.is_active == true"
								>mdi-check-circle</v-icon
							>
							<v-icon color="error" v-else>mdi-close-circle</v-icon>
						</td>
						<td class="text-surface-bright">
							<div class="d-flex ga-2">
								<div class="cursor-pointer" @click="handleOpenEditModal(item)">
									<v-icon color="warning">mdi-pencil </v-icon>
									<v-tooltip activator="parent" location="top">Edit</v-tooltip>
								</div>
								<div
									class="cursor-pointer"
									@click="handleOpenDeleteModal(item)"
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
				Not any item found!
			</div>
		</v-sheet>
		<ModalsEditCampaignCategory
			v-if="editCampaignModalOpen"
			:data="selectedItem"
			:isOpenModal="editCampaignModalOpen"
			@close="handleCloseEditModal"
		/>
		<ModalsYesNoModal
			v-if="deleteCategoryConfirmModalOpen"
			:isOpenModal="deleteCategoryConfirmModalOpen"
			@close="handleDeleteCategoryConfirmation"
		/>
	</div>
</template>

<script setup>
import { useProductStore } from "@/stores/product";
import { useToast } from "vue-toastification";
import { useRoute } from "#vue-router";

const productStore = useProductStore();
const toast = useToast();
const router = useRouter();
const route = useRoute();

const props = defineProps({
	refresh: null,
	campaign: null,
});
const emit = defineEmits();

const loading = ref(false);
const error_msg = ref("");
const categories = ref("");
const selectedItem = ref(null);
const editCampaignModalOpen = ref(false);
const deleteCategoryConfirmModalOpen = ref(false);

const handleFetchCategories = () => {
	loading.value = true;
	productStore
		.fetchCampaignCategories({ slug: route?.params?.slug })
		.then((d) => {
			loading.value = false;
			categories.value = d;
		})
		.catch((e) => {
			console.log(e);
			loading.value = false;
		});
};

const handleOpenEditModal = (item) => {
	selectedItem.value = item;
	editCampaignModalOpen.value = true;
};

const handleCloseEditModal = (refresh = false) => {
	editCampaignModalOpen.value = false;
	if (refresh == true) {
		handleFetchCategories();
	}
};

const handleCategoryThroughDelete = () => {
	loading.value = true;

	const payload = {
		campaign_through: selectedItem.value.id,
	};
	productStore
		.deleteCampaignCategoryThrough(payload)
		.then((d) => {
			loading.value = false;
			toast.success("Successfully deleted the attribute!");
			handleFetchCategories();
		})
		.catch((e) => {
			loading.value = false;
			console.log(e);
			toast.error("Something went wrong!");
		});
};

const handleDeleteCategoryConfirmation = (status) => {
	if (status == true) {
		handleCategoryThroughDelete();
	}
	deleteCategoryConfirmModalOpen.value = false;
};

const handleOpenDeleteModal = (item) => {
	selectedItem.value = item;
	deleteCategoryConfirmModalOpen.value = true;
};

watch(
	() => props.refresh,
	(val, oldVal) => {
		if (val == true) {
			handleFetchCategories();
			emit("changeStatus");
		}
	},
	{ deep: true },
);

onMounted(() => {
	handleFetchCategories();
});
</script>

<style scoped lang="scss"></style>
