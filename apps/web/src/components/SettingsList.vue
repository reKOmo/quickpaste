<template>
    <h2 class="text-3xl border-b-1 border-black pb-2 mb-4">Settings</h2>
    <ul>
        <li v-for="(option, index) in options" :key="index" @click="pick(option)" class="text-lg hover:text-gray-200 transition cursor-pointer">{{option.name}}</li>
    </ul>
</template>

<script>
    export default {
        emits: ["picked"],
        props: {
            options: {
                type: Object,
                default: () => {}
            }
        },
        methods: {
            pick(op) {
                this.$emit("picked", op);
            }
        }
    }
</script>