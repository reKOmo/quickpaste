<template>
    <teleport to="body">
        <transition name="fade">
            <div v-if="confirm.show || alert.show" class="fixed top-0 w-screen h-screen flex justify-center items-center backdrop-filter backdrop-blur-sm shadow-lg bg-zinc-900/50">
                <transition name="confirm" appear>
                    <NotificationsConfirm class="notification" v-if="confirm.show" @decision="alertDone" :title="confirm.notification.title" :description="confirm.notification.description"/>
                </transition>
            </div>
        </transition>
    </teleport>
</template>

<script setup>
    import {useNotificationStore} from "~/store/notification";
    
    const notificationStore = useNotificationStore()
</script>

<script>
    export default {
        data() {
            return {
                confirm: {
                    show: false,
                    notification: undefined
                },
                alert: {
                    show: false,
                    notification: undefined
                }
            }
        },
        methods: {
            alertDone(val) {
                this.notificationStore.alerts[0].done(val);
                this.notificationStore.shiftAlert();

                this.showAlerts();
            },
            showAlerts() {
                if (this.notificationStore.getAlerts().length > 0) {
                    this.confirm.show = true;
                    console.log(this.notificationStore.getAlerts()[0])
                    this.confirm.notification = this.notificationStore.getAlerts()[0];
                } else {
                    this.confirm.show = false;
                    this.confirm.notification = undefined;
                }
            }
        },
        mounted() {
            this.notificationStore.$subscribe((mutation, state) => {
                this.showAlerts();
            });
        }
    }
</script>

<style>
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
</style>