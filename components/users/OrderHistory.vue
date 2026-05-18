<template>
	<div class="pa-4 mb-4" v-if="props?.item">
		<div class="text-body-1 text-surface-bright">Order history</div>
		<v-divider class="mt-2 mb-2"></v-divider>
		<div class="d-flex flex-column ga-2 mt-4">
			<div class="d-flex ga-4 text-body-2 text-surface-bright">
				<div>Total:</div>
				<div>{{ props?.item?.order_history?.total }}</div>
			</div>
			<div class="d-flex ga-4 text-body-2 text-surface-bright">
				<div>Pending:</div>
				<div>{{ props?.item?.order_history?.pending }}</div>
			</div>
			<div class="d-flex ga-4 text-body-2 text-surface-bright">
				<div>Processing:</div>
				<div>{{ props?.item?.order_history?.processing }}</div>
			</div>
			<div class="d-flex ga-4 text-body-2 text-surface-bright">
				<div>In transit:</div>
				<div>{{ props?.item?.order_history?.in_transit }}</div>
			</div>
			<div class="d-flex ga-4 text-body-2 text-surface-bright">
				<div>Delivered:</div>
				<div>{{ props?.item?.order_history?.delivered }}</div>
			</div>
			<div class="d-flex ga-4 text-body-2 text-surface-bright">
				<div>Cancelled:</div>
				<div>{{ props?.item?.order_history?.cancelled }}</div>
			</div>
			<div class="d-flex ga-4 text-body-2 text-surface-bright">
				<div>Returned:</div>
				<div>{{ props?.item?.order_history?.returned }}</div>
			</div>
			<div class="d-flex ga-4 text-body-2 text-surface-bright">
				<div>Total spend:</div>
				<div>{{ props?.item?.order_history?.total_spend }}৳</div>
			</div>
		</div>
	</div>
</template>

<script setup>
const props = defineProps({
	item: null,
});
</script>

<style scoped lang="scss"></style>
