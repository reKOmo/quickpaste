<template>
    <div class="mt-2 w-full lg:w-2xl">
        <div class="flex flex-row lg:flex-col space-x-2 lg:space-x-0 lg:space-y-2">
            <input v-model="title" maxlength="50" tooltip="Click to edit" placeholder="Add paste title" class="p-2 text-center text-white rounded placeholder-white-100 border-none
                  focus:outline-none text-lg text-bold flex-1 bg-darkgray" />
            <!-- <HCaptcha></HCaptcha> -->
            <button @click="submit"
                class="accept bg-gradient-to-tr from-green to-orange rounded w-1/4 lg:w-full p-2 text-center hover:shadow-lg">{{
                    submitText }}</button>
        </div>
        <div class="flex flex-col justify-center">
            <a @click="toggleMenu"
                class="select-none font-bold bg-clip-text text-lg m-2 text-transparent bg-gradient-to-tr from-green to-orange text-center cursor-pointer">
                Options
                <span class="text-green ml-2">
                    <font-awesome-icon :icon="['fas', 'fa-caret-down']" :rotation="rotation" />
                </span>
            </a>
            <div ref="moreOptionsMenu"
                class="overflow-hidden hidden px-4 py-4 text-xl px-4 bg-blue rounded shadow-md shadow-black/50">
                <div class="w-full flex items-center">
                    <label class="w-1/3">Private</label>
                    <input v-model="priv" :disabled="!loggedIn" type="checkbox"
                        class="h-4 w-4 rounded border-3 border-black bg-darkgray accent-darkgray text-blue">
                    <span class="text-sm text-gray-500 px-4">Logged in users only</span>
                </div>
                <div class="w-full flex items-center">
                    <label class="w-1/3">Password</label>
                    <input v-model="password" type="password"
                        class="p-px text-center text-white rounded border-none focus:outline-none text-lg text-bold bg-darkgray flex-1">
                </div>
            </div>
        </div>
    </div>
</template>

<script>
export default {
    data() {
        return {
            title: this.options !== undefined ? this.options.title : "",
            priv: this.options !== undefined ? this.options.isPrivate : false,
            password: this.options !== undefined && this.options.password.length > 0 ? this.options.password : "",
            rotation: 0
        }
    },
    props: {
        submitText: {
            type: String,
            default: () => "Paste !"
        },
        options: {
            type: Object
        },
        loggedIn: {
            type: Boolean,
            default: () => false
        }
    },
    methods: {
        submit() {
            this.$emit('submit', {
                title: this.title,
                isPrivate: this.priv,
                password: this.password
            })
        },
        toggleMenu() {
            this.$refs["moreOptionsMenu"].classList.toggle("hidden");
            this.rotation = this.rotation === 0 ? 180 : 0;
        }
    }
}
</script>

<style scoped>
button.accept {
    background-size: 250%;
    background-position: 100%;
    transition: ease-in-out 0.1s;
}

button.accept:hover {
    background-position: 0%;
}
</style>