<template>
    <div class="bg-gradient-to-tr from-green to-orange rounded p-4 flex flex-col justify-center items-center mb-px-60">
        <h2 class="text-xl font-bold">{{title}}</h2>
        <p>{{description}}</p>
        <div class="mt-4">
            <button @click="resolve(false)" class="rounded bg-red-600 mr-4 p-2 w-16 shadow-lg hover:shadow-none">{{denytext}}</button>
            <button @click="resolve(true)" class="rounded bg-green p-2 w-16 shadow-lg hover:shadow-none">{{accepttext}}</button>
        </div>
    </div>
</template>

<script>
    export default {
        emits: ["decision"],
        props: {
            title: {
                type: String,
                required: true
            },
            description: {
                type: String,
                default() {
                    return "";
                }
            },
            accepttext: {
                type: String,
                default() {
                    return "Yes"
                }
            },
            denytext: {
                type: String,
                default() {
                    return "No"
                }
            }
        },
        methods: {
            resolve(value) {
                this.$emit("decision", value);
            }
        }
    }
</script>