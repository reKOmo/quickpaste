<template>
    <!-- 
        A domain name is required to test this component.
        To setup a domain on locally running deployment see here: https://docs.hcaptcha.com/#local-development
    -->
    <Head>
        <Script src="https://js.hcaptcha.com/1/api.js" async defer></Script>
    </Head>
    <div class="h-captcha" :data-sitekey="sitekey"></div>
</template>


<script setup>
    const sitekey = "86c7c6db-bfb2-4371-b9ef-5c6dc5d03af2";
</script>