<template>
	<div>
		<v-row class="pa-0 ma-0 pl-0 pr-0 pl-md-5 pr-md-5">
			<v-col cols="12" class="d-flex flex-column ga-5">
				<v-sheet rounded="lg" class="pa-4 d-flex justify-space-between">
					<div>
						<div class="text-surface-bright">Menu</div>
					</div>
					<v-btn
						variant="tonal"
						size="small"
						@click="createCampaignModalOpen = true"
					>
						<v-icon color="info" size="x-large">mdi-plus-thick</v-icon>
						<v-tooltip activator="parent" location="bottom"
							>Create Navigation</v-tooltip
						>
					</v-btn>
				</v-sheet>
				<v-sheet rounded="lg" class="pa-4">
					<v-table density="compact" v-if="navs.length > 0">
						<thead>
							<tr class="text-surface-bright">
								<th class="text-left">Name</th>
								<th class="text-left">Type</th>
								<th class="text-left">Actions</th>
							</tr>
						</thead>
						<tbody>
							<tr v-for="(item, idx) in navs" :key="'navigations_' + idx">
								<td class="text-surface-bright">{{ item?.name }}</td>
								<td class="text-surface-bright">
									{{ navigationScopeTypeToText(item?.type) }}
								</td>
								<td class="text-surface-bright">
									<div class="d-flex ga-2">
										<NuxtLink
											:to="{
												name: 'settings-menu-id',
												params: { id: item?.id },
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
						Not any menu found!
					</div>
				</v-sheet>
			</v-col>
		</v-row>
		<ModalsMenuCreateNavigation
			v-if="createCampaignModalOpen"
			:isOpenModal="createCampaignModalOpen"
			@close="handleCreateCampaignClose"
		/>
	</div>
</template>

<script setup>
import { navigationScopeTypeToText } from "@/utils/utils";
import { useUtilityStore } from "@/stores/utility";

const utilityStore = useUtilityStore();

var loading = ref(false);
var navs = ref([]);
const createCampaignModalOpen = ref(false);

const handleFetchNavs = () => {
	navs.value = [];
	loading.value = true;

	utilityStore
		.fetchNavigationScopes({})
		.then((d) => {
			navs.value = d.results;
			loading.value = false;
		})
		.catch((e) => {
			console.log(e);
			loading.value = false;
		});
};

const handleCreateCampaignClose = (refresh = false) => {
	createCampaignModalOpen.value = false;
	if (refresh == true) {
		handleFetchNavs();
	}
};

onMounted(() => {
	handleFetchNavs();
});

useHead({
	title: "Menus",
});
</script>

<style scoped lang="scss"></style>
