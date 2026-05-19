<template>
	<div>
		<v-card variant="flat" class="pa-4" v-if="props?.item?.payment">
			<div>
				<div class="d-flex flex-column ga-2">
					<div class="text-body-2 d-flex ga-4 text-surface-bright">
						<div>Payment method:</div>
						<div>
							{{
								paymentMethodProvider(props?.item?.payment?.gateway?.provider)
							}}
						</div>
					</div>
					<div class="text-body-2 d-flex ga-4 text-surface-bright">
						<div>Total payable:</div>
						<div>{{ props?.item?.payment?.amount }}৳</div>
					</div>

					<div
						class="d-flex flex-column ga-2"
						v-if="props?.item?.payment?.gateway?.provider == 4"
					>
						<div class="text-body-2 d-flex ga-4 text-surface-bright">
							<div>Total paid:</div>
							<div>
								{{ props?.item?.payment?.data?.amount_captured / 100 }}$
							</div>
						</div>

						<div class="text-body-2 d-flex text-surface-bright ga-4">
							<div>Transaction ID:</div>
							<div>{{ props?.item?.payment?.data?.id }}</div>
						</div>

						<div class="text-body-2 d-flex text-surface-bright ga-4">
							<div>Card type:</div>
							<div>{{ props?.item?.payment?.data?.source?.brand }}</div>
						</div>

						<div class="text-body-2 d-flex text-surface-bright ga-4">
							<div>Last 4 digits:</div>
							<div>{{ props?.item?.payment?.data?.source?.last4 }}</div>
						</div>
					</div>

					<div class="text-body-2 d-flex ga-4 text-surface-bright">
						<div>Payment status:</div>
						<div>
							<v-chip
								size="x-small"
								:color="orderPaymentStatusColor(props?.item?.payment?.status)"
								>{{ paymentStatusToText(props?.item?.payment?.status) }}</v-chip
							>
						</div>
					</div>
					<div class="mt-4">
						<v-btn
							:loading="loading"
							variant="tonal"
							type="button"
							size="small"
							v-if="
								props?.item?.payment?.status == 0 ||
								props?.item?.payment?.status == 2
							"
							@click="paymentStatusConfirmModalOpen = true"
						>
							Received payment
						</v-btn>
						<v-btn
							:loading="loading"
							variant="tonal"
							type="button"
							size="small"
							color="error"
							v-if="props?.item?.payment?.status == 1"
							@click="paymentStatusConfirmModalOpen = true"
						>
							Cancel payment
						</v-btn>
					</div>
				</div>
			</div>
		</v-card>
		<div v-else class="text-body-2 text-surface-bright text-center">
			Not any payment information found!
		</div>

		<ModalsYesNoModal
			v-if="paymentStatusConfirmModalOpen"
			:isOpenModal="paymentStatusConfirmModalOpen"
			@close="handlePaymentStatusConfirmation"
		/>
	</div>
</template>

<script setup>
import { useSaleStore } from "@/stores/sale";
import { paymentMethodProvider } from "@/utils/utils";
import { useToast } from "vue-toastification";

const saleStore = useSaleStore();
const toast = useToast();

const props = defineProps({
	item: null,
});

const emit = defineEmits();

var loading = ref(false);
const paymentStatusConfirmModalOpen = ref(false);

const handlePaymentStatusChange = () => {
	loading.value = true;
	const payload = {
		payment: props?.item?.payment?.id,
	};

	saleStore
		.changePaymentStatus(payload)
		.then((d) => {
			loading.value = false;
			toast.success("Payment updated!");
			close();
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

const close = () => {
	emit("close");
};

const handlePaymentStatusConfirmation = (status) => {
	if (status == true) {
		handlePaymentStatusChange();
	}
	paymentStatusConfirmModalOpen.value = false;
};

const paymentStatusToText = (status) => {
	if (status == 0) {
		return "Pending";
	} else if (status == 1) {
		return "Success";
	} else {
		return "Failed";
	}
};

const orderPaymentStatusColor = (status) => {
	if (status == 0) {
		return "primary";
	} else if (status == 1) {
		return "green";
	} else {
		return "error";
	}
};
</script>

<style lang="scss" scoped></style>
