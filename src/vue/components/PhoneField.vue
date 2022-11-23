<template>
    <Field v-slot="{ field, errors }" :name="name" :rules="rules" :label="label" :value="modelValue" @input="onPhoneChanged">
        <div class="form-floating mb-2">
            <input v-bind="field" :id="$attrs.id" ref="phone" type="tel" class="tel h-100 form-control" :placeholder="placeholder" />
            <!-- <label :for="$attrs.id">
			<slot />
		</label> -->
            <Errors :errors="errors" />
        </div>
    </Field>
</template>

<script lang="ts">
import intlTelInput from "intl-tel-input"
import { Emit, Model, Options, Prop, Ref, Vue } from "vue-decorator"
import Errors from './Errors.vue'
import Field from "./Field.vue"

@Options({
	components: {
		Errors,
		Field
	},
	inheritAttrs: false,
	emits: ['update:modelValue'],
})
export default class PhoneField extends Vue {
	declare $attrs: {
		id?: string
	}

	phone!: intlTelInput.Plugin

	@Ref('phone')
	readonly input!: HTMLInputElement

	@Prop({ type: Object, default: () => { } })
	readonly options!: object

	@Prop(String)
	readonly name!: string

	@Prop([String, Object])
	readonly rules!: string | object

	@Prop(String)
	readonly label!: string

	@Prop({ type: String, default: '' })
	readonly placeholder!: string

	@Model('update:modelValue', { type: String })
	readonly modelValue!: string

	@Emit('update:modelValue')
	onPhoneChanged({ target: { value } }) {
		let phone: string = this.phone.getNumber()
		if (phone.length == 0) {
			phone = value
		}
		return phone
	}

	mounted() {
		this.phone = intlTelInput(this.input, {
			initialCountry: "NG",
			preferredCountries: ["NG"],
			utilsScript: `${location.origin}/js/utils.js`,
			...this.options
		})

		document.querySelector(".iti")?.classList.add("bootstrap-tel")
	}
}
</script>

<style lang="scss">
$flagsImagePath: '~intl-tel-input/build/img/';
@import '~intl-tel-input/src/css/intlTelInput.scss';

.bootstrap-tel {
	width: 100% !important;
	height: 58px !important;
}
</style>
