<template>
	<div class="mt-6">
		<v-table density="compact" v-if="items?.length > 0">
			<thead>
				<tr class="text-surface-bright">
					<th class="text-left"></th>
					<th class="text-left">Name</th>
					<th class="text-left">Category</th>
					<th v-if="type == 'view'" class="text-left">View</th>
					<th v-else class="text-left">Sold</th>
				</tr>
			</thead>
			<tbody>
				<tr v-for="(item, idx) in items" :key="'item_' + idx">
					<td class="text-surface-bright" style="width: 80px !important">
						<NuxtLink :to="'/products/' + item?.slug">
							<v-img
								:src="HOST + item?.default_image?.file_detail?.url"
								height="60"
							></v-img>
						</NuxtLink>
					</td>
					<td>
						<NuxtLink
							class="text-surface-bright text-decoration-none"
							:to="'/products/' + item?.slug"
							>{{ truncateText(item.name, 40) }}</NuxtLink
						>
					</td>
					<td class="text-surface-bright">
						{{ item.category_detail.title }}
					</td>
					<td v-if="type == 'view'" class="text-surface-bright">
						{{ item?.view_count }}
					</td>
					<td v-else class="text-surface-bright">
						{{ item?.sell_count }}
					</td>
				</tr>
			</tbody>
		</v-table>
	</div>
</template>

<script setup>
const router = useRouter();
const config = useRuntimeConfig();

const { items, type } = defineProps({
	items: null,
	type: "view",
});

const HOST = computed(() => {
	return config.public.HOST;
});

onMounted(() => {});
</script>

<style scoped lang="scss"></style>
