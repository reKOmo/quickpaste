<template>
    <div class="flex flex-row bg-darkgray rounded p-4 text-gray-200 shadow-black shadow-md mx-4 my-2 max-w-sm">
        <div class="flex justify-center items-center mr-2">
            <font-awesome-icon v-if="level == 0" :icon="['fas', 'fa-circle-info']" size="xl" fixed-width class="text-blue"/>
            <font-awesome-icon v-else-if="level == 1" :icon="['fas', 'fa-circle-exclamation']" size="xl" fixed-width class="text-red-500"/>
        </div>
        <div class="flex flex-col">
            <p class="text-lg">{{title}}</p>
            <p class="text-sm">{{desc}}</p>
        </div>
    </div>
</template>


<script>
    export default {
        props: {
            title: {
                type: String,
            },
            desc: {
                type: String,
                default: () => ""
            },
            level: {
                type: Number,
                default: () => 0
            }
        }
    }
</script>