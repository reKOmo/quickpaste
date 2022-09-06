<template>
    <!-- 
        A domain name is required to test this component.
        To setup a domain on locally running deployment see here: https://docs.hcaptcha.com/#local-development
    -->
    <Head>
        <Script src="https://js.hcaptcha.com/1/api.js" async defer></Script>
    </Head>
    <div id="captcha-container"></div>
</template>


<script setup>
    const sitekey = useRuntimeConfig().public.hCaptchaSitekey;
</script>

<script>
    export default {
        emits: ["submit"],
        mounted() {
            hcaptcha.render("captcha-container", {
                sitekey: this.sitekey,
                theme: "dark",
                callback: this.submitCaptcha
            })
        },
        methods: {
            submitCaptcha(code) {
                this.emit("submit", code);
            }
        }
    }
</script>