<template>
	<div class="form-check" :class="style">
		<input v-bind="$attrs" class="form-check" :value="modelValue" @input="$emit('update:modelValue', $event.target.value)" />
		<label class="form-check-label" :for="$attrs.id">
			<slot />
		</label>
		<Errors :errors="errors" />
	</div>
</template>

<script lang="ts">
import { Model, Options, Prop, Vue } from 'vue-decorator'
import Errors from '@/components/Errors.vue'

@Options({
	components: {
		Errors,
	},
	inheritAttrs: false,
	emits: ['update:modelValue'],
})
export default class Input extends Vue {
	@Prop({ type: Boolean, default: false })
	readonly inline!: boolean

	@Model('update:modelValue', { type: [String, Boolean, Number] })
	readonly modelValue!: string | boolean | number

	@Prop({ type: Object, default: () => [] })
	readonly errors!: []

	get style() {
		return this.inline ? 'form-check-inline' : ''
	}
}
</script>
