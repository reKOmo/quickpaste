<template>
    <div class="flex flex-col">
        <a
            :href="githubAdress"
            class="flex flex-row content-center justify-center bg-gradient-to-tr from-green to-orange rounded p-4 m-auto cursor-pointer"
        >
            <font-awesome-icon :icon="['fab', 'github']" size="2x" fixed-width/> <span class="h-min self-center text-shadow-sm">Sign up with Github</span>
        </a>
    </div>
</template>

<script>
const clientId = "ed4a6c3a698773e1826d";
export default {
    data() {
        return {
            githubAdress: `https://github.com/login/oauth/authorize?scope=read:user&client_id=${clientId}&redirect_uri=http://localhost:3000/user/login/github`
        }
    }
}
</script>

<style>
</style>