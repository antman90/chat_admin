import { defineStore } from "pinia";

export const useWsStore = defineStore({
    id: "ws",
    state: () => {
        return {
            ws: null,
        };
    },
    actions: {
        updateWs(ws: any) {
            this.ws = ws;
        },
    },
});
