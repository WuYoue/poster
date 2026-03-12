import { createApp } from "vue";
import antd from "ant-design-vue";
// @ts-ignore 无法找到模块声明文件，临时忽略类型检查
import store from "@/stores/index.js";
import App from "./App.vue";
import "ant-design-vue/dist/antd.css";

createApp(App).use(antd).use(store).mount("#app");
