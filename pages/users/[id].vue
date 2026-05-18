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
							<div class="text-surface-bright">User - {{ item?.username }}</div>
						</div>
					</div>
				</v-sheet>
			</v-col>
			<v-col cols="12" lg="8">
				<v-sheet rounded="lg" class="pa-4">
					<UsersUserDetail v-if="item" :data="item" />
				</v-sheet>
			</v-col>

			<v-col cols="12" lg="4">
				<v-sheet rounded="lg" class="pa-4">
					<UsersOrderHistory v-if="item" :item="item" />
				</v-sheet>
			</v-col>

			<v-col cols="12" lg="8"> </v-col>

			<v-col
				cols="12"
				lg="4"
				v-if="item?.is_staff == true || item?.is_superuser == true"
			>
				<v-sheet rounded="lg" class="pa-4">
					<UsersPermissions
						v-if="permissionList && item?.accepted_permissions"
						:permissions="permissionList"
						:acceptedPermissions="item?.accepted_permissions"
					/>
				</v-sheet>
			</v-col>
		</v-row>
	</div>
</template>

<script setup>
import { useRoute } from "#vue-router";
import { useUserStore } from "@/stores/user";

const route = useRoute();
const router = useRouter();
const userStore = useUserStore();
const dayjs = useDayjs();

var loading = ref(false);
var item = ref(null);
const permissionList = ref(null);

const handleFetchItem = () => {
	loading.value = true;

	userStore
		.fetchUser(route?.params?.id)
		.then((d) => {
			item.value = d;
			loading.value = false;
		})
		.catch((e) => {
			console.log(e);
			loading.value = false;
		});
};

const handleFetchPermissions = () => {
	loading.value = true;

	userStore
		.fetchPermissions()
		.then((d) => {
			permissionList.value = d;
			loading.value = false;
		})
		.catch((e) => {
			console.log(e);
			loading.value = false;
		});
};

const handleBack = () => {
	router.push({ name: "users" });
};

onMounted(() => {
	handleFetchItem();
	handleFetchPermissions();
});

useHead({
	title: "User detail",
});
</script>

<style scoped lang="scss"></style>
