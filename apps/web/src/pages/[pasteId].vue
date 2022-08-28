<template>
    <div v-if="paste">
        <PasteEditor v-if="pastePostingState == 0" @submit="rePaste" class="m-auto" :class="{'max-w-4xl': !editMode}" :paste="paste" :editable="editMode" submitText="Re-Paste !" />
        <div v-else-if="pastePostingState == 1" class="flex flex-row justify-center items-center mt-12">
            <iframe width="300" height="300" src="../assets/animated/logo-paste-loading.svg" alt="Loading"></iframe>
            <div class="bg-gradient-to-tr from-green to-orange rounded p-6 h-min">
                <h2 class="text-2xl font-bold">Creating paste</h2>
            </div>
        </div>
        <div v-else class="flex flex-row justify-center items-center mt-12">
            <iframe width="300" height="300" src="../assets/animated/logo-paste-created.svg" alt="Created"></iframe>
            <div class="doneText bg-gradient-to-tr from-green to-orange rounded p-6 h-min">    
                <h2 class="text-2xl font-bold">Paste created!</h2>
                <h3> 
                    Check it at: <a class="font-bold" :href="`/${createdPaste.pasteId}`">{{createdPaste.pasteId}}</a>
                </h3>
            </div>
        </div>
    </div>
    <div v-else-if="err == 401" class="flex flex-col items-center space-y-4">
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
</template>

<script setup>
    import { useHead } from "#app";
    import { useUserStore } from "../store/user";
    import { useNotificationStore } from "../store/notification";
    const userStore = useUserStore();
    const notificationStore = useNotificationStore();

    const {data: paste, error} = await useAsyncData("paste", async (ctx) => {
        const router = useRouter();
        const pasteId = router.currentRoute.value.params.pasteId
    
        const cookieKey = useRequestHeaders(["cookie"]).cookie;
        const cookies = {};
        cookieKey.split(";").forEach(frag => {
            const a =frag.split("=");
            cookies[a[0]] = a[1];
        });

        const res = await $fetch(`${useRuntimeConfig().internalGatewayAddress}/api/paste/${pasteId}`, {
            headers: {
                "Authorization": "ApiKey " + cookies.quickpaste_auth
            },
            parseResponse: JSON.parse
        })


        return res
    }, {
        server: true
    });

    if (paste.value && process.server) {   
        useHead({
            title: "Quickpaste | " + paste.value.title.substring(0, 25)
        })
    }

    if (error.value) console.log(error.value);

    const {data: err} = await useAsyncData("error", () => error.value ? error.value.response.status : 200, { server: true });
</script>

<script>
    export default {
        data() {
            return {
                editMode: false,
                password: "",
                pastePostingState: 0,
                createdPaste: undefined
            }
        },
        mounted() {
            this.checkEditMode();
        },
        methods: {
            checkEditMode() {
                if (this.userStore.user() == undefined) return;
                if (!this.paste) return;
                if (this.paste.owner.id != this.userStore.id()) return;
                if (this.$route.query["edit"]) this.editMode = true;
            },
            async rePaste(paste) {
                this.pastePostingState = 1;

                const headers = {
                    "Content-Type": "application/json"
                };

                if (this.password.length != 0) {
                    headers["Paste-Authorization"] = this.password;
                }


                const res = await fetch(`/webapi/paste/${this.$route.params["pasteId"]}`, {
                    method: "PUT",
                    headers,
                    credentials: "include",
                    body: JSON.stringify(paste)
                });

                if (res.ok) {
                    this.pastePostingState = 2;
                    this.createdPaste = (await res.json()).result;
                } else {
                    //TODO
                }
            },
            async reloadPaste() {
                if (this.password.length === 0) {
                    this.notificationStore.addNotification({
                        type: 1,
                        title: "Please enter password to enter",
                        level: 1
                    });
                return;
                }

                const res = await fetch(`/webapi/paste/${this.$route.params["pasteId"]}`, {
                    method: "GET",
                    headers: {
                        "Paste-Authorization": this.password
                    },
                    credentials: "include",
                });

                if (res.ok) {
                    this.paste = await res.json();
                    if (this.password.length != 0) {
                        this.paste["password"] = this.password;
                    }
                    this.checkEditMode();
                    document.title = "Quickpaste | " + this.paste.title.substring(0, 25);
                } else {
                    switch (res.status) {
                        case 401:
                            this.notificationStore.addNotification({
                                type: 1,
                                title: "Incorrect password",
                                level: 1
                            });
                            break;
                    }
                    this.password = "";
                    this.err = res.status;
                }


            }
        }
    }
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