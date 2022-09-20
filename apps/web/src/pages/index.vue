<template>
  <div>
    <div v-if="!postingPaste" class="container">
      <PasteEditor @submit="createPaste" :loggedIn="loggedIn"/>
    </div>
    <div v-else>
      <div v-if="!createdPaste" class="flex flex-row justify-center items-center mt-12">
        <object width="300" height="300" type="image/svg+xml" :data="$refs['img0'].src">
          <img ref="img0" src="@/assets/animated/logo-paste-loading.svg" />
        </object>
        <div class="bg-gradient-to-tr from-green to-orange rounded p-6 h-min">
          <h2 class="text-2xl font-bold">Creating paste</h2>
        </div>
      </div>
      <div v-else>
        <div v-if="requestCode == 200" class="flex flex-row justify-center items-center mt-12">
          <object width="300" height="300" type="image/svg+xml" :data="$refs['img1'].src">
            <img ref="img1" src="@/assets/animated/logo-paste-created.svg" />
          </object>
          <div class="doneText bg-gradient-to-tr from-green to-orange rounded p-6 h-min">    
            <h2 class="text-2xl font-bold">Paste created!</h2>
            <h3> 
              Check it at: <a class="font-bold" :href="`/${createdPaste.pasteId}`">{{createdPaste.pasteId}} <font-awesome-icon :icon="['fas', 'fa-arrow-up-right-from-square']" /></a>
            </h3>
          </div>
        </div>
        <div v-if="requestCode == 429" class="flex flex-row justify-center items-center mt-12">
          <div class="doneText bg-gradient-to-tr from-green to-orange rounded p-6 h-min">    
            <h2 class="text-2xl font-bold">Daily paste limit reached</h2>
            <h3> 
              You have surpassed your daily paste limit. For more information see <NuxtLink href="/">here</NuxtLink>
            </h3>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script setup>
  import { useUserStore } from '@/store/user';
  const userStore = useUserStore();
</script>

<script>
  export default {
    data() {
      return {
        snippets: [0],
        offscreen: false,
        postingPaste: false,
        createdPaste: undefined,
        loggedIn: false,
        requestCode: 200
      }
    },
    mounted() {
      this.loggedIn = this.userStore.user() != undefined;
      document.title = "Quickpaste";
    },
    watch: {
      snippets: {
        handler() {
          setTimeout(() => {
            const cont = this.$refs["editor-conteiner"];
            cont.scrollTo({
              top: cont.scrollHeight,
              behavior: "smooth"
            });
          }, 10);
        },
        deep: true
      }
    },
    methods: {
      async createPaste(paste) {
        this.postingPaste = true;

        const res = await fetch("/api/paste", {
          method: "POST",
          headers: {
            "Content-Type": "application/json"
          },
          credentials: "include",
          body: JSON.stringify(paste)
        });

        const data = await res.json();
        this.createdPaste = data.result;
        this.requestCode = res.status;
      },
      removeLast() {
        if (this.snippets.length > 1)
          this.snippets.pop();
        if (this.snippets.length == 1)
          this.$refs["remove"].classList.add("hide");
      },
      addSnippet() {
        this.snippets.push(this.snippets.length);
        if (this.snippets.length > 1)
          this.$refs["remove"].classList.remove("hide");
      }
    }
  }
</script>

<style scoped>
  .editor {
    max-width: 54rem;
  }

  .hide {
    display: none;
  }

  .doneText {
    animation: appear 1.7s ease-in;
  }

  @keyframes appear {
  from {
    opacity: 0%;
  }

  to {
    opacity: 100%;
  }
}
</style>