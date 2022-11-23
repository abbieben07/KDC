<template>
    <Field v-slot="{ field, errors }" v-model="value" :name="name" :rules="rules" :label="label">
        <GeoStyler v-model="value" v-bind="{ ...field, ...$attrs }" :options="options" />
        <Errors :errors="errors" />
    </Field>
</template>
<script lang="ts">
import { Style } from 'geostyler-style';
import { ModelSync, Options, Prop, Vue } from 'vue-decorator';
import Errors from './Errors.vue';
import Field from './Field.vue';
import GeoStyler from './GeoStyler.vue';

@Options({
    components: {
        GeoStyler,
        Errors,
        Field
    },
    emits: ["update:modelValue"]
})
export default class GeoStylerField extends Vue {
    @Prop({ type: Object, default: () => { } })
    readonly options!: Style

    @ModelSync('modelValue', 'update:modelValue', { type: Object })
    readonly value!: Style

    @Prop(String)
    readonly name!: string

    @Prop([String, Object])
    readonly rules!: string | object

    @Prop(String)
    readonly label!: string
}
</script>