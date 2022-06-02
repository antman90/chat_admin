import { defineStore } from "pinia";

export const useHomeStore = defineStore({
  id: "home",
  state: () => {
    return {
      connectionTotal: 0,
      connetionList: [],
    };
  },
  actions: {
    updateConnectionTotal(num: number) {
      this.connectionTotal = num;
    },
    updateConnectionList(list: any) {
      this.connetionList = list;
    },
  },
});
