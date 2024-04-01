<template>
    <div class="w-full bg-zinc-600 text-gray-300 pt-4">
        <div class="flex flex-col space-y-2 items-center">
            <div>
                <ul class="flex flex-row space-x-8">
                    <li><a href="/">Home</a></li>
                    <li><a href="/api-docs">Api</a></li>
                    <li><a href="/user">User page</a></li>
                </ul>
            </div>
            <!-- <div>
                <ul class="flex flex-row lex-row space-x-8">
                    <li><a href="#">Privacy statement</a></li>
                    <li><a href="#">Terms of Service</a></li>
                    <li><a href="#">Cooies policy</a></li>
                </ul>
            </div> -->
        </div>
        <p class="text-center p-4 text-lg">Site by <a href="https://github.com/reKOmo">reKOmo (Bartosz Woźnica)
                <font-awesome-icon :icon="['fas', 'arrow-up-right-from-square']" /></a></p>
    </div>
</template>