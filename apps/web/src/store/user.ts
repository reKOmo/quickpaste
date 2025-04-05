import { defineStore } from "pinia";
import type { User } from "interfaces";

export interface UserState {
    userData: User | undefined
}

const state = (): UserState => ({
    userData: undefined
});

const getters = {
    user: (state: UserState) => (): User | undefined => {
        return state.userData;
    },
    username: (state: UserState) => (): string | undefined => {
        return state.userData ? state.userData.username : "";
    },
    id: (state: UserState) => (): number | undefined => {
        return state.userData ? state.userData.id : -1;
    }
};

export const useUserStore = defineStore("userStore", {
    state,
    getters,
    actions: {
        async getUser() {
            const user: User = await $fetch(useRuntimeConfig().public.webAddress + `/api/user`, {
                credentials: "include",
                parseResponse: JSON.parse
            });
            user.joined = (new Date(user.joined)).toLocaleDateString();
            this.userData = user;
        },
        unset() {
            this.userData = undefined;
        }
    }
});