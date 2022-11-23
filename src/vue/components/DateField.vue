<template>
    <Field v-slot="{ field, errors }" v-model="value" :name="name" :rules="rules" :label="$attrs.label">
        <Date v-model="value" v-bind="{ ...field, ...$attrs }" :options="options">
            <template #error>
                <Errors :errors="errors" />
            </template>
        </Date>
    </Field>
</template>
<script lang="ts">
import { ModelSync, Options, Prop, Vue } from 'vue-decorator';
import Date from './Date.vue';
import Errors from './Errors.vue';
import Field from "./Field.vue";

@Options({
    components: {
        Errors,
        Field,
        Date
    },
    inheritAttrs: false,
    emits: ['update:modelValue'],
})
export default class DateField extends Vue {
    @ModelSync('modelValue', 'update:modelValue', { type: String })
    readonly value!: string

    @Prop({ type: Object, default: () => [] })
    readonly errors!: []

    @Prop(String)
    readonly name!: string

    @Prop([String, Object])
    readonly rules!: string | object


    @Prop({ type: Object, default: () => { } })
    readonly options!: object
}
</script>
