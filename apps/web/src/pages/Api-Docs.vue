<template>
    <div class="flex flex-row w-full relative">
        <div ref="tabOfContents" class="sticky hidden lg:block top-8 h-min mr-8 p-4 mt-8">
            <h2 class="text-2xl bg-clip-text text-transparent bg-gradient-to-tr from-green to-orange mb-4 font-bold">
                Table of contents</h2>
            <ul class="text-md bg-blue rounded">
                <li v-for="(chapter, index) in chapters" :key="index"
                    class="py-2 pl-4 transform hover:translate-x-6 hover:text-red-500 word-break max-w-3/4"><a
                        :href="`#${chapter.id}`">{{ chapter.title }}</a></li>
            </ul>
        </div>
        <div ref="docs" class="article text-gray-100 w-full lg:w-3/4">
            <ApiDocRenderer></ApiDocRenderer>
        </div>
    </div>
</template>

<script lang="ts">
import Prism from '@/plugins/prismjs.client';

export default {
    data(): { chapters: Array<{ id: string, title: string }> } {
        return {
            chapters: []
        };
    },
    mounted() {
        Prism.highlightAll();

        const headers = (this.$refs['docs'] as HTMLDivElement).getElementsByTagName('h2');
        for (let i = 0; i < headers.length; i++) {
            this.chapters.push({
                title: headers[i].innerText,
                id: headers[i].id
            });
        }
    },
}
</script>