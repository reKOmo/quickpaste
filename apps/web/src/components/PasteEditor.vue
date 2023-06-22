<template>
    <div class="flex flex-col" :class="{ 'lg:flex-row-reverse': editable }">
        <SideMenu v-if="editable" @submit="createPaste" ref="side-menu" class="mb-4 side-menu" :options="paste"
            :submitText="submitText" :loggedIn="loggedIn" />
        <div v-else
            class="sticky z-10 top-0 flex flex-col md:flex-row justify-between content-center text-center bg-gradient-to-tr from-green to-orange mb-4 p-4 rounded md:mr-2">
            <h1 class="text-3xl text-white text-shadow-sm">
                {{ paste.title }} <span class="text-lg text-black text-shadow-none">by {{ paste.owner.username }}</span>
                <span class="text-sm mb-1 text-dark-700">
                    <font-awesome-icon v-if="paste != undefined && paste.isPrivate" :icon="['fas', 'fa-eye-slash']"
                        class="ml-2" />
                    <font-awesome-icon v-if="paste != undefined && paste.password" :icon="['fas', 'fa-lock']"
                        class="ml-2" />
                </span>
            </h1>
            <h2 class="h-min self-center">Created on <ClientOnly>{{ paste.created }}</ClientOnly>
            </h2>
        </div>
        <div ref="editor-conteiner"
            class="flex flex-col min-w-xs w-full editor lg:mr-8 pr-4 overflow-x-hidden md:overflow-y-auto md:max-h-2xl">
            <div>
                <div v-if="paste">
                    <SnippetEditor ref="snippet" v-for="(post, index) in paste.fragments" :key="index" :value="post"
                        :editable="editable" class="mb-8" />
                </div>
                <div v-else>
                    <SnippetEditor ref="snippet" v-for="id in snippets" :key="id" :editable="editable" class="mb-8" />
                </div>
            </div>
            <div v-if="editable" class="w-full px-4 flex justify-center space-x-4">
                <button v-if="(loggedIn && snippetAmount() < 500) || snippetAmount() < 5" v-on:click="addSnippet"
                    class="bg-green sm:px-10 flex-1 md:max-w-xs rounded py-2 hover:shadow-lg">Add snippet</button>
                <button v-if="snippetAmount() > 1" ref="remove" v-on:click="removeSnippet"
                    class="bg-red-500 sm:px-10 flex-1 md:max-w-xs rounded py-2 hover:shadow-lg hide">Remove last
                    snippet</button>
            </div>
        </div>
    </div>
</template>

<script>
export default {
    emits: ["submit"],
    props: {
        editable: {
            type: Boolean,
            default: () => true
        },
        paste: {
            type: Object
        },
        submitText: {
            type: String,
        },
        loggedIn: {
            type: Boolean,
            default: () => false
        }
    },
    data() {
        return {
            snippets: [0]
        }
    },
    mounted() {
        if (this.paste) {
            this.paste.created = (new Date(this.paste.created)).toLocaleDateString();
        }
    },
    methods: {
        scrollSnippets() {
            setTimeout(() => {
                const cont = this.$refs["editor-conteiner"];
                cont.scrollTo({
                    top: cont.scrollHeight,
                    behavior: "smooth"
                });
            }, 10);
        },
        snippetAmount() {
            return this.paste ? this.paste.fragments.length : this.snippets.length;
        },
        createPaste(options) {
            let fragments = [];
            this.$refs["snippet"].forEach(s => fragments.push(s.getValue()));

            const paste = {};
            Object.assign(paste, options);

            paste["fragments"] = fragments;

            this.$emit("submit", paste);
        },
        addSnippet() {
            const target = this.paste ? this.paste.fragments : this.snippets;
            const newSnippet = this.paste ? target.length[target.length - 1] + 1 : undefined;
            if ((this.loggedIn && target.length < 500) || target.length < 5) {
                target.push(newSnippet);
            }
            this.scrollSnippets()
        },
        removeSnippet() {
            const target = this.paste ? this.paste.fragments : this.snippets;
            target.pop();
            this.scrollSnippets()
        }
    }
}

</script>