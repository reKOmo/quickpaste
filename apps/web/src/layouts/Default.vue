<template>
    <div class="flex justify-center">
        <div class="relative container w-screen-xl mx-4 my-2 rounded p-4 border-content">
            <slot/>
        </div>
    </div>
</template>

<script setup>
    const route = useRoute()
    const title = route.meta.title != undefined ? "Quickpaste | " + route.meta.title : "Quickpaste"
    useHead({
        meta: [{ name: 'og:title', content: title }]
    }) 
</script>