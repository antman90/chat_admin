import { createVNode, render } from "vue";
import LayerConstructor from "./index.vue";
import { msgInterface } from "../../../interface";

const Layer = (params: msgInterface | string): void => {
  const options = typeof params === "string" ? { msg: params } : params;
  const container = document.createElement("div");
  container.className = "__MF_LAYER__";
  const vm = createVNode(LayerConstructor, options);
  render(vm, container);
  document.body.appendChild(container);
};

export default {
  //组件注册
  install(app: any) {
    app.provide("Layer", Layer);
  },
};
