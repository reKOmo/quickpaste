<template>
    <Head>
        <Title>Quickpaste</Title>
    </Head>
    <div class="bg-bg min-h-screen flex flex-col">
        <MyNavigation/>
        <NotificationsManager/>
        <NuxtLayout name="default">
            <NuxtPage/>
        </NuxtLayout>
        <Footer class="mt-auto"/>
    </div>
</template>

<script setup>
    //set session cookie
    if (process.server) {
        const key = useCookie("quickpaste_auth", {
            httpOnly: true
        });
        if (key.value === undefined) {
            key.value = (await useFetch(useRuntimeConfig().authServiceAddress + "/keys/generate")).data.value.result;
        }
    }
</script>