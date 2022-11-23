<template>
	<div class="form-floating mb-2">
		<textarea v-bind="$attrs" class="form-control" @input="$emit('update:modelValue', $event.target.value)"></textarea>
		<label :for="$attrs.id">
			<slot />
		</label>
		<Errors :errors="errors" />
	</div>
</template>

<script lang="ts">
import { Model, Options, Prop, Vue } from 'vue-decorator'
import Errors from './Errors.vue'

@Options({
	components: {
		Errors,
	},
	inheritAttrs: false,
	emits: ['update:modelValue'],
})
export default class Input extends Vue {
	@Model('update:modelValue', { type: [String, Number] })
	readonly modelValue!: string | number

	@Prop({ type: Object, default: () => [] })
	readonly errors!: []

}
</script>

<style>
</style>
