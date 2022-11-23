<template>
    <div class="form-floating mb-2">
        <input :value="modelValue" v-bind="$attrs" :type="type" class="form-control" @input="$emit('update:modelValue', $event.target?.value)" />
        <label :for="$attrs.id">
            {{ label }}
        </label>
        <slot name="error" />
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

	@Prop(String)
	readonly name!: string

	@Prop([String, Object])
	readonly rules!: string | object

	@Prop(String)
	readonly label!: string

	@Prop({ type: String, default: 'text' })
	readonly type!: string
}
</script>

<style>
</style>
