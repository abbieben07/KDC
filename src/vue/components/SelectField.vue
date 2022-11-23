<template>
    <Field v-slot="{ errors, field }" v-model="value" :name="name" :rules="rules" :label="label">
        <Select v-model="value" v-bind="{ ...$attrs, ...field }" :options="options">
            <template #error>
                <Errors :errors="errors" />
            </template>
        </Select>
    </Field>
</template>

<script lang="ts">
import { Options as Select2Options } from "select2";
import { ModelSync, Options, Prop, Vue } from "vue-decorator";
import Errors from "./Errors.vue";
import Field from "./Field.vue";
import Select from "./Select.vue";

@Options({
	components: {
		Errors,
		Field,
		Select
	},
	emits: ["update:modelValue"],
	inheritAttrs: false,
})
export default class SelectField extends Vue {
	select2!: any;

	@ModelSync('modelValue', "update:modelValue", { type: [String, Number, Array, Object] })
	readonly value!: string | string[] | number | object;

	@Prop(Object)
	readonly options!: Select2Options;

	@Prop(String)
	readonly name!: string

	@Prop([String, Object])
	readonly rules!: string | object

	@Prop(String)
	readonly label!: string
}
</script>

<style lang="scss">
@import '@/theme/scss/main';
@import '~select2/src/scss/core';
//@import '~select2-bootstrap-5-theme/dist/select2-bootstrap-5-theme.css';
@import '~select2-bootstrap-5-theme/src/include-all';

.select2 {
	width: 100% !important;
}

.select2-selection {
	min-height: 56px !important;
}
</style>
