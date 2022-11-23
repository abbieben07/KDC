<template>
	<div class="mb-2">
		<label :for="$attrs.id">
			<slot />
		</label>
		<input type="range" class="form-range" v-bind="$attrs" :value="modelValue" @input="$emit('update:modelValue', $event?.target?.value)" />
	</div>
</template>

<script lang="ts">
import { Model, Options, Prop, Vue } from 'vue-decorator'

@Options({
    inheritAttrs: false,
    emits: ['update:modelValue'],
})
export default class Input extends Vue {
    declare $attrs: {
        id?: string
    }

    @Model('update:modelValue', { type: [String, Number] })
    readonly modelValue!: string | number

    @Prop({ type: Object, default: () => [] })
    readonly errors!: []

}
</script>

<style>
</style>
