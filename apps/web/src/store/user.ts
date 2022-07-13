import { defineStore } from "pinia";
import { User } from "interfaces";

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
        return state ? state.userData.username : undefined;
    },
    id: (state: UserState) => (): number | undefined => {
        return state ? state.userData.id : undefined;
    }
};

export const useUserStore = defineStore("userStore", {
    state,
    getters,
    actions: {
        async getUser() {
            const user = await $fetch("/webapi/user", {
                credentials: "include",
                parseResponse: JSON.parse
            });
            this.userData = user;
        },
        unset() {
            this.userData = undefined;
        }
    }
});