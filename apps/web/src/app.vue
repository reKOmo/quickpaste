<template>
    <Head>
        <Title>Quickpaste</Title>
    </Head>
    <div class="bg-bg min-h-screen">
        <MyNavigation/>
        <NuxtLayout name="default">
            <NuxtPage/>
        </NuxtLayout>
    </div>
</template>

<script setup>
    //set session cookie
    if (process.server) {
        const key = useCookie("quickpaste_auth", {
            httpOnly: true
        });
        console.log(key.value);
        if (key.value === undefined) {
            console.log("getting new key")
            key.value = (await useFetch("http://localhost:4001/keys/generate")).data.value.result;
        }
    }
</script>