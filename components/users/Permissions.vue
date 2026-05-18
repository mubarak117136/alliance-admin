<template>
	<v-row>
		<v-col cols="12">
			<div class="text-surface-bright">Permissions</div>
			<v-divider class="mt-4 mb-4"></v-divider>
			<div class="d-flex ga-4">
				<v-btn color="surface-bright" @click="handleSelectAll"
					>Select all</v-btn
				>
				<v-btn color="error" @click="handleUnselectAll">Unselect all</v-btn>
			</div>
			<v-table density="compact" v-if="permissionList?.length > 0" class="mt-4">
				<thead>
					<tr class="text-surface-bright"></tr>
				</thead>
				<tbody>
					<tr v-for="(item, idx) in permissionList" :key="'permissions_' + idx">
						<td class="text-surface-bright">
							<v-checkbox
								v-model="item.checked"
								:label="item?.content_type"
								hide-details="auto"
							></v-checkbox>
						</td>
					</tr>
				</tbody>
			</v-table>
			<v-btn color="primary" class="mt-4 mb-4" @click="handleSave">Save</v-btn>
		</v-col>
	</v-row>
</template>

<script setup>
import { useToast } from "vue-toastification";
import { useUserStore } from "@/stores/user";
import { findNestedObj } from "@/utils/utils";
import { useRoute } from "#vue-router";

const userStore = useUserStore();
const toast = useToast();
const router = useRouter();
const route = useRoute();

const props = defineProps({
	permissions: null,
	acceptedPermissions: null,
});

const loading = ref(false);
const error_msg = ref("");
const permissionList = ref([]);

const handleSelectAll = () => {
	for (var i = 0; i < permissionList?.value?.length; i++) {
		permissionList.value[i].checked = true;
	}
};

const handleUnselectAll = () => {
	for (var i = 0; i < permissionList?.value?.length; i++) {
		permissionList.value[i].checked = false;
	}
};

const findPermission = (id) => {
	var foundObj = findNestedObj(props?.acceptedPermissions, "id", id);
	if (foundObj == undefined) {
		return false;
	} else {
		return true;
	}
};

const preparePermissionList = () => {
	for (var i = 0; i < props?.permissions?.length; i++) {
		permissionList.value.push({
			id: props?.permissions[i].id,
			content_type: props?.permissions[i].content_type,
			checked: findPermission(props?.permissions[i].id),
		});
	}
};

onMounted(() => {
	preparePermissionList();
});

const handleSave = () => {
	loading.value = true;
	var payload = {
		user: route?.params?.id,
	};
	var permissionInputs = [];

	for (var i = 0; i < permissionList?.value?.length; i++) {
		if (permissionList.value[i].checked == true) {
			permissionInputs.push(permissionList.value[i].id);
		}
	}
	payload["permission_inputs"] = permissionInputs;

	userStore
		.updatePermissions(payload)
		.then((d) => {
			loading.value = false;
			toast.success("Updated successfully!");
		})
		.catch((e) => {
			console.log(e);
			loading.value = false;
			toast.error("Something went wrong!");
		});
};

watch(
	() => props.permissions,
	(val, oldVal) => {
		preparePermissionList();
	},
	{ deep: true }
);
</script>

<style scoped lang="scss"></style>
