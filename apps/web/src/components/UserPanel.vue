<template>
    <div class="bg-gradient-to-tr from-green to-orange rounded p-4 mr-12 w-full md:w-1/4 md:max-h-md md:min-h-sm mt-2">
            <div class="border-b border-black mb-4">
                <ClientOnly>
                    <h2 class="text-4xl">{{userStore.username()}}</h2>
                    <p>Joined: {{userStore.userData.joined}}</p>
                </ClientOnly>
            </div>
            <ul class="flex flex-row gap-x-2 md:flex-col">
                <li class="hover:text-gray-200 py-1">
                    <NuxtLink to="/user">Pastes</NuxtLink>
                </li>
                <li class="hover:text-gray-200 py-1">
                    <NuxtLink to="/user/settings">Settings</NuxtLink>
                </li>
            </ul>
        </div>
</template>

<script setup>
    import { useUserStore } from "@/store/user";

    const router = useRouter();
    const loggedIn = useCookie("logged_in").value;
    if (loggedIn != "1") {
        router.replace("/");
    }

    const userStore = useUserStore();
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