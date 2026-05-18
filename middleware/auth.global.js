import { useUserStore } from "@/stores/user";

export default defineNuxtRouteMiddleware((to, from) => {
	const user = useUserStore();

	if (to.name != "signin") {
		if (!user.getToken) {
			return navigateTo("/signin");
		}
	}
});
