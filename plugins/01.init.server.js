import { useUserStore } from "@/stores/user";
import { useUtilityStore } from "@/stores/utility";

export default defineNuxtPlugin(async (nuxtApp) => {
	const userStore = useUserStore(nuxtApp.$pinia);
	const utilityStore = useUtilityStore(nuxtApp.$pinia);

	await utilityStore.fetchSettings().catch((e) => {
		console.log(e);
	});
	await userStore.getTokenFromLocalStorage().catch((e) => {});
	await userStore.profile().catch((e) => {});
});
