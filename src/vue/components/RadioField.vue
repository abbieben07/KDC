<template>
    <Field v-slot="{ field, errors }" v-model="value" :name="name" :rules="rules" :label="label">
        <Radio v-bind="{ ...field, ...$attrs }" :name="name" :label="label">
            <template #error>
                <Errors :errors="errors" />
            </template>
        </Radio>
    </Field>
</template>

<script lang="ts">
import { ModelSync, Options, Prop, Vue } from 'vue-decorator';
import Errors from './Errors.vue';
import Field from "./Field.vue";
import Radio from "./Radio.vue";

@Options({
    components: {
        Errors,
        Field,
        Radio
    },
    emits: ['update:modelValue'],
})
export default class RadioField extends Vue {

    @ModelSync('modelValue', 'update:modelValue', { type: [String, Number] })
    readonly value!: string | number

    @Prop(String)
    readonly name!: string

    @Prop([String, Object])
    readonly rules!: string | object

    @Prop(String)
    readonly label!: string
}
</script>

<style>
</style>
