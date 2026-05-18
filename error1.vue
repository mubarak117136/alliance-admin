<template>
	<div class="error">
		<h1 v-if="error.statusCode === 404">Page Does Not Exist</h1>
		<h1 v-else>Server Error</h1>
		<NuxtLink to="/">Home Page</NuxtLink>
	</div>
</template>
<script setup>
const { error } = defineProps({
	error: null,
});

const handleError = () => clearError({ redirect: "/" });
</script>
<style scoped lang="scss">
.error {
	height: 100vh;
	width: 100%;
	display: flex;
	justify-content: center;
	align-items: center;
	h1 {
		color: black;
	}
	a {
		text-decoration: underline;
	}
}
</style>
