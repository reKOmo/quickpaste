<template>
    <div>
        <div v-if="paste">
            <PasteEditor v-if="pastePostingState == 0" @submit="rePaste" :paste="paste" :editable="editMode" submitText="Re-Paste !" />
            <div v-else-if="pastePostingState == 1" class="flex flex-row justify-center items-center mt-12">
                <object width="300" height="300" type="image/svg+xml" :data="svg1">
                    <img ref="img0" src="@/assets/animated/logo-paste-loading.svg" />
                </object>
                <div class="bg-gradient-to-tr from-green to-orange rounded p-6 h-min hidden md:block">
                    <h2 class="text-2xl font-bold">Creating paste</h2>
                </div>
            </div>
            <div v-else class="flex flex-row justify-center items-center mt-12">
                <object class="w-100px sm:w-150px md:w-300px" type="image/svg+xml" :data="svg2">
                        <img ref="img1" src="@/assets/animated/logo-paste-created.svg" />
                </object>
                <div class="doneText bg-gradient-to-tr from-green to-orange rounded p-6 h-min">    
                    <h2 class="text-2xl font-bold">Paste created!</h2>
                    <h3> 
                        Check it at: <a class="font-bold" :href="`/${createdPaste?.pasteId}`">{{createdPaste?.pasteId}} <font-awesome-icon :icon="['fas', 'arrow-up-right-from-square']" /></a>
                    </h3>
                </div>
            </div>
        </div>
        <div v-else>
            <div v-if="err == 401" class="flex flex-col items-center space-y-4">
                <h2 class="text-xl text-gray-300">Enter password to view the paste</h2>
                <div class="flex flex-col md:flex-row space-y-2 md:space-y-0">
                    <input @keyup.enter="reloadPaste" v-model="password" type="password" autocomplete="off" class="p-2 w-full md:w-auto text-center text-white rounded border-none focus:outline-none text-lg text-bold bg-darkgray mr-4"/>
                    <button @click="reloadPaste" class="bg-gradient-to-tr from-green to-orange rounded p-2 text-center hover:shadow-lg">Enter</button>
                </div>
            </div>
            <div v-else>
                <div class="flex flex-col justify-center content-center text-center bg-gradient-to-tr from-green to-orange mb-4 p-4 rounded">
                    <h1 class="text-3xl text-white text-shadow-sm">
                        No paste here
                    </h1>
                </div>
            </div>
        </div>
    </div>
</template>

<script setup>
    import { useHead } from "#app";
    import { useUserStore } from "../store/user";
    import { useNotificationStore, NotificationTypes } from "../store/notification";
    import svg1 from '@/assets/animated/logo-paste-loading.svg';
    import svg2 from '@/assets/animated/logo-paste-created.svg';
    const userStore = useUserStore();
    const notificationStore = useNotificationStore();

    let {data: pasteData, error} = await useAsyncData("paste", async (ctx) => {
        const route = useRoute();
        const pasteId = route.params.pasteId;
    
        const cookieKey = useRequestHeaders(["cookie"]).cookie;
        const cookies = {};
        if (cookieKey) {
            cookieKey.split(";").forEach(frag => {
                const a = frag.split("=");
                cookies[a[0].trim()] = a[1];
            });

            const res = await $fetch(`${useRuntimeConfig().public.webAddress}/api/paste/${pasteId}`, {
                headers: {
                    "Authorization": "ApiKey " + cookies.quickpaste_auth
                },
                parseResponse: JSON.parse
            });

            return res;
        } else {
            return undefined;
        }
    }, {
        server: true
    });

    let paste = ref(pasteData);

    if (paste.value && process.server) {   
        useHead({
            title: "Quickpaste | " + paste.value.title.substring(0, 25)
        })
    }

    let {data: err} = await useAsyncData("error", () => error.value ? error.value.response.status : 200, { server: true });

    let editMode = ref(false);
    const route = useRoute();
    let password = ref("");
    
    function checkEditMode() {
        if (userStore.user() == undefined) return;
        if (paste.value == undefined) return;
        if (paste.value.owner.id != userStore.id()) return;
        const route = useRoute();
        if (route.query["edit"]) editMode.value = true;
    }

    async function reloadPaste() {
        if (password.value.length === 0) {
            notificationStore.addNotification({
                type: 1,
                title: "Please enter password to view",
                level: 1
            });
            return;
        }

        const res = await fetch(`/api/paste/${route.params["pasteId"]}`, {
            method: "GET",
            headers: {
                "Paste-Authorization": password.value
            },
            credentials: "include",
        });

        if (res.ok) {
            paste.value = await res.json();
            err = 0;
            if (password.value.length != 0) {
                paste.value["password"] = password.value;
            }
            checkEditMode();
            document.title = "Quickpaste | " + paste.value.title.substring(0, 25);
        } else {
             switch (res.status) {
                 case 401:
                    notificationStore.addNotification({
                        type: 1,
                        title: "Incorrect password",
                        level: 1
                    });
                    break;
            }
            password.value = "";
            err = res.status;
        }
    }

    let pastePostingState = ref(0);
    let createdPaste = ref(undefined);

    const rePaste = async (p) => {
        pastePostingState.value = 1;
        paste.value = p;

        const headers = {
            "Content-Type": "application/json"
        };

        if (password.value.length != 0) {
            headers["Paste-Authorization"] = password.value;
        }


        const res = await fetch(`/api/paste/${route.params["pasteId"]}`, {
            method: "PUT",
            headers,
            credentials: "include",
            body: JSON.stringify(p)
        });

        const data = await res.json();

        if (res.ok) {
            pastePostingState.value = 2;
            createdPaste.value = data.result;
        } else {
            pastePostingState.value = 0;
            if (data.result.includes("title")) {
                //paste title
                notificationStore.addNotification({
                    title: "Paste title is missing",
                    type: NotificationTypes.NOTIFICATION,
                    level: 1
                });
            } else if (data.result.includes("name")) {
                //fragement title
                notificationStore.addNotification({
                    title: "One or more fragments are missing a title",
                    type: NotificationTypes.NOTIFICATION,
                    level: 1
                });
            } else if (data.result.includes("content")) {
                //fragment content is empty
                notificationStore.addNotification({
                    title: "One or more fragments are missing content",
                    description: "Please deleate them, or add missing content",
                    type: NotificationTypes.NOTIFICATION,
                    level: 1
                });
            } else {
                // other
                notificationStore.addNotification({
                    title: "Error accured when creating the paste",
                    description: "Please try again.",
                    type: NotificationTypes.NOTIFICATION,
                    level: 1
                });
            }
        }
    }

    if (process.client) {
        if (paste.value) {
            document.title = "Quickpaste | " + paste.value.title.substring(0, 25);
        }
    }

    onMounted(() => {
        checkEditMode();
    })
</script>

<style scoped>
    input:after {
        content: "wow";
        color: white;
        font-size: 1em;
        position:absolute;
        top: 0;
        width: 100%;
        height: 100%;
    }
</style>