import "@mdi/font/css/materialdesignicons.css";
import DayJsAdapter from "@date-io/dayjs";
import "vuetify/styles";
import { createVuetify } from "vuetify";

export default defineNuxtPlugin((app) => {
	const vuetify = createVuetify({
		ssr: true,
		theme: {
			defaultTheme: "dark",
		},
		date: {
			adapter: DayJsAdapter,
		},
	});
	app.vueApp.use(vuetify);
});
