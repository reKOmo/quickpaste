<template>
    <div class="flex flex-col">
        <p class="ml-2 mb-4 text-gray-200">After clicking the button a new API key will be generated and all previous ones will be deemd invalid.</p>
        <div class="flex flex-row bg-darkgray rounded p-4 text-gray-200 shadow-black shadow-sm my-2 max-w-sm mx-auto">
            <div class="flex justify-center items-center mr-2">
                <font-awesome-icon :icon="['fas', 'fa-circle-exclamation']" size="xl" fixed-width class="text-red-500"/>
            </div>
            <div class="flex flex-col">
                <p class="text-md">Please save the key after it is shown as you will not be able to retrieve it.</p>
            </div>
        </div>
        <div class="mt-4 flex">
            <div v-if="key" class="bg-darkgray rounded flex w-3/4 m-auto">
                <input ref="keyContainer" class="flex-1 text-monospace text-gray-200 bg-darkgray rounded border-none text-center p-2 max-w-2xl break-word overflow-x-scroll" :value="key" readonly/>
                <div @click="copyToClickboard" class="text-gray-200 p-2 text-xl flex justify-center items-center hover:text-orange transition cursor-pointer">
                    <font-awesome-icon :icon="['fa-solid', 'fa-copy']" />
                </div>
            </div>
            <button v-else @click="getNewKey" class="m-auto bg-gradient-to-tr from-green to-orange rounded p-4 text-center text-lg hover:shadow-lg my-4">Generate key</button>
        </div>
    </div>
</template>

<script setup>
    import { NotificationTypes, useNotificationStore } from '@/store/notification';    
    const notificationStore = useNotificationStore();

    const keyContainer = ref(null);

    const copyToClickboard = () => {
        keyContainer.select();
        document.execCommand("copy");

        notificationStore.addNotification({
            type: NotificationTypes.NOTIFICATION,
            level: 0,
            title: "Copied!"
        })
    }
</script>

<script>
    export default {
        data() {
            return {
                key: undefined
            }
        },
        methods: {
            async getNewKey() {
                const res = await fetch("/user/generatePermaKey", {
                    method: "GET",
                    credentials: "include"
                });

                if (res.ok) {
                    const data = await res.json();
                    this.key = data.result;
                } else {
                    //TODO
                }

            }
        }
    }
</script>