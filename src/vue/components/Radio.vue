<template>
    <div class="form-check">
        <input :value="modelValue" v-bind="$attrs" :name="name" type="radio" class="form-check-input" @input="$emit('update:modelValue', $event.target.value)" />
        <label :for="$attrs.id" class="form-check-label">{{ label }}</label>
        <slot name="error" />
    </div>
</template>

<script lang="ts">
import { Model, Options, Prop, Vue } from 'vue-decorator';

@Options({
    inheritAttrs: false,
    emits: ['update:modelValue'],
})
export default class Radio extends Vue {

    declare $attrs: {
        id?: string | undefined
    }

    @Model('update:modelValue', { type: [String, Number] })
    readonly modelValue!: string | number

    @Prop(String)
    readonly name!: string

    @Prop(String)
    readonly label!: string
}
</script>

<style>
</style>
