<template>
    <div class="flex flex-col">
        <NuxtLink :external="true" :href="githubAdress"
            class="flex flex-row content-center justify-center bg-gradient-to-tr from-green to-orange rounded p-4 m-auto cursor-pointer">
            <span>
                <font-awesome-icon :icon="['fab', 'github']" size="2x" fixed-width />
            </span>
            <span class="h-min self-center text-shadow-sm">Continue with Github</span>
        </NuxtLink>
    </div>
</template>

<script setup lang="ts">
    import { useNotificationStore, NotificationTypes } from '@/store/notification';
    const config = useRuntimeConfig().public;
    const githubAdress = `https://github.com/login/oauth/authorize?scope=read:user&client_id=${config.githubClientId}&redirect_uri=${config.webAddress}/user/login/github`
    const notificationStore = useNotificationStore();
    const route = useRoute()

    onMounted(() => {
        const failedLogin = route.query.failedLogin;
            document.title = "Quickpaste";

            if (failedLogin) {
                notificationStore.addNotification({
                    type: NotificationTypes.NOTIFICATION,
                    level: 1,
                    title: "Failed to login. Please try again"
                })
            }
    });
</script>

<style></style>