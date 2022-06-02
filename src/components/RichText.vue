<script setup lang="ts">
import E from "wangeditor";
import config from "../ts/rich-text-18n";
import i18next from "i18next";

const props = defineProps({
  content: {
    type: String,
    default: "",
  },
  menusType: {
    type: String,
    default: "admin",
  },
  placeHolder: {
    type: String,
    default: "",
  },
});

const emits = defineEmits<{
  (e: "getContent", html: string): void;
}>();

const menus: any = {
  admin: ["fontSize", "italic", "underline", "foreColor", "justify"],
};

let editor: any = null;
const editorTime = new Date().getTime();
const createEditor = () => {
  editor = new E(
    ".chat-rich-menu" + editorTime,
    ".chat-rich-content" + editorTime
  );
  editor.config = Object.assign(editor.config, config);
  editor.config.menus = menus[props.menusType];
  if (props.placeHolder) {
    editor.config.placeholder = props.placeHolder;
  }
  editor.config.onchange = function (newHtml: string) {
    emits("getContent", newHtml);
  };
  editor.i18next = i18next;
  editor.create();
  if (props.content) {
    getRichTxt(props.content);
  }
};

watch(
  () => props.content,
  (html: string) => {
    html && getRichTxt(html);
  }
);

const getRichTxt = (html: string) => {
  editor.txt.html(html);
};

onMounted(() => {
  createEditor();
});
</script>

<template>
  <div class="m-rich-wrap">
    <div :class="`chat-rich-menu${editorTime}`"></div>
    <div :class="`chat-rich-content${editorTime}`"></div>
  </div>
</template>
