<template>
  <div>
    <div v-if="!postingPaste" class="container">
      <PasteEditor @submit="createPaste" />
    </div>
    <div v-else>
      <div v-if="!createdPaste" class="flex flex-row justify-center items-center mt-12">
        <iframe width="300" height="300" src="../assets/animated/logo-paste-loading.svg" alt="Loading"></iframe>
        <div class="bg-gradient-to-tr from-green to-orange rounded p-6 h-min">
          <h2 class="text-2xl font-bold">Creating paste</h2>
        </div>
      </div>
      <div v-else class="flex flex-row justify-center items-center mt-12">
        <iframe width="300" height="300" src="../assets/animated/logo-paste-created.svg" alt="Created"></iframe>
        <div class="doneText bg-gradient-to-tr from-green to-orange rounded p-6 h-min">    
          <h2 class="text-2xl font-bold">Paste created!</h2>
          <h3> 
            Check it at: <a class="font-bold" :href="`/${createdPaste.pasteId}`">{{createdPaste.pasteId}}</a>
          </h3>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
  export default {
    data() {
      return {
        snippets: [0],
        offscreen: false,
        postingPaste: false,
        createdPaste: undefined
      }
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
        console.log(JSON.stringify(paste))

        const res = await fetch("/webapi/paste", {
          method: "POST",
          headers: {
            "Content-Type": "application/json"
          },
          credentials: "include",
          body: JSON.stringify(paste)
        });

        const data = await res.json();
        this.createdPaste = data.result;
        console.log(data)
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