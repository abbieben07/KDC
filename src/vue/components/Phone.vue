<template>
	<div class="form-floating mb-2">
		<input ref="phone" type="tel" class="tel h-100 form-control" :value="modelValue" @input="onPhoneChanged" />
		<!-- <label :for="$attrs.id">
			<slot />
		</label> -->
		<Errors :errors="errors" />
	</div>
</template>

<script lang="ts">
import intlTelInput from "intl-tel-input";
import { Emit, Model, Options, Prop, Ref, Vue } from "vue-decorator";
import Errors from './Errors.vue';

@Options({
	components: {
		Errors,
	},
	inheritAttrs: false,
	emits: ['update:modelValue'],
})
export default class Phone extends Vue {
	declare $attrs: {
		id?: string
	}

	phone!: intlTelInput.Plugin;

	@Ref('phone')
	readonly input!: HTMLInputElement;

	@Prop({ type: Object, default: () => { } })
	readonly options!: object

	@Prop({ type: Object, default: () => [] })
	readonly errors!: [];

	@Model('update:modelValue', { type: String })
	readonly modelValue!: string

	@Emit('update:modelValue')
	onPhoneChanged({ target: { value } }): string {
		let phone: string = this.phone.getNumber();
		if (phone.length == 0) {
			phone = value;
		}
		return phone;
	}

	mounted() {
		this.phone = intlTelInput(this.input, {
			initialCountry: "NG",
			preferredCountries: ["NG"],
			utilsScript: "https://reatent.ng/js/utils.js",
			...this.options
		});

		document.querySelector(".iti")?.classList.add("bootstrap-tel");
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
