<template>
    <div v-html="parsedMarkdown" ref="guide"></div>
</template>

<script setup lang="ts">
import { marked } from "marked";

const nuxtApp = useNuxtApp()
//@ts-ignore
const doc = await nuxtApp.$loadFile('api.md');
const parsedMarkdown = marked.parse(doc);
</script>


<style scoped>
li {
    -webkit-transition-timing-function: cubic-bezier(0.4, 0, 0.2, 1);
    -o-transition-timing-function: cubic-bezier(0.4, 0, 0.2, 1);
    transition-timing-function: cubic-bezier(0.4, 0, 0.2, 1);
    -webkit-transition-duration: 150ms;
    -o-transition-duration: 150ms;
    transition-duration: 150ms;
}
</style>