<template>
    <div class="main shadow-black shadow-lg rounded">
        <div class="header bg-gradient-to-tr from-green to-orange p-2 flex justify-center rounded">
            <input :disabled="!editable" v-model.trim.lazy="title" type="text" maxlength="50" tooltip="Click to edit"
                placeholder="Name this snippet" class="flex-1 sm:mr-4 py-2 text-center text-white rounded placeholder-white-100 border-none
              focus:outline-none text-lg text-bold" />
            <select v-model="selectedLang" class="bg-transparent rounded w-6em md:w-10em text-center border-none">
                <option v-for="(lang, index) in languages" :key="index" :value="lang">
                    {{ lang }}
                </option>
            </select>
        </div>
        <Editor ref="editor" style="width: 100%; border-radius: 0 0 5px 5px;" :lang="selectedLang" :value="value.content"
            :editable="editable" />
    </div>
</template>

<script setup lang="ts">
import { ref, computed, watch } from 'vue';
import { useRuntimeConfig } from '#app';
import {SUPPORTED_SYNTAXES} from "quickpaste-constants"

// Props
const props = defineProps({
  editable: {
    type: Boolean,
    default: true,
  },
  value: {
    type: Object,
    default: () => ({
      name: '',
      syntax: 'text',
      content: '',
    }),
  },
});

const languages = useSupportedSyntaxes();
const selectedLang = ref(props.value.syntax || 'text');
const title = ref(props.value.name);
const editor = ref(null);

function getValue() {
  return {
    name: title.value,
    syntax: selectedLang.value,
    content: editor.value?.text || '',
  }
}

// Optional: Expose to parent if needed
defineExpose({ getValue, editor });
</script>


<style scoped>
.main {
    background: #363636;
}

select {
    background: #363636;
    color: #ddd;
}

option {
    background-color: white;
    color: black;
}

option:checked {
    background-color: #aaa;
}

input {
    background-color: #363636;
}</style>