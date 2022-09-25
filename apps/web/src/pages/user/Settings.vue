<template>
    <div class="flex flex-col md:flex-row w-full justify-between">
        <UserPanel/>
        <div class="md:w-4/5">
            <div v-if="option">
                <div class="w-full flex justify-center items-center pt-2 text-xl border-b-1 border-black mb-2 text-gray-200">
                    <font-awesome-icon :icon="['fas', 'fa-arrow-left']" @click="changeOption(undefined)" class="mr-4 p-2 cursor-pointer text-black hover:text-orange transition"/>
                    <span>{{option.name}}</span>
                </div>
                <component :is="option.component"></component>
            </div>
            <SettingsList @picked="changeOption" :options="options" v-else />
        </div>
    </div>
</template>

<script setup>
    const generateApiKey = resolveComponent("GenerateApiKey");
    const deleteAccount = resolveComponent("DeleteAccount");

    const options = [
        {
            name: "Generate Api Key",
            component: generateApiKey,
        },
        {
            name: "Delete Account",
            component: deleteAccount,
        }
    ];
</script>

<script>
    export default {
        data() {
            return {
                option: undefined
            }
        },
        methods: {
            changeOption(o) {
                this.option = o;
            }
        }
    }
</script>