<template>
    <teleport to="body">
        <transition name="fade">
            <div v-if="confirm.show || alert.show" class="absolute z-10 top-0 w-screen h-screen flex justify-center items-center backdrop-filter backdrop-blur-sm shadow-lg bg-zinc-900/50">
                <transition name="confirm" appear>
                    <NotificationsConfirm class="notification" v-if="confirm.show" @decision="alertDone" :title="confirm.notification.title" :description="confirm.notification.description"/>
                </transition>
            </div>
        </transition>
        <div class="absolute flex flex-col w-xs sm:w-sm h-3/4 z-60 right-0 justify-end pointer-events-none overflow-hidden">
            <transition-group name="fade2">
                <NotificationsToast v-for="noti in notifications.slice().reverse()" :key="noti.id" :title="noti.title" :desc="noti.description" :level="noti.level"/>
            </transition-group>
        </div>
    </teleport>
</template>

<script setup>
    import {useNotificationStore} from "~/store/notification";
    
    const notificationStore = useNotificationStore()

    const confirm = {
        show: false,
        notification: undefined
    }
    const alert = {
        show: false,
        notification: undefined
    }
    const notifications= [];

    function alertDone(val) {
        notificationStore.alerts[0].done(val);
        notificationStore.shiftAlert();

        showAlerts();
    }
    function showAlerts() {
        if (notificationStore.getAlerts().length > 0) {
            confirm.show = true;
            confirm.notification = notificationStore.getAlerts()[0];
        } else {
            confirm.show = false;
            confirm.notification = undefined;
        }
    }
    function showNotifications() {
        notifications = notificationStore.getNotifications();
        setTimeout(notificationStore.shiftNotification, 2500);
    }

    if (process.client) {
        notificationStore.$subscribe((mutation, state) => {
            showAlerts();
            showNotifications();
        });
    }
</script>

<style scoped>
    .confirm-enter-from {
        opacity: 0;
        transform: scale(0);
    }
    .confirm-enter-to {
        opacity: 1;
        transform: scale(1);
    }
    .confirm-enter-active {
        transition: all 0.2s ease-in;
    }

    .fade-enter-from {
        opacity: 0;
    }
    .fade-enter-to {
        opacity: 1;
    }
    .fade-enter-active {
        transition: all 0.2s ease-in;
    }

    .fade2-enter-from {
        opacity: 0;
    }
    .fade2-enter-to {
        opacity: 1;
    }
    .fade2-enter-active {
        transition: all 0.1s ease-in;
    }

    .fade2-leave-from {
        transform: translateX(0);
        opacity: 1;
    }
    .fade2-leave-to {
        transform: translateX(200%);
        opacity: 0;
    }
    .fade2-leave-active {
        transition: all 0.2s ease-in;
    }
</style>