import { defineStore } from "pinia";

export const useUserOnlineStore = defineStore({
    id: "userOnline",
    state: () => {
        return {
            list: [],
        };
    },
    actions: {
        updateList(list: any) {
            this.list = list
        },
    },
    getters: {
        count: (state) => state.list.length
    }
});
