<template>
	<Field v-slot="{ field, errors }" :name="name" :rules="rules" :label="label" :value="modelValue" @input="$emit('update:modelValue', $event.target.value)">
		<div class="form-floating mb-2">
			<textarea :id="$attrs.id" v-bind="field" class="form-control textarea" :placeholder="placeholder"></textarea>
			<label :for="$attrs.id">
				{{ label }}
			</label>
			<Errors :errors="errors" />
		</div>
	</Field>
</template>

<script lang="ts">
import { Model, Options, Prop, Vue } from 'vue-decorator';
import Errors from './Errors.vue';
import Field from "./Field.vue";
@Options({
	components: {
		Errors,
		Field,
	},
	inheritAttrs: false,
	emits: ['update:modelValue'],
})
export default class TextareaField extends Vue {
	@Model('update:modelValue', { type: [String, Number] })
	readonly modelValue!: string | number

	@Prop({ type: Object, default: () => [] })
	readonly errors!: []

	@Prop(String)
	readonly name!: string

	@Prop([String, Object])
	readonly rules!: string | object

	@Prop(String)
	readonly label!: string

	@Prop({ type: String, default: '' })
	readonly placeholder!: string
}
</script>

<style lang="scss">
.textarea {
	min-height: 150px !important;
	word-break: break-word !important;
}
</style>
