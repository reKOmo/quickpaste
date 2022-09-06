<!-- Thanks to: https://github.com/satya164/react-simple-code-editor -->
<template>
    <div class="editor-container" :style="$attrs.style">
        <div class="editor hide-editor" ref="editor">
            <pre ref="pre-code" :class="'language-' + lang" class="pre-code code-container overflow-hidden h-md">
                <code ref="code" :class="'language-' + lang" class="code">
                </code>
            </pre>
            <pre ref="line-numbers" class="line-numbers">1</pre>
            <textarea v-model="text" :disabled="!editable" v-on:scroll="fixScroll" class="code-container" ref="input" v-on:keydown="type" v-on:input="update" resize="false" spellcheck="false"></textarea>
        </div>
    </div>
</template>

<script>
    import Prism from '@/plugins/prismjs.client'

    // https://stackoverflow.com/questions/512528/set-keyboard-caret-position-in-html-textbox
    function setCaretPosition(elem, caretPos) {

        if(elem != null) {
            if(elem.createTextRange) {
                var range = elem.createTextRange();
                range.move('character', caretPos);
                range.select();
            } else {
                if (elem.selectionStart) {
                    elem.focus();
                    elem.setSelectionRange(caretPos, caretPos);
                } else elem.focus();
            }
        }
    }

    export default {
        props: {
            lang: {
                type: String,
                default() {
                    return "text";
                }
            },
            editable: {
                type: Boolean,
                default() {
                    return true
                }
            },
            value: {
                type: String,
                default() {
                    return "";
                }
            }
        },
        data() {
            return {
                text: this.value,
                inputElemet: undefined,
                codeDisplay: undefined,
                lineNumbers: undefined,
                editor: undefined,
                preCode: undefined,
            };
        },
        watch: {
            lang: {
                handler: function (n, o) {
                    this.update();
                },
                flush: 'post'
            },
            $route: {
                handler: function () {
                    this.update({ target: this.$data.inputElemet });
                    this.$data.editor.classList.remove("hide-editor");
                },
                deep: 'true'
            }
        },
        mounted() {
            this.$data.inputElemet = this.$refs["input"];
            this.$data.codeDisplay = this.$refs["code"];
            this.$data.lineNumbers = this.$refs["line-numbers"];
            this.$data.editor = this.$refs["editor"];
            this.$data.preCode = this.$refs["pre-code"];
            this.$data.editor.classList.remove("hide-editor");

            setTimeout(this.update.bind(this, { target: this.$data.inputElemet }), 100);

            window.addEventListener('resize', this.update.bind(this, { target: this.$data.inputElemet }));
        },
        methods: {
            update() {
                //render text
                let text = this.text;
                if (text.charAt(text.length - 1) == "\n") {
                    text += "\u00A0";
                }
                this.$data.codeDisplay.textContent = text;
                Prism.highlightAll();


                // lines
                const lines = (text.match(/\n/g) || "").length + 1;
                let s = "";
                for (let i = 1; i <= lines; i++) {
                    s += i + "\n";
                }
                this.$data.lineNumbers.textContent = s;
                let c = [this.$data.inputElemet, this.$data.preCode];
                const linesWidth = this.$data.lineNumbers.clientWidth + 10;
                for (let i = 0; i < c.length; i++) {
                    //move to right
                    c[i].style.left = linesWidth + "px";
                    //resize
                    c[i].style.width = this.$data.editor.clientWidth - linesWidth + "px";
                }

                //fix width when scrollbar
                this.$data.codeDisplay.style.width = this.$data.inputElemet.clientWidth + "px";
                this.$data.preCode.style.height = this.$data.inputElemet.clientHeight + "px";
                this.$data.lineNumbers.style.height = this.$data.inputElemet.clientHeight + "px";

                this.fixScroll();
            },
            fixScroll() {
                this.$data.preCode.scroll({
                    left: this.$data.inputElemet.scrollLeft,
                    top: this.$data.inputElemet.scrollTop,
                    behavior: "instant"
                });
                this.$data.lineNumbers.scroll({
                    top: this.$data.inputElemet.scrollTop,
                    behavior: "instant"
                });
            },
            type(e) {
                if (e.key == "Tab") {
                    e.preventDefault();
                    let pos = e.target.selectionStart;
                    let text = this.$data.inputElemet.value;
                    this.$data.inputElemet.value = text.slice(0, pos) + "\t" + text.slice(pos);
                    setCaretPosition(this.$data.inputElemet, pos + 1);
                    this.update({ target: this.$data.inputElemet });
                }
            }
    }
}
</script>

<style scope lang="scss">
    .editor-container {
        width: 600px;
        height: 360px;
        background-color: #363636;
        border-radius: 5px;
        padding: 5px;
    }

    .hide-editor {
        opacity: 0;
        user-select: none;
    }

    .editor {
        position: relative;
        width: 100%;
        height: 100%;

        code[class*="language-"] {
            display: block;
            white-space: pre;
            width: 100%;
            height: 100%;
            position: absolute;
            top: 0;
            left: 0;
        }

        .code-container {
            position: absolute;
            top: 0;
            left: 0;
        }

        .pre-code {
            position: relative;
            overflow: hidden;
            padding: 0;
            margin: 0;
            user-select: none;
        }

        textarea {
            resize: none;
            background-color: transparent;
            color: #000; /* Fallback for older browsers */
            color: rgba(0, 0, 0, 0);
            caret-color: white;
            white-space: pre;
            overflow-wrap: normal;
            overflow-x: auto;
            height: 100%;

            &:focus {
                outline: none;
            }
        }

        code[class*="language-"], pre[class*="language-"], textarea, .line-numbers {
            font-family: Consolas,Monaco,"Andale Mono","Ubuntu Mono",monospace;
            font-size: 1em;
            hyphens: none;
            line-height: 1.2;
            -moz-tab-size: 4;
            tab-size: 4;
        }

        .line-numbers {
            position: absolute;
            top: 0;
            left: 0;
            text-align: right;
            overflow: hidden;
            min-width: 2em;
            padding: 0 4px 0 1em;
            border-right: 1px solid gray;
            color: gray;
            user-select: none;
        }
    }
</style>