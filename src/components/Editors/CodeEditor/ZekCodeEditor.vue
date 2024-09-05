<template>
  <div class="zek-code-editor">
    <v-ace-editor
      ref="zekCodeEditor"
      v-model:value="content"
      @init="initEditor"
      :lang="language"
      :theme="theme"
      class="zek-ace-editor"
      :class="customClass"
      :placeholder="placeholder"
      :readOnly="disabled"
      :wrap="wrapText"
      :printMargin="showMargin"
      :options="{
        useWorker: true,
        fontSize: fontSize,
        enableSnippets: enableSnippets,
        enableBasicAutocompletion: enableAutoComplete,
        enableLiveAutocompletion: enableAutoComplete,
        ...options
      }"
    ></v-ace-editor>
    <!-- <ZekChatPrompt
      :show="showPrompt"
      :loading="loading"
      :customClass="'zek-code-editor-prompt'"
      v-bind="prompt"
      @onSend="sendPrompt"
    ></ZekChatPrompt> -->
  </div>
</template>

<script>
import { VAceEditor } from 'vue3-ace-editor'
import { require as aceRequire, config as aceConfig  } from 'ace-builds'
// import ZekChatPrompt from "../chat-prompt/ChatPrompt.vue";
export default {
  name: 'ZekCodeEditor',
  components: {
    VAceEditor
    // ZekChatPrompt
  },
  emits: ['onInput', 'onError', 'onSendPrompt'],
  props: {
    placeholder: {
      type: String,
      default: 'Enter your code here...'
    },
    loading: {
      type: Boolean,
      default: false
    },
    width: {
      type: String,
      default: '100%'
    },
    height: {
      type: String,
      default: '500px'
    },
    value: {
      type: String,
      default: undefined
    },
    customClass: {
      type: String,
      default: ''
    },
    language: {
      // ? Can be any language from https://github.com/thlorenz/brace/tree/master/mode
      type: String,
      default: 'python'
    },
    theme: {
      // ? Can be any theme from https://github.com/thlorenz/brace/tree/master/theme
      type: String,
      default: 'monokai'
    },
    fontSize: {
      type: Number,
      default: 14
    },
    enableSnippets: {
      type: Boolean,
      default: true
    },
    enableAutoComplete: {
      type: Boolean,
      default: true
    },
    errors: {
      // ? Array of objects with {row, column, text and type} properties
      type: Array,
      default: () => []
    },
    options: {
      type: Object,
      default: () => ({})
    },
    showPrompt: {
      type: Boolean,
      default: true
    },
    disabled: {
      type: Boolean,
      default: false
    },
    wrapText: {
      type: Boolean,
      default: true
    },
    showMargin: {
      type: Boolean,
      default: false
    },
    prompt: {
      type: Object,
      default: () => ({
        show: false,
        loading: false,
        isPopup: false,
        initialMessage: '',
        username: '',
        placeholder: 'Type a message...',
        textarea: {},
        footNote: ''
      })
    }
  },
  data() {
    return {
      content: this.value || '',
      annotations: [],
      session: null
    }
  },
  async created() {
    try {
      aceConfig.set('basePath', '/node_modules/ace-builds/src-noconflict')
      aceRequire(`mode-${this.language}`)
      aceRequire(`theme-${this.theme}`)
      aceRequire(`snippets/${this.language}`)
      aceRequire(`worker-${this.language}`)
      aceRequire('ext/language_tools')
    } catch (error) {
      console.error(error)
    }
  },
  methods: {
    initEditor(editor) {
      this.session = editor.getSession()
    },
    sendPrompt(message) {
      this.$emit('onSendPrompt', message)
    },
    handleError(annotations) {
      // Filter annotations with type 'error'
      console.log(annotations)
      const errorAnnotations =
        annotations?.filter((annotation) => annotation.type === 'error') || []

      // Emit 'onError' event with the array of error annotations
      this.$emit('onError', errorAnnotations)
    }
  },
  watch: {
    errors(val) {
      // ? Setting Annotations is a bit laggy in the component so timeout is needed
      setTimeout(() => this.session.setAnnotations(val), 100)
    },
    content() {
      this.$emit('onInput', this.content)
      setTimeout(() => (this.annotations = this.session.$annotations), 500)
    },
    value(val) {
      this.content = val
    },
    annotations(val) {
      this.handleError(val)
    }
  }
}
</script>

<style lang="scss" scoped>
.zek-code-editor {
  width: 100%;
  height: 100%;
  padding: 0.5rem;
}
.zek-ace-editor {
  width: v-bind(width);
  height: v-bind(height);
  border-radius: 7.5px;
  box-shadow: 0 0 10px rgba(0, 0, 0, 0.1);
}
:deep() {
  // webkit-scrollbar
  ::-webkit-scrollbar {
    width: 5px !important;
    &:horizontal {
      height: 5px !important;
    }
  }
  ::-webkit-scrollbar-track {
    background-color: inherit;
  }
  ::-webkit-scrollbar-thumb {
    background-color: #ccc;
    border-radius: 5px;
  }
}
:deep(.ace_editor) {
  border-radius: 7.5px;
  z-index: 1;
}
.zek-code-editor-prompt {
  margin: 0;
  padding-top: 5px;
  top: -7.5px;
  z-index: 0;
  box-shadow: none;
}
</style>
