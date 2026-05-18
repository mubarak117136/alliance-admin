<template>
	<v-dialog v-model="openModal" width="auto" scroll-strategy="none" persistent>
		<v-sheet
			rounded="lg"
			class="pa-0 ma-0"
			:style="{ width: dialogWidth, 'max-height': '90vh' }"
		>
			<v-row class="bg-cyan-darken-4 pa-0 ma-0 pt-3">
				<v-col cols="12">
					<div class="d-flex justify-space-between">
						<div class="text-h6">
							<v-icon class="mr-4">mdi-sitemap-outline</v-icon>
							Product content
						</div>
						<div>
							<v-icon class="cursor-pointer" @click="close">mdi-close</v-icon>
						</div>
					</div>
				</v-col>
			</v-row>
			<v-row class="ma-0" v-if="contents.length < 1">
				<ModalsProductContentSelector
					@selectContentType="handleSelectContentType"
				/>
			</v-row>
			<v-row
				class="ma-0 pa-0"
				v-for="(item, idx) in contents"
				:key="'content_' + idx"
			>
				<v-col cols="12">
					<v-row align="center" justify="center">
						<v-col
							cols="11"
							sm="11"
							md="10"
							lg="8"
							xl="8"
							xxl="8"
							class="d-flex justify-space-between"
						>
							<div class="text-h6" v-if="item.type == 0">
								#{{ idx + 1 }} Richtext
							</div>
							<div class="text-h6" v-if="item.type == 1">
								#{{ idx + 1 }} Image
							</div>
							<div class="text-h6" v-if="item.type == 2">
								#{{ idx + 1 }} Video
							</div>
							<div class="text-h6" v-if="item.type == 3">
								#{{ idx + 1 }} Table
							</div>
							<div class="d-flex ga-4">
								<input
									class="custom-text-input"
									type="text"
									v-model="contents[idx].order_no"
								/>
								<v-btn
									variant="tonal"
									class="text-surface-bright"
									type="button"
									:loading="loading"
									size="small"
									color="error"
									@click="handleRemoveContent(idx)"
								>
									<v-icon color="error" size="small">mdi-trash-can</v-icon>
									<v-tooltip activator="parent" location="bottom"
										>Remove</v-tooltip
									>
								</v-btn>
							</div>
						</v-col>
						<v-col cols="11" sm="11" md="10" lg="8" xl="8" xxl="8">
							<package-tiptap
								v-model="contents[idx].richtext"
								v-if="item.type == 0"
							/>
							<ModalsProductImageSelector
								v-model="contents[idx].image"
								v-if="item.type == 1"
							/>
							<ModalsProductVideoInput
								v-model="contents[idx].video"
								v-if="item.type == 2"
							/>
							<package-table
								v-model="contents[idx].table"
								v-if="item.type == 3"
							/>
						</v-col>
					</v-row>
					<v-divider
						class="mt-10"
						v-if="contents.length != idx + 1"
					></v-divider>
				</v-col>
			</v-row>
			<v-row class="ma-0 pa-0" v-if="contents.length > 0">
				<ModalsProductContentSelector
					@selectContentType="handleSelectContentType"
				/>
			</v-row>
			<v-row class="ma-0 pa-0" align="center" justify="center">
				<v-col cols="11" sm="11" md="10" lg="8" xl="8" xxl="8">
					<v-btn
						:loading="loading"
						class="bg-surface-bright"
						type="button"
						@click="handleSave"
						>Save</v-btn
					>
				</v-col>
			</v-row>
		</v-sheet>
		<ModalsCustomLoader v-if="loading" :isOpenModal="loading" />
	</v-dialog>
</template>

<script setup>
import { useDisplay } from "vuetify";
import { useProductStore } from "@/stores/product";
import { useToast } from "vue-toastification";

const productStore = useProductStore();
const toast = useToast();

const { name } = useDisplay();

const props = defineProps({
	isOpenModal: false,
	product: null,
	data: null,
});
const emit = defineEmits();

var openModal = ref(false);
const contents = ref([]);
const loading = ref(false);

const handleSave = () => {
	loading.value = true;
	const payload = {
		product: props.product,
		data: contents.value,
	};
	productStore
		.updateProductContent(payload)
		.then((d) => {
			loading.value = false;
			emit("refreshData");
		})
		.catch((e) => {
			console.log(e);
			loading.value = false;
			toast.error("Something went wrong!");
		});
};

const handleSelectContentType = (params) => {
	const item = {
		product: props.product,
		type: params.type,
		order_no: contents.value.length,
	};

	if (params.type == 0) {
		item["richtext"] = "";
	}
	if (params.type == 1) {
		item["image"] = "";
	}

	if (params.type == 2) {
		item["video"] = "";
	}
	if (params.type == 3) {
		item["table"] = "";
	}
	contents.value.push(item);
};

const handleRemoveContent = (index) => {
	contents.value.splice(index, 1);
};

const close = () => {
	emit("close");
};

const dialogWidth = computed(() => {
	switch (name.value) {
		case "xs":
			return "90vw";
		case "sm":
			return "90vw";
		case "md":
			return "90vw";
		case "lg":
			return "60vw";
		case "xl":
			return "60vw";
		case "xxl":
			return "60vw";
	}

	return undefined;
});

watch(
	() => props.data,
	(val, oldVal) => {
		contents.value = props.data;
	},
	{ deep: true }
);

onMounted(() => {
	openModal.value = props.isOpenModal;
	contents.value = props.data;
});
</script>

<style scoped lang="scss">
.custom-text-input {
	border: 1px solid rgb(204, 191, 214);
	width: 40px;
	height: 28px;
	border-radius: 5px;
	padding-left: 10px;
	color: rgb(204, 191, 214);
	font-size: 14px;
	font-weight: 700;
}
</style>
