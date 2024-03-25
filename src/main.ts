import { createApp } from "vue";
import App from "./App.vue";
import router from "./router";
import store from "./store";
import { installPinia } from "./pinia";

const app = createApp(App);
app.use(store).use(router);
installPinia(app);
app.mount("#app");
