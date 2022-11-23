<template>
    <div class="editor-container rounded border border-dark p-3 border-form">
        <div ref="view" />
    </div>
</template>
<script lang="ts">
// eslint-disable no-undef
import EditorJs, { EditorConfig, OutputData } from "@editorjs/editorjs"
import { merge } from "lodash"
import { Emit, Model, Options, Prop, Ref, Vue } from 'vue-decorator'

@Options({
    emits: ["update:modelValue"]
})
export default class Editor extends Vue {
    editor !: EditorJs

    @Ref("view")
    readonly view !: HTMLDivElement

    @Prop({ type: Object, default: () => { } })
    readonly options!: EditorConfig

    @Model('update:modelValue', { type: Object })
    readonly modelValue!: OutputData

    @Prop(String)
    readonly placeholder!: string

    @Emit("update:modelValue")
    onTextChanged(value: OutputData) {
        return value
    }

    get defaults(): EditorConfig {
        return {
            placeholder: this.placeholder,
            holder: this.view,
            inlineToolbar: true,
            hideToolbar: false,
            onReady: () => {
                if (this.modelValue?.blocks?.length > 0)
                    this.editor.render(this.modelValue)
            },
            onChange: (api) => {
                api.saver.save().then((data) => this.onTextChanged(data))
            }
        }
    }

    mounted() {
        let opts = merge(this.defaults, this.options)
        this.editor = new EditorJs(opts)
    }

    destroyed() {
        this.editor.destroy()
    }
}
</script>
<style lang="scss">
@import "@/scss/variables";
@import "@/theme/scss/main";

.codex-editor__redactor {
    padding-bottom: 0px !important;
}

.border-form {
    border-color: $input-border-color !important;
}
</style>
