<template>
    <Field v-slot="{ field, errors }" v-model="value" :name="name" :rules="rules" :label="label">
        <Dropzone v-model="value" v-bind="{ ...field, ...$attrs }" />
        <Errors :errors="errors" />
    </Field>
</template>
<script lang="ts">
import { ModelSync, Options, Prop, Vue } from 'vue-decorator';
import Dropzone from './Dropzone.vue';
import Errors from './Errors.vue';
import Field from './Field.vue';


@Options({
    components: {
        Dropzone,
        Errors,
        Field
    },
    inheritAttrs: false,
    emits: ["update:modelValue"]
})
export default class DropzoneField extends Vue {
    @ModelSync('modelValue', 'update:modelValue', { type: String })
    readonly value!: string

    @Prop({ type: Object, default: () => [] })
    readonly errors!: []

    @Prop(String)
    readonly name!: string

    @Prop([String, Object])
    readonly rules!: string | object

    @Prop(String)
    readonly label!: string
}
</script>