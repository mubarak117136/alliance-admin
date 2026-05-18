<template>
	<v-col cols="12" class="d-flex flex-column pa-0 ma-0">
		<v-sheet rounded="lg" class="pa-4 d-flex justify-space-between">
			<div>
				<div class="text-surface-bright">Shipping companies</div>
			</div>
			<v-btn variant="tonal" size="small" @click="addCityModalOpen">
				<v-icon color="info" size="x-large">mdi-plus-thick</v-icon>
				<v-tooltip activator="parent" location="bottom">Add company</v-tooltip>
			</v-btn>
		</v-sheet>
		<v-sheet rounded="lg" class="pa-4 mt-5">
			<v-table density="compact" v-if="items.length > 0">
				<thead>
					<tr class="text-surface-bright">
						<th class="text-left">Name</th>
						<th class="text-left">Slug</th>
						<th class="text-left">Actions</th>
					</tr>
				</thead>
				<tbody>
					<tr v-for="(item, idx) in items" :key="'shipping_city_' + idx">
						<td class="text-surface-bright">{{ item?.name }}</td>
						<td class="text-surface-bright">{{ item?.slug }}</td>
						<td class="text-surface-bright">
							<div class="d-flex ga-2">
								<div
									class="cursor-pointer"
									@click="handleOpenEditCityModal(item)"
								>
									<v-icon color="warning">mdi-pencil </v-icon>
									<v-tooltip activator="parent" location="top"
										>Edit company</v-tooltip
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
				Not any company found!
			</div>
		</v-sheet>
		<ModalsShippingAddCompany
			v-if="openAddCityModal"
			:isOpenModal="openAddCityModal"
			@close="handleAddCityModalClose"
		/>
		<ModalsShippingEditCompany
			v-if="openEditCityModal"
			:isOpenModal="openEditCityModal"
			:data="selectedCity"
			@close="handleEditCityModalClose"
		/>
		<ModalsYesNoModal
			v-if="deleteCategoryConfirmModalOpen"
			:isOpenModal="deleteCategoryConfirmModalOpen"
			@close="handleDeleteCategoryConfirmation"
		/>
	</v-col>
</template>

<script setup>
import { useUtilityStore } from "@/stores/utility";
import { useRoute } from "#vue-router";
import { useToast } from "vue-toastification";

const toast = useToast();
const utilityStore = useUtilityStore();
const router = useRouter();
const route = useRoute();

const items = ref([]);
const loading = ref(false);
const openAddCityModal = ref(false);
const openEditCityModal = ref(false);
const deleteCategoryConfirmModalOpen = ref(false);
const selectedCity = ref(null);

const handleFetchCity = () => {
	items.value = [];
	loading.value = true;

	utilityStore
		.fetchShippingCompany()
		.then((d) => {
			items.value = d;
			loading.value = false;
		})
		.catch((e) => {
			console.log(e);
			loading.value = false;
		});
};

const handleCityDelete = () => {
	loading.value = true;

	utilityStore
		.deleteShippingCompany(selectedCity.value.id)
		.then((d) => {
			loading.value = false;
			handleFetchCity();
		})
		.catch((e) => {
			loading.value = false;
			console.log(e);
			var err_msg = "";
			if (e.response.status === 400) {
				for (const [key, value] of Object.entries(e.response._data)) {
					const err = `${value}`;
					err_msg = err_msg + err;
				}
				toast.error(err_msg);
			} else {
				var msg = `Something went wrong!`;
				toast.error(msg);
			}
		});
};

const openDeleteConfirmationModal = (item) => {
	selectedCity.value = item;
	deleteCategoryConfirmModalOpen.value = true;
};

const handleDeleteCategoryConfirmation = (status) => {
	if (status == true) {
		handleCityDelete();
	}
	deleteCategoryConfirmModalOpen.value = false;
	selectedCity.value = null;
};

const handleOpenEditCityModal = (item) => {
	selectedCity.value = item;
	openEditCityModal.value = true;
};

const handleEditCityModalClose = (refresh = false) => {
	selectedCity.value = null;
	openEditCityModal.value = false;
	if (refresh == true) {
		handleFetchCity();
	}
};

const addCityModalOpen = () => {
	openAddCityModal.value = true;
};

const handleAddCityModalClose = (refresh = false) => {
	openAddCityModal.value = false;
	if (refresh == true) {
		handleFetchCity();
	}
};

onMounted(() => {
	handleFetchCity();
});
</script>
