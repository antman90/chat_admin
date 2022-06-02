import './style/main.scss'
import { createApp } from "vue";
import App from "./App.vue";
import "vue-global-api";
import router from "./router";
import store from "./store";

createApp(App)
    .use(router)
    .use(store)
    .mount("#app");
