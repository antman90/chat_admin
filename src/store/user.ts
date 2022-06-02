import { defineStore } from "pinia";

export const useUserStore = defineStore({
    id: "user",
    state: () => {
        return {
            name: '',
            wsName: '',
            token: '',
        };
    },
    actions: {
        updateName(name: string) {
            this.name = name
        },
        updateWsName(wsName: string) {
            this.wsName = wsName
        },
        updateToken(token: string) {
            this.token = token
        },
    },
    persist: {
        enabled: true,
        strategies: [
            {
                storage: localStorage,
                paths: [
                    // 'name',
                    // 'wsName',
                    // 'token'
                ],
            },
        ],
    },
});
