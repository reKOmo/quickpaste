<script setup>
    import { useUserStore } from "../store/user";
    const userStore = useUserStore();

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

    let err = undefined;

    console.log(error);

    if (paste.value) {    
        useHead({
            title: "Quickpaste | " + paste.value.title.substring(0, 25)
        })
    } else {
        if (process.server)
            err = error.value.response.status
    }
</script>

<script>
    export default {
        data() {
            return {
                editMode: false,
            }
        },
        mounted() {
            if (this.userStore.user() == undefined) return;
            if (this.paste.owner.id != this.userStore.id()) return;
            if (this.$route.query["edit"]) this.editMode = true;
        },
        methods: {
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
            }
        }
    }
</script>

<template>
    <div v-if="paste">
        <PasteEditor @submit="rePaste" class="m-auto" :class="{'max-w-4xl': !editMode}" :paste="paste" :editable="editMode" submitText="Re-Paste !" />
    </div>
    <div v-else>
        <div class="flex flex-col justify-center content-center text-center bg-gradient-to-tr from-green to-orange mb-4 p-4 rounded">
            <h1 class="text-3xl text-white text-shadow-sm">
                No paste to be found
            </h1>
            <h2 class="text-black text-6xl text-shadow-none">{{err}}</h2>
        </div>
    </div>
</template>