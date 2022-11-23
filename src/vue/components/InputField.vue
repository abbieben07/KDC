<template>
    <Field v-slot="{ field, errors }" v-model="value" :name="name" :rules="rules" :label="label">
        <Input v-bind="{ ...field, ...$attrs }" :label="label">
            <template #error>
                <Errors :errors="errors" />
            </template>
        </Input>
    </Field>
</template>

<script lang="ts">
import { ModelSync, Options, Prop, Vue } from 'vue-decorator'
import Errors from './Errors.vue'
import Field from "./Field.vue"
import Input from "./Input.vue"

@Options({
	components: {
		Errors,
		Field,
		Input
	},
	inheritAttrs: false,
	emits: ['update:modelValue'],
})
export default class InputField extends Vue {

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
