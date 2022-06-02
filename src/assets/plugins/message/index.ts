import { createVNode, render } from "vue";
import MessageConstructor from "./index.vue";
import { msgInterface } from "../../../interface";

const Message = (options: msgInterface): void => {
  const container = document.createElement("div");
  container.className = `__default__container__message__`;
  const vm = createVNode(MessageConstructor, options);
  render(vm, container);
  document.body.appendChild(container);
};

export default {
  //组件注册
  install(app: any) {
    app.provide("Message", Message);
  },
};
