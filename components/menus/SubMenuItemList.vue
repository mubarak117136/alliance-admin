<template>
	<div>
		<v-sheet rounded="lg" class="pa-4">
			<v-table density="compact" v-if="items?.length > 0">
				<thead>
					<tr class="text-surface-bright">
						<th class="text-left">Title</th>
						<th class="text-left">Link</th>
						<th class="text-left">Sort Order</th>
						<th class="text-left">Actions</th>
					</tr>
				</thead>
				<tbody>
					<tr v-for="(item, idx) in items" :key="'menu_items_' + idx">
						<td class="text-surface-bright">
							{{ item?.title }}
						</td>
						<td class="text-surface-bright">
							{{ item?.link }}
						</td>
						<td class="text-surface-bright">
							{{ item?.sort_order }}
						</td>
						<td class="text-surface-bright">
							<div class="d-flex ga-2">
								<div class="cursor-pointer" @click="handleChangeSubmenu(item)">
									<v-icon color="warning">mdi-pencil </v-icon>
									<v-tooltip activator="parent" location="top"
										>Change</v-tooltip
									>
								</div>
								<div
									class="cursor-pointer"
									@click="openDeleteConfirmationModal(item)"
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
		<ModalsMenuUpdateSubMenuItem
			v-if="submenuChangeModalOpen"
			:isOpenModal="submenuChangeModalOpen"
			:data="selectedItem"
			@close="handleSubmenuChangeModalClose"
		/>
		<ModalsYesNoModal
			v-if="deleteCategoryConfirmModalOpen"
			:isOpenModal="deleteCategoryConfirmModalOpen"
			@close="handleDeleteCategoryConfirmation"
		/>
	</div>
</template>

<script setup>
import { useRoute } from "#vue-router";
import { useUtilityStore } from "@/stores/utility";
import { useToast } from "vue-toastification";

const utilityStore = useUtilityStore();
const route = useRoute();
const toast = useToast();

const props = defineProps({
	refresh: null,
});
const emit = defineEmits();

const loading = ref(false);
const items = ref("");
const selectedItem = ref(null);
const submenuChangeModalOpen = ref(false);
const deleteCategoryConfirmModalOpen = ref(false);

const handleFetchMenuItems = () => {
	loading.value = true;
	utilityStore
		.fetchSubMenus({ menu: route?.params?.menu })
		.then((d) => {
			loading.value = false;
			items.value = d;
		})
		.catch((e) => {
			console.log(e);
			loading.value = false;
		});
};

watch(
	() => props.refresh,
	(val, oldVal) => {
		if (val == true) {
			handleFetchMenuItems();
			emit("changeStatus");
		}
	},
	{ deep: true }
);

onMounted(() => {
	handleFetchMenuItems();
});

const handleChangeSubmenu = (item) => {
	selectedItem.value = item;
	submenuChangeModalOpen.value = true;
};

const handleSubmenuChangeModalClose = (refresh = false) => {
	selectedItem.value = null;
	submenuChangeModalOpen.value = false;
	if (refresh == true) {
		handleFetchMenuItems();
	}
};

const openDeleteConfirmationModal = (item) => {
	selectedItem.value = item;
	deleteCategoryConfirmModalOpen.value = true;
};

const handleSubMenuDelete = () => {
	loading.value = true;

	const payload = {
		id: selectedItem?.value?.id,
		params: { menu: selectedItem?.value?.menu },
	};

	utilityStore
		.deleteSubMenu(payload)
		.then((d) => {
			loading.value = false;
			toast.success("Successfully deleted submenu!");
			handleFetchMenuItems();
		})
		.catch((e) => {
			loading.value = false;
			console.log(e);
			toast.error("Something went wrong!");
		});
};

const handleDeleteCategoryConfirmation = (status) => {
	if (status == true) {
		handleSubMenuDelete();
	}
	deleteCategoryConfirmModalOpen.value = false;
};
</script>

<style scoped lang="scss"></style>
