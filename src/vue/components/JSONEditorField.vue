<template>
    <Field v-slot="{ field, errors }" :name="name" :rules="rules" :label="label">
        <JSONEditor v-model="value" v-bind="{ ...field, ...$attrs }" :label="label">
            <template #error>
                <Errors :errors="errors" />
            </template>
        </JSONEditor>
    </Field>
</template>
<script lang="ts">
import { ModelSync, Options, Prop, Vue } from 'vue-decorator'
import Errors from './Errors.vue'
import Field from "./Field.vue"
import JSONEditor from "./JSONEditor.vue"

@Options({
    components: {
        Field,
        Errors,
        JSONEditor
    }
})
export default class JSONEditorField extends Vue {
    @ModelSync('modelValue', 'update:modelValue', { type: [Object] })
    readonly value!: object

    @Prop(String)
    readonly name!: string

    @Prop([String, Object])
    readonly rules!: string | object

    @Prop(String)
    readonly label!: string

}
</script>