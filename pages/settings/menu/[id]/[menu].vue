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
								{{ menuDetail?.title }}
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
							>Remove Menu</v-tooltip
						>
					</v-btn>
				</v-sheet>

				<v-sheet rounded="lg" class="pa-4 d-flex ga-5" v-if="menuDetail">
					<MenusMenuItemDetail :data="menuDetail" />
				</v-sheet>
				<v-row>
					<v-col cols="12">
						<MenusSubMenuItem :data="menuDetail" />
					</v-col>
				</v-row>
			</v-col>
		</v-row>
		<ModalsYesNoModal
			v-if="deleteCategoryConfirmModalOpen"
			:isOpenModal="deleteCategoryConfirmModalOpen"
			@close="handleDeleteCategoryConfirmation"
		/>
	</div>
</template>

<script setup>
import { useRoute } from "#vue-router";
import { deepCopy, calculateTotalPage } from "@/utils/utils";
import { useToast } from "vue-toastification";
import { useUtilityStore } from "@/stores/utility";

const route = useRoute();
const router = useRouter();
const utilityStore = useUtilityStore();
const toast = useToast();

var loading = ref(false);
var menuDetail = ref(null);
const deleteCategoryConfirmModalOpen = ref(false);

const handleFetchMenuDetail = () => {
	loading.value = true;

	const payload = {
		id: route?.params?.menu,
		params: {
			navigation: route?.params?.id,
		},
	};
	utilityStore
		.fetchMenuDetail(payload)
		.then((d) => {
			menuDetail.value = d;
			loading.value = false;
		})
		.catch((e) => {
			console.log(e);
			loading.value = false;
		});
};

const openDeleteConfirmationModal = () => {
	deleteCategoryConfirmModalOpen.value = true;
};

const handleMenuDelete = () => {
	loading.value = true;

	const payload = {
		id: menuDetail?.value?.id,
		params: { navigation: route?.params?.id },
	};

	utilityStore
		.deleteMenu(payload)
		.then((d) => {
			loading.value = false;
			router.push({
				name: "settings-menu-id",
				params: { id: route?.params?.id },
			});
			toast.success("Successfully deleted the menu!");
		})
		.catch((e) => {
			loading.value = false;
			console.log(e);
			toast.error("Something went wrong!");
		});
};

const handleDeleteCategoryConfirmation = (status) => {
	if (status == true) {
		handleMenuDelete();
	}
	deleteCategoryConfirmModalOpen.value = false;
};

const handleBack = () => {
	router.push({
		name: "settings-menu-id",
		params: { id: menuDetail?.value?.nav },
	});
};

onMounted(() => {
	handleFetchMenuDetail();
});

useHead({
	title: "Menu details",
});
</script>

<style scoped lang="scss"></style>
