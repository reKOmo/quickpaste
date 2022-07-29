<template>
    <div class="flex flex-col md:flex-row w-full justify-between">
        <div class="bg-gradient-to-tr from-green to-orange rounded p-4 mr-12 pr-24 w-full md:w-1/4 md:max-h-md md:min-h-sm mt-2">
            <ClientOnly>
                <h2 class="text-4xl">{{userStore.username()}}</h2>
                <p>Joined: {{userStore.userData.joined}}</p>
            </ClientOnly>
        </div>
        <div class="md:w-4/5">
            <h1 class="text-5xl mb-6 text-orange text-shadow-sm border-b border-blue pb-4">Pastes</h1>
            <div v-if="pastes.length > 0" class="max-h-prose overflow-y-auto">
                <div v-for="paste in pastes" :key="paste.uuid" class="flex flex-row justify-between content-cetner mr-2 p-2 px-8 mb-4 rounded bg-blue">
                    <a :href="`/${paste.uuid}`">
                        <h3 class="text-2xl font-bold">
                            {{paste.title}} <span class="text-sm font-normal italic text-gray-500">#{{paste.uuid}}</span>
                        </h3>
                        <ClientOnly>
                            <p>Created: {{paste.created}}</p>
                        </ClientOnly>
                    </a>
                    <div class="flex flex-row justify-between">
                        <a class="bg-green flex-1 m-2 rounded p-4" :href="`/${paste.uuid}?edit=1`">Edit</a>
                        <button class="bg-red-600 flex-1 m-2 rounded p-4" @click.stop="deletePaste(paste.uuid)">Remove</button>
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
    import { useUserStore } from "../../store/user";

    const router = useRouter();
    const loggedIn = useCookie("logged_in").value;
    if (loggedIn != "1") {
        router.replace("/");
    }

    const userStore = useUserStore();
    const notificationStore = useNotificationStore();

    const {data: pasteData, error, refresh} = await useAsyncData("pastes", async (ctx) => {
        if (process.server) {
            const cookieKey = useRequestHeaders(["cookie"]).cookie;
            const cookies = {};
            cookieKey.split(";").forEach(frag => {
                const a =frag.split("=");
                cookies[a[0].trim()] = a[1].trim();
            });

            const res = await $fetch("http://localhost:8080/api/user/pastes", {
                headers: {
                    "Authorization": "APIKey " + cookies.quickpaste_auth
                },
                parseResponse: JSON.text
            })

            return res;
        } else if (process.client) {
            const {data} = await useFetch("/webapi/user/pastes", {
                credentials: "include",
                parseResponse: JSON.parse
            });

            return data;
        }
    }, {
        //server: true
        
    })

    const pastes = pasteData.value.result;

    if (process.client) {
        for (let i = 0; i < pastes.length; i++) {
            pastes[i].created = (new Date(pastes[i].created)).toLocaleDateString();
        }
    }
</script>

<script>
    import { useUserStore } from "../../store/user";
    export default {
        methods: {
            async deletePaste(uuid) {
                const res = await this.notificationStore.addNotification({
                    type: NotificationTypes.CONFIRM,
                    title: "Delete paste?",
                    description: "This action can not be reversed!"
                });
                if (res) {
                    const r = await $fetch(`/webapi/paste/${uuid}`, {
                        method: "DELETE",
                        credentials: "include"
                    });
                    
                    await this.refresh();

                    this.pastes = this.pasteData.value.result;

                    for (let i = 0; i < this.pastes.length; i++) {
                        this.pastes[i].created = (new Date(this.pastes[i].created)).toLocaleDateString();
                    }

                    this.$forceUpdate();
                }
            }
        },
        mounted() {
            document.title = `Quickpaste | ${this.userStore.username()}`
        }
    }
</script>