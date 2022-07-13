<script setup>
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
    })

    let err = undefined;

    if (paste.value) {
        paste.value.created = (new Date(paste.value.created).toLocaleDateString());
    
        useHead({
            title: "Quickpaste | " + paste.value.title.substring(0, 25)
        })
    } else {
        if (process.server)
            err = error.value.response.status
    }
</script>

<template>
    <div v-if="paste">
        <div class="flex flex-row justify-between content-center text-center bg-gradient-to-tr from-green to-orange mb-4 p-4 rounded">
            <h1 class="text-3xl text-white text-shadow-sm">
                {{paste.title}} <span class="text-lg text-black text-shadow-none">by {{paste.owner.username}}</span>
            </h1>
            <h2 class="h-min self-center">Created on {{paste.created}}</h2>
        </div>
        <SnippetEditor ref="snippet" v-for="(post, index) in paste.fragments" :key="index" :value="post" :editable="false" class="mb-4"/>
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