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
							<div class="text-h6 text-surface-bright">Order Detail</div>
						</div>
					</div>
					<div class="pa-0 ma-0 my-auto">
						{{ item?.order_id }}
					</div>
				</v-sheet>
				<v-row>
					<v-col cols="12" md="8">
						<v-sheet rounded="lg" class="pa-4 mb-4">
							<OrdersPaymentInfo :item="item" @close="handleFetchItem" />
						</v-sheet>
						<v-sheet rounded="lg" class="pa-4 mb-4">
							<div class="text-body-2 d-flex text-surface-bright ga-4 mb-4">
								<div>Handled by:</div>
								<div>{{ item?.authorized_by_detail?.full_name }}</div>
							</div>
							<div class="text-body-2 d-flex text-surface-bright ga-4 mb-4">
								<div>Order source:</div>
								<div>{{ orderSourceToText(item?.source) }}</div>
							</div>
							<v-textarea
								v-model="adminOrderNote"
								clearable
								label="Admin order note"
								variant="outlined"
								density="compact"
								counter="1000"
							></v-textarea>
							<v-btn
								:loading="loading"
								variant="tonal"
								type="button"
								size="small"
								@click="handleSaveAdminOrderNote"
							>
								Save
							</v-btn>
						</v-sheet>
						<v-sheet rounded="lg" class="pa-4">
							<v-table density="compact" v-if="item?.carts?.length > 0">
								<thead>
									<tr class="text-surface-bright">
										<th class="text-left"></th>
										<th class="text-left">Name</th>
										<th class="text-left">QTY</th>
										<th class="text-left">Price</th>
									</tr>
								</thead>
								<tbody>
									<tr
										class="text-surface-bright"
										v-for="(i, idx) in item?.carts"
										:key="'item_' + idx"
									>
										<td style="width: 80px !important">
											<NuxtLink
												:to="{
													name: 'products-slug',
													params: { slug: i?.product_detail?.slug },
												}"
												class="cursor-pointer"
											>
												<v-img
													:src="
														HOST +
														i?.product_detail?.default_image?.original?.src
													"
													height="60"
												></v-img
											></NuxtLink>
										</td>
										<td>
											<NuxtLink
												:to="{
													name: 'products-slug',
													params: { slug: i?.product_detail?.slug },
												}"
												class="cursor-pointer text-decoration-none text-surface-bright"
											>
												{{
													truncateText(i?.product_detail?.name, 140)
												}}</NuxtLink
											>
											<div
												class="text-caption pt-2 pb-2"
												v-if="
													cartItemVariantResolver(i) ||
													!isObjectEmpty(i?.static_attribute_data)
												"
											>
												<v-sheet
													class="bg-surface-light text-surface-bright rounded pa-2"
													style="max-width: 350px"
												>
													<div v-if="cartItemVariantResolver(i)">
														{{ cartItemVariantResolver(i) }}
													</div>
													<div v-if="!isObjectEmpty(i?.static_attribute_data)">
														{{ convertObjToString(i?.static_attribute_data) }}
													</div>
												</v-sheet>
											</div>
										</td>
										<td>{{ i?.total_item }}</td>
										<td>
											{{ i?.total_item }} x
											{{ cartItemSinglePriceResolver(i) }}৳
											<span v-if="sumAttributePriceAdditions(i) > 0"
												>+ {{ sumAttributePriceAdditions(i) }}৳</span
											>
											= {{ cartItemPriceResolver(i) }}৳
										</td>
									</tr>
									<tr class="text-surface-bright">
										<td></td>
										<td></td>
										<td>Product total</td>
										<td>{{ calculateCartTotal }}৳</td>
									</tr>
									<tr class="text-surface-bright" v-if="item?.shipping_price">
										<td></td>
										<td></td>
										<td>Shipping cost</td>
										<td>{{ item?.shipping_price?.price }}৳</td>
									</tr>
									<tr v-if="item?.coupon" class="text-surface-bright">
										<td></td>
										<td></td>
										<td>Discount</td>
										<td>- {{ item?.coupon?.discount_amount }}৳</td>
									</tr>
									<tr v-if="item?.coin" class="text-surface-bright">
										<td></td>
										<td></td>
										<td>Coin</td>
										<td>- {{ item?.coin?.amount }}৳</td>
									</tr>
									<tr class="text-surface-bright">
										<td></td>
										<td></td>
										<td>Grand total</td>
										<td>{{ calculateGrandTotal }}৳</td>
									</tr>
								</tbody>
							</v-table>
							<div class="text-body-2 text-surface-bright text-center" v-else>
								Not any cart item found!
							</div>
						</v-sheet>
					</v-col>
					<v-col cols="12" md="4">
						<v-sheet rounded="lg" class="pa-4 mb-4">
							<div class="d-flex">
								<v-card variant="flat" class="pa-4 text-surface-bright">
									<div class="text-body-2" v-if="item?.shipping_address">
										{{ item?.shipping_address?.full_name }},
										<v-icon icon="mdi-phone" size="x-small"></v-icon>
										{{ item?.shipping_address?.phone }}
									</div>
									<div class="text-body-2" v-if="item?.shipping_address">
										{{ item?.shipping_address?.address }}
									</div>
									<div class="text-body-2" v-if="item?.shipping_address">
										{{ item?.shipping_address?.city_detail?.name }}, Bangladesh
									</div>
									<div
										class="text-body-2 mt-2"
										v-if="
											item?.shipping_address && item?.shipping_address?.email
										"
									>
										<v-icon icon="mdi-email" size="x-small"></v-icon>
										{{ item?.shipping_address?.email }}
									</div>
									<v-btn
										:loading="loading"
										variant="tonal"
										type="button"
										size="small"
										class="mt-4 bg-primary"
										:href="HOST + '/invoice/pdf/' + route?.params?.slug + '/'"
										target="_blank"
									>
										Download invoice
									</v-btn>
								</v-card>
							</div>
						</v-sheet>
						<v-sheet rounded="lg" class="pa-4">
							<div class="pa-4 mb-4">
								<div>
									<ChangeOrderStatus
										:data="item?.status"
										:orderID="item?.order_id"
										@refresh="handleFetchItem"
									/>
								</div>
								<v-timeline align="start" side="end">
									<v-timeline-item
										:dot-color="timeLineColor(i?.type)"
										v-for="(i, idx) in item?.all_status"
										:key="'status_' + idx"
										:icon="timeLineIcon(i?.type)"
									>
										<div class="d-flex">
											<div>
												<strong class="text-body-2">{{
													orderStatusTypeToText(i?.type)
												}}</strong>
												<div class="text-body-2">
													{{
														dayjs(i?.creation_time).format(
															"DD, MMM YYYY, HH:mm"
														)
													}}
												</div>
											</div>
										</div>
									</v-timeline-item>
								</v-timeline>
							</div>
							<div
								v-if="item?.shipping_price?.company_detail"
								class="pa-4 mb-4"
							>
								<div class="d-flex ga-4 text-body-2 text-surface-bright">
									<div style="width: 100px">Company:</div>
									<div>{{ item?.shipping_price?.company_detail?.name }}</div>
								</div>
								<div class="d-flex ga-4 text-body-2 text-surface-bright">
									<div style="width: 100px">Tracking code:</div>
									<div>{{ item?.shipping_price?.reference_number }}</div>
								</div>
								<div class="d-flex ga-4 text-body-2 text-surface-bright">
									<div style="width: 100px">Tracking link:</div>
									<a :href="item?.shipping_price?.tracking_link" target="_blank"
										>Tracking link</a
									>
								</div>
							</div>
							<div class="pa-4 mb-4 mt-4">
								<v-btn
									variant="tonal"
									type="button"
									size="small"
									@click="courierModalOpen = true"
								>
									Add Courier
								</v-btn>
							</div>
						</v-sheet>
						<v-sheet rounded="lg" class="pa-4 mt-4">
							<UsersOrderHistory v-if="item" :item="item" />
						</v-sheet>
					</v-col>
				</v-row>
			</v-col>
		</v-row>
		<ModalsOrdersAddCourier
			v-if="courierModalOpen"
			:isOpenModal="courierModalOpen"
			:order="item"
			@close="handleCloseCourierModal"
		/>
	</div>
</template>

<script setup>
import { useRoute } from "#vue-router";
import {
	orderStatusTypeToText,
	truncateText,
	isObjectEmpty,
	convertObjToString,
	orderSourceToText,
} from "@/utils/utils";
import { useToast } from "vue-toastification";
import { useSaleStore } from "@/stores/sale";
import { useUserStore } from "@/stores/user";

const config = useRuntimeConfig();
const route = useRoute();
const router = useRouter();
const saleStore = useSaleStore();
const userStore = useUserStore();
const toast = useToast();
const dayjs = useDayjs();

const { getProfile } = storeToRefs(userStore);

var loading = ref(false);
var item = ref(null);
const adminOrderNote = ref("");
const courierModalOpen = ref(false);

const HOST = computed(() => {
	return config.public.HOST;
});

const handleFetchItem = () => {
	loading.value = true;

	saleStore
		.orderDetails(route?.params?.slug)
		.then((d) => {
			loading.value = false;
			item.value = d;
			adminOrderNote.value = d?.admin_order_note;

			if (!d?.authorized_by) {
				handleAddAuthorizedByOrder();
			}
		})
		.catch((e) => {
			console.log(e);
			loading.value = false;
		});
};

onMounted(() => {
	handleFetchItem();
});

const handleAddAuthorizedByOrder = () => {
	loading.value = true;
	const payload = {
		data: {
			authorized_by: getProfile?.value?.id,
		},
		orderID: item?.value?.order_id,
	};

	saleStore
		.changeOrder(payload)
		.then((d) => {
			loading.value = false;
			handleFetchItem();
		})
		.catch((e) => {
			loading.value = false;
			console.log(e);
		});
};

const handleSaveAdminOrderNote = () => {
	loading.value = true;
	const payload = {
		data: {
			admin_order_note: adminOrderNote.value,
		},
		orderID: item?.value?.order_id,
	};

	saleStore
		.changeOrder(payload)
		.then((d) => {
			loading.value = false;
			toast.success("Order note updated!");
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

const handleCloseCourierModal = (refresh = false) => {
	if (refresh == true) {
		handleFetchItem();
	}
	courierModalOpen.value = false;
};

const handleBack = () => {
	router.push({ name: "orders" });
};

const cartItemVariantResolver = (i) => {
	if (item?.value?.status?.type == 1) {
		return i?.variant_detail?.name;
	} else {
		return i?.variant_data?.name;
	}
};

const sumAttributePriceAdditions = (cartItem) => {
	if (!cartItem || !cartItem.static_attribute_data) return 0;
	let addition_price = Object.values(cartItem.static_attribute_data).reduce(
		(sum, attr) => sum + (attr.price_addition || 0),
		0
	);
	return addition_price * cartItem?.total_item;
};

const cartItemSinglePriceResolver = (i) => {
	if (item?.value?.status?.type == 1) {
		return i?.variant_detail?.price;
	} else {
		return i?.variant_data?.price;
	}
};

const cartItemPriceResolver = (i) => {
	return i?.price;
};

const calculateCartTotal = computed(() => {
	let total = 0;
	for (var i = 0; i < item?.value?.carts?.length; i++) {
		total = total + cartItemPriceResolver(item?.value?.carts[i]);
	}
	return total;
});

const calculateGrandTotal = computed(() => {
	const cartTotal = calculateCartTotal.value;
	const shipping = item?.value?.shipping_price
		? item?.value?.shipping_price?.price
		: 0;
	const coupon = item?.value?.coupon?.discount_amount
		? item?.value?.coupon?.discount_amount
		: 0;
	const coin = item?.value?.coin?.amount ? item?.value?.coin?.amount : 0;
	const total = cartTotal + shipping - coupon - coin;
	return total.toFixed(2);
});

const timeLineIcon = (type) => {
	if (type == 1) {
		return "mdi-timer-sand";
	} else if (type == 2) {
		return "mdi-cog-clockwise";
	} else if (type == 3) {
		return "mdi-truck-delivery";
	} else if (type == 4) {
		return "mdi-check";
	} else if (type == 5) {
		return "mdi-keyboard-return";
	} else {
		return "mdi-close";
	}
};

const timeLineColor = (type) => {
	if (type == 1) {
		return "green";
	} else if (type == 2) {
		return "green";
	} else if (type == 3) {
		return "green";
	} else if (type == 4) {
		return "green";
	} else if (type == 5) {
		return "red";
	} else {
		return "red";
	}
};

useHead({
	title: "Order details",
});
</script>

<style scoped lang="scss"></style>
