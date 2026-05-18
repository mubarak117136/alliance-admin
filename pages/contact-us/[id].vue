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
							<div class="text-surface-bright">Contact us</div>
						</div>
					</div>
					<v-btn variant="tonal" size="small" @click="hanldeRemoveContactUs">
						<v-icon color="error" size="x-large">mdi-trash-can</v-icon>
						<v-tooltip activator="parent" location="bottom">Remove</v-tooltip>
					</v-btn>
				</v-sheet>

				<v-sheet rounded="lg" class="pa-4 d-flex flex-column ga-4">
					<div class="d-flex flex-column">
						<div class="text-body-2">Full name:</div>
						<div class="text-body-2 text-surface-bright">
							{{ item?.full_name }}
						</div>
					</div>
					<v-divider />
					<div class="d-flex flex-column">
						<div class="text-body-2">Email:</div>
						<div class="text-body-2 text-surface-bright">
							{{ item?.email }}
						</div>
					</div>
					<v-divider />
					<div class="d-flex flex-column">
						<div class="text-body-2">Phone:</div>
						<div class="text-body-2 text-surface-bright">
							{{ item?.phone }}
						</div>
					</div>
					<v-divider />
					<div class="d-flex flex-column">
						<div class="text-body-2">Status:</div>
						<div>
							<v-chip
								size="x-small"
								:color="contactUsStatusColor(item?.status)"
								>{{ contactUsStatusToText(item?.status) }}</v-chip
							>
						</div>
					</div>
					<v-divider />
					<div class="d-flex flex-column">
						<div class="text-body-2">Date:</div>
						<div class="text-body-2 text-surface-bright">
							{{ dayjs(item?.creation_time).format("DD / MM / YYYY") }}
						</div>
					</div>
					<v-divider />
					<div class="d-flex flex-column">
						<div class="text-body-2">Message:</div>
						<div class="text-body-2 text-surface-bright">
							{{ item?.message }}
						</div>
					</div>
					<v-divider />
					<div class="d-flex flex-column">
						<div class="text-body-2">Reply:</div>
						<v-btn
							@click="handleSendEmail"
							color="surface-bright"
							class="bg-blue text-capitalize mt-2"
							size="small"
							width="200"
							>Send Email</v-btn
						>
					</div>
				</v-sheet>
			</v-col>
		</v-row>
		<ModalsSendMarketingEmail
			v-if="sendEmailModalOpen"
			:isOpenModal="sendEmailModalOpen"
			:emails="selectedItems"
			@close="sendEmailModalOpen = false"
		/>
	</div>
</template>

<script setup>
import { useRoute } from "#vue-router";
import { useUtilityStore } from "@/stores/utility";
import { contactUsStatusToText, contactUsStatusColor } from "@/utils/utils";
import { useToast } from "vue-toastification";

const route = useRoute();
const router = useRouter();
const dayjs = useDayjs();
const utilityStore = useUtilityStore();
const toast = useToast();

var loading = ref(false);
var item = ref(null);
const selectedItems = ref([]);
const sendEmailModalOpen = ref(false);

const handleFetchItem = () => {
	loading.value = true;

	utilityStore
		.contactUsDetail(route?.params?.id)
		.then((d) => {
			item.value = d;
			loading.value = false;
		})
		.catch((e) => {
			console.log(e);
			loading.value = false;
		});
};

const handleBack = () => {
	router.push({ name: "contact-us" });
};

onMounted(() => {
	handleFetchItem();
});

const hanldeRemoveContactUs = () => {
	loading.value = true;

	utilityStore
		.deleteContactUs(route?.params?.id)
		.then((d) => {
			loading.value = false;
			toast.success("Successfully deleted!");
			router.push({ name: "contact-us" });
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

const handleSendEmail = () => {
	selectedItems.value = [item.value?.email];
	sendEmailModalOpen.value = true;
};

useHead({
	title: "Contact us details",
});
</script>

<style scoped lang="scss"></style>
