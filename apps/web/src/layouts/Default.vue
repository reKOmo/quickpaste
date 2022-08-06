<template>
    <div class="flex justify-center mb-8">
        <div class="relative container sm:w-screen-xl mx-4 p-8 border-content bg-bgdark">
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