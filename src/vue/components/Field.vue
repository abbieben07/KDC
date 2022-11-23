<template>
    <VField v-slot="{ field, errors }" :name="name" :rules="rules" :label="label" :validate-on-blur="true" :validate-on-change="true" :validate-on-model-update="true">
        <slot :field="field" :errors="errors" />
    </VField>
</template>

<script lang="ts">
import { alpha, alpha_dash, alpha_spaces, confirmed, email, integer, min, min_value, required } from '@vee-validate/rules'
import { defineRule, Field as VField } from 'vee-validate'
import { Options, Prop, Vue } from 'vue-decorator'

defineRule('required', required)
defineRule('email', email)
defineRule('confirmed', confirmed)
defineRule('min_value', min_value)
defineRule('min', min)
defineRule('alpha_spaces', alpha_spaces)
defineRule('alpha_dash', alpha_dash)
defineRule('alpha', alpha)
defineRule('integer', integer)

@Options({
	components: {
		VField,
	},
})
export default class Field extends Vue {
	@Prop(String)
	readonly name!: string

	@Prop({ type: String, default: '' })
	readonly rules!: string

	@Prop(String)
	readonly label!: string

	/* mounted() {
		console.log(this.$slots.default)
	} */
}
</script>

<style>

</style>
