<template>
	<div>
		<v-container fluid class="pa-0 ma-0">
			<v-row class="pa-0 ma-0">
				<div class="pa-0 ma-0 d-none d-sm-none d-md-flex"><SideBar /></div>
				<div class="pa-0 ma-0 d-flex d-md-none" style="width: 100%"></div>
				<v-col cols="12" class="pa-0 ma-0 custom-body-container">
					<slot />
				</v-col>
			</v-row>
		</v-container>
	</div>
</template>

<script setup></script>

<style scoped lang="scss">
.custom-body-container {
	padding-left: 0px !important;
	margin-left: 0px !important;
	@media (min-width: 960px) and (max-width: 1280px) {
		padding-left: 180px !important;
	}
	@media (min-width: 1280px) {
		padding-left: 260px !important;
	}
}
</style>
