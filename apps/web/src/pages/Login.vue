<template>
    <div class="flex flex-col">
        <a :href="githubAdress" class="flex flex-row content-center justify-center bg-gradient-to-tr from-green to-orange rounded p-4 m-auto cursor-pointer">
            <font-awesome-icon :icon="['fab', 'github']" size="2x" fixed-width/> <span class="h-min self-center text-shadow-sm">Continue with Github</span>
        </a>
    </div>
</template>

<script setup>
    import { useNotificationStore, NotificationTypes } from '@/store/notification';
    const config = useRuntimeConfig().public;
    const githubAdress = `https://github.com/login/oauth/authorize?scope=read:user&client_id=${config.githubClientId}&redirect_uri=${config.webAddress}/user/login/github`
    const notificationStore = useNotificationStore();
</script>

<script>
    export default {
        mounted() {
            const failedLogin = this.$route.query.failedLogin;
            document.title = "Quickpaste";

            if (failedLogin) {
                this.notificationStore.addNotification({
                    type: NotificationTypes.NOTIFICATION,
                    level: 1,
                    title: "Failed to login. Please try again"
                })
            }
        }
    }
</script>

<style>
</style>