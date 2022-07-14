<template>
    <div class="flex flex-col space-y-2 mt-2 w-md">
        <input v-model="title" maxlength="50" tooltip="Click to edit" placeholder="Add paste title +"
             class="p-2 text-center text-white rounded placeholder-white-100 border-none
              focus:outline-none text-lg text-bold"/>
        <button @click="submit" class="accept bg-gradient-to-tr from-green to-orange rounded p-2 text-center hover:shadow-lg">Paste !</button>
    </div>
</template>

<script>
    export default {
        data() {
            return {
                title: ""
            }
        },
        methods: {
            submit() {
                this.$emit('submit', {
                    title: this.title
                })
            }
        }
    }
</script>

<style scoped>
    input {
        background-color: #363636;
    }

    button.accept {
        background-size: 250%;
        background-position: 100%;
        transition: ease-in-out 0.1s;
    }

    button.accept:hover {
        background-position: 0%; 
    }

</style>