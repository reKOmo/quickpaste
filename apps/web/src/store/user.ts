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
            const user = await $fetch(`/api/user`, {
                credentials: "include",
                parseResponse: JSON.parse
            });
            user["joined"] = (new Date(user["joined"])).toLocaleDateString();
            this.userData = user;
        },
        unset() {
            this.userData = undefined;
        }
    }
});