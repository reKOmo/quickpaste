<template>
    <Head>
        <Title>Quickpaste</Title>
    </Head>
    <div class="bg-bg min-h-screen flex flex-col">
        <MyNavigation />
        <NotificationsManager />
        <NuxtLayout>
            <NuxtPage />
        </NuxtLayout>
        <Footer class="mt-auto" />
    </div>
</template>

<script setup>
//set session cookie
if (process.server) {
    const key = useCookie("quickpaste_auth", {
        httpOnly: true
    });
    if (key.value === undefined) {
        const res = await fetch(useRuntimeConfig().authServiceAddress + "/keys/generate");
        if (res.ok) {
            const data = await res.json();
            key.value = data.result;
        }
    }
}
</script>