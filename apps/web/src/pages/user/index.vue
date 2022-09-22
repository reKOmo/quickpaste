<template>
    <div class="flex flex-col md:flex-row w-full justify-between">
        <UserPanel />
        <div class="md:w-4/5">
            <h1 class="text-5xl mb-6 text-orange text-shadow-sm border-b border-blue pb-4">Pastes</h1>
            <div ref="paste-container" v-if="pastes.length > 0" class="max-h-prose overflow-y-auto" @scroll="loadMorePastes">
                <div v-for="paste in pastes" :key="paste.uuid"
                    class="flex flex-col md:flex-row justify-between content-cetner mr-2 p-2 px-8 mb-4 rounded bg-blue">
                    <a :href="`/${paste.uuid}`">
                        <h3 class="text-2xl font-bold">
                            {{ paste.title }} 
                            <span class="text-sm font-normal italic text-gray-500">#{{ paste.uuid }}</span>
                            <font-awesome-icon v-if="paste.isPrivate" :icon="['fas', 'fa-eye-slash']" class="text-sm ml-2 mb-px" />
                            <font-awesome-icon v-if="paste.password" :icon="['fas', 'fa-lock']" class="text-sm ml-2 mb-px" />
                        </h3>
                        <ClientOnly>
                            <p>Created: {{ paste.created }}</p>
                        </ClientOnly>
                    </a>
                    <div class="flex flex-row justify-between">
                        <a class="bg-green flex-1 m-2 rounded p-4 text-center" :href="`/${paste.uuid}?edit=1`">Edit</a>
                        <button class="bg-red-600 flex-1 m-2 rounded p-4 text-center"
                            @click.stop="deletePaste(paste.uuid)">Remove</button>
                    </div>
                </div>
            </div>
            <div class="text-center" v-else>
                <h2 class="text-gray-400">You can create some pastes <a href="/" class="text-green">here</a></h2>
            </div>
        </div>
    </div>
</template>

<script setup>
import { NotificationTypes, useNotificationStore } from "@/store/notification";
import { useUserStore } from "@/store/user";
const notificationStore = useNotificationStore();
const userStore = useUserStore();
</script>

<script>
export default {
    data() {
        return {
            pastes: [],
            nextPageId: undefined,
            loadingMore: false
        }
    },
    methods: {
        async deletePaste(uuid) {
            const res = await this.notificationStore.addNotification({
                type: NotificationTypes.CONFIRM,
                title: "Delete paste?",
                description: "This action can not be reversed!"
            });
            if (res) {
                const r = await $fetch(`/api/paste/${uuid}`, {
                    method: "DELETE",
                    credentials: "include"
                });

                await this.refreshPastes()
            }
        },
        async refreshPastes() {
            const res = await $fetch(`/api/user/pastes`, {
                credentials: "include",
                parseResponse: JSON.json
            });

            this.pastes = res.result.pastes;

            this.nextPageId = res.result.nextPage;

            for (let i = 0; i < this.pastes.length; i++) {
                this.pastes[i].created = (new Date(this.pastes[i].created)).toLocaleDateString();
            }
        },
        async loadMorePastes() {
            const cont = this.$refs["paste-container"];
            const scrollAm = cont.scrollTop + cont.clientHeight;
            if (this.nextPageId && scrollAm > cont.scrollHeight - 20 && !this.loadingMore) {
                this.loadingMore = true;
                const res = await $fetch(`/api/user/pastes?pageId=${this.nextPageId}`, {
                    credentials: "include",
                    parseResponse: JSON.json
                });

                
                this.nextPageId = res.result.nextPage;

                for (let i = 0; i < res.result.pastes.length; i++) {
                    res.result.pastes[i].created = (new Date(res.result.pastes[i].created)).toLocaleDateString();
                }

                this.pastes = this.pastes.concat(res.result.pastes);

                this.loadingMore = false;
            }
        }
    },
    mounted() {
        document.title = `Quickpaste | ${this.userStore.username()}`;
        if (this.pastes.length === 0) this.refreshPastes();
    }
}
</script>