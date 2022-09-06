<template>
    <div class="flex flex-col">
        <p class="ml-2 mb-4 text-gray-200">Click button below to delete your account.</p>
        <div class="flex flex-row bg-darkgray rounded p-4 text-gray-200 shadow-black shadow-sm my-2 max-w-sm mx-auto">
            <div class="flex justify-center items-center mr-2">
                <font-awesome-icon :icon="['fas', 'fa-circle-exclamation']" size="xl" fixed-width class="text-red-500"/>
            </div>
            <div class="flex flex-col">
                <p class="text-md">DELETING YOUR ACCOUNT WILL ALSO DELETE ALL PASTES THAT YOU CREATED PERMANENTLY WITHOUT A WAY OF RECOVERING THEM</p>
            </div>
        </div>
        <div class="mt-4 flex">
            <button @click="deleteAccount" class="m-auto bg-red-500 rounded p-4 text-center text-lg hover:shadow-lg my-4">Delete account</button>
        </div>
    </div>
</template>

<script setup>
    import { NotificationTypes, useNotificationStore } from '@/store/notification';    
    const notificationStore = useNotificationStore();
</script>

<script>
    export default {
        methods: {
            async deleteAccount() {
                const proceed = await this.notificationStore.addNotification({
                    type: NotificationTypes.CONFIRM,
                    title: "Are you sure you want to delete your account?",
                    description: "This action can not be undone and will result in permanent data loss!"
                });

                if (proceed) {
                    const res = await fetch("/user/deleteAccount", {
                        method: "GET",
                        credentials: "include",
                        redirect: "follow"
                    });

                    if (res.redirected) {
                        window.location = "/";
                    } else if (!res.ok) {
                        this.notificationStore.addNotification({
                            type: NotificationTypes.NOTIFICATION,
                            title: "Error accoured while deleting account. Please try again",
                        });
                    }
                }
            }
        }
    }
</script>