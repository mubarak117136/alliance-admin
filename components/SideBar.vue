<template>
	<v-container
		class="c-sidebar-container position-fixed pa-5 ma-0 h-screen bg-surface d-flex flex-column justify-space-between overflwo-hidden overflow-y-auto"
		:elevation="24"
	>
		<div>
			<v-row class="">
				<v-col cols="12" align="center">
					<NuxtLink to="/">
						<v-img
							v-if="getBasicSettings?.logo"
							:width="120"
							cover
							:src="HOST + getBasicSettings?.logo?.original?.src"
						></v-img>
						<v-img v-else :width="120" cover src="/logo/logo-4.png"></v-img>
					</NuxtLink>
				</v-col>
			</v-row>

			<v-row>
				<v-col cols="12">
					<v-list
						v-model:opened="expandList"
						density="compact"
						class="overflow-hidden"
					>
						<div v-for="(menu, idx) in menus" :key="'menu_' + idx">
							<v-list-item v-if="!menu.child" :to="menu.link" rounded="xl">
								<template v-slot:prepend>
									<v-icon class="custom-list-icon">{{ menu.icon }}</v-icon>
								</template>
								<template v-slot:title>
									<div class="custom-list-font-size">{{ menu.name }}</div>
								</template>
							</v-list-item>
							<v-list-group v-else :value="menu.name">
								<template v-slot:activator="{ props }">
									<v-list-item v-bind="props" rounded="xl">
										<template v-slot:prepend>
											<v-icon class="custom-list-icon">{{ menu.icon }}</v-icon>
										</template>
										<template v-slot:title>
											<div class="custom-list-font-size">{{ menu.name }}</div>
										</template>
									</v-list-item>
								</template>

								<v-list-item
									v-for="(submenu, sidx) in menu.child"
									:key="'submenu_' + sidx"
									rounded="xl"
									:to="submenu.link"
									class="pl-0"
								>
									<template v-slot:prepend>
										<v-icon class="custom-list-icon">{{ submenu.icon }}</v-icon>
									</template>
									<template v-slot:title>
										<div class="custom-list-font-size">{{ submenu.name }}</div>
									</template>
								</v-list-item>
							</v-list-group>
						</div>
					</v-list>
				</v-col>
			</v-row>
		</div>

		<div class="mt-10">
			<v-card class="bg-surface-light rounded-xl ma-0" @click="handleSignout">
				<template v-slot:prepend>
					<v-icon size="s">mdi-logout</v-icon>
				</template>
				<template v-slot:append
					><div style="font-size: 12px">Sign Out</div></template
				>
			</v-card>
		</div>
	</v-container>
</template>

<script setup>
import { useRoute } from "#vue-router";
import { menus } from "@/utils/utils";
import { useUserStore } from "@/stores/user";
import { useUtilityStore } from "@/stores/utility";

const config = useRuntimeConfig();
const route = useRoute();
const router = useRouter();
const userStore = useUserStore();
const utilityStore = useUtilityStore();

const { getBasicSettings } = storeToRefs(utilityStore);

var expandList = ref([]);

const HOST = computed(() => {
	return config.public.HOST;
});

onMounted(() => {
	if (route.name == "products-slug") {
		expandList.value = ["Product"];
	} else if (route.name == "products-brand-slug") {
		expandList.value = ["Product"];
	} else if (route.name == "products-attribute-slug") {
		expandList.value = ["Product"];
	} else if (
		route.name == "settings-menu-id" ||
		route.name == "settings-menu-id-menu"
	) {
		expandList.value = ["Settings"];
	}
});

const handleSignout = () => {
	userStore.signOut().then((d) => {
		router.push({ name: "signin" });
	});
};
</script>

<style scoped lang="scss">
.v-list-group__items .v-list-item {
	padding-left: 35px !important;
}
.v-card-title {
	font-size: 12px !important;
}

:deep(.v-list-item__append .v-list-item__spacer) {
	width: 5px !important;
}

@media (min-width: 960px) and (max-width: 1280px) {
	.c-sidebar-container {
		max-width: 180px !important;
	}
	.custom-list-font-size {
		font-size: 12px;
	}
	.custom-list-icon {
		font-size: 16px;
	}
	:deep(.v-list-item__prepend .v-list-item__spacer) {
		width: 8px !important;
	}
}

@media (min-width: 1280px) {
	.c-sidebar-container {
		max-width: 260px !important;
	}
	.custom-list-font-size {
		font-size: 16px;
	}
	.custom-list-icon {
		font-size: 24px;
	}
	:deep(.v-list-item__prepend .v-list-item__spacer) {
		width: 32px !important;
	}
}
</style>
