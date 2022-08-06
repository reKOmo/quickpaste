<template>
    <div v-if="paste">
        <PasteEditor @submit="rePaste" class="m-auto" :class="{'max-w-4xl': !editMode}" :paste="paste" :editable="editMode" submitText="Re-Paste !" />
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

        const res = await $fetch(`http://localhost:8080/api/paste/${pasteId}`, {
            headers: {
                "Authorization": "APIKey " + cookies.quickpaste_auth
            },
            parseResponse: JSON.parse
        })

        return res
    }, {
        server: true
    });

    if (paste.value) {    
        useHead({
            title: "Quickpaste | " + paste.value.title.substring(0, 25)
        })
    }

    const {data: err} = await useAsyncData("error", () => error.value.response.status, { server: true });
</script>

<script>
    export default {
        data() {
            return {
                editMode: false,
                password: ""
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
                const res = await fetch(`/webapi/paste/${this.$route.params["pasteId"]}`, {
                    method: "PUT",
                    headers: {
                        "Content-Type": "application/json"
                    },
                    credentials: "include",
                    body: JSON.stringify(paste)
                }); 

                const data = await res.text();

                console.log(data);
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


            },
            pushNot() {
                console.log("a");
                
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