<template>
    <Field v-slot="{ field, errors }" v-model="value" :name="name" :rules="rules" :label="label">
        <TextEditor v-model="value" v-bind="{ ...field, ...$attrs }" :options="options" :placeholder="placeholder" />
        <Errors :errors="errors" />
    </Field>
</template>
<script lang="ts">
import { EditorConfig, OutputData } from '@editorjs/editorjs';
import { ModelSync, Options, Prop, Vue } from 'vue-decorator';
import Errors from './Errors.vue';
import Field from './Field.vue';
import TextEditor from './TextEditor.vue';

@Options({
    components: {
        Field,
        Errors,
        TextEditor
    },
    inheritAttrs: false,
    emits: ["update:modelValue"]
})
export default class TextEditorField extends Vue {
    @Prop({ type: Object, default: () => { } })
    readonly options!: EditorConfig

    @ModelSync('modelValue', 'update:modelValue', { type: Object })
    readonly value!: OutputData

    @Prop(String)
    readonly name!: string

    @Prop([String, Object])
    readonly rules!: string | object

    @Prop(String)
    readonly label!: string

    @Prop({ type: String, default: '' })
    readonly placeholder!: string
}
</script>