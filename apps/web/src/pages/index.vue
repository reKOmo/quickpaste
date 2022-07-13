<template>
  <div>
    <div v-if="!postingPaste" class="container flex flex-col lg:flex-row-reverse justify-center">
      <SideMenu @submit="createPaste" ref="side-menu" class="mb-4 side-menu"/>
      <div class="flex flex-col min-w-sm w-full editor lg:mr-8">
        <SnippetEditor ref="snippet" v-for="s in snippets" :key="s" class="mb-4"/>
        <div class="mx-auto flex space-x-4">
          <button v-on:click="addSnippet" class="bg-green px-10 md:w-xs rounded py-2 hover:shadow-lg">Add snippet</button>
          <button ref="remove" v-on:click="removeLast" class="bg-red-500 px-10 md:w-xs rounded py-2 hover:shadow-lg hide">Remove last snippet</button>
        </div>
      </div>
    </div>
    <div v-else>
      <div v-if="!createdPaste">
        <iframe width="300" height="300" src="../assets/animated/logo-paste-loading.svg" alt="Loading"></iframe>
        <div class="bg-gradient-to-tr from-green to-orange rounded p-6 h-min">
          <h2 class="text-2xl font-bold">Paste created!</h2>
          <h3> 
            Creting paste
          </h3>
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
        snippets: [1],
        offscreen: false,
        postingPaste: false,
        createdPaste: undefined
      }
    },
    methods: {
      async createPaste(options) {
        this.postingPaste = true;
        let snippets = [];
        this.$refs["snippet"].forEach(s => snippets.push(s.getValue()))


        const paste = {
          title: options.title,
          fragments: snippets
        }

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
        if (this.$data.snippets.length > 1)
          this.$data.snippets.pop();
        if (this.$data.snippets.length == 1)
          this.$refs["remove"].classList.add("hide");
      },
      addSnippet() {
        this.$data.snippets.push(this.$data.snippets.length);
        if (this.$data.snippets.length > 1)
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