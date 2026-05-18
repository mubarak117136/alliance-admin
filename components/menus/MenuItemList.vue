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
								<NuxtLink
									:to="{
										name: 'settings-menu-id-menu',
										params: { id: route?.params?.id, menu: item?.id },
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
				Not any item found!
			</div>
		</v-sheet>
	</div>
</template>

<script setup>
import { useRoute } from "#vue-router";
import { useUtilityStore } from "@/stores/utility";

const utilityStore = useUtilityStore();
const route = useRoute();

const props = defineProps({
	refresh: null,
});
const emit = defineEmits();

const loading = ref(false);
const items = ref("");

const handleFetchMenuItems = () => {
	loading.value = true;
	utilityStore
		.fetchMenus({ navigation: route?.params?.id })
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
</script>

<style scoped lang="scss"></style>
