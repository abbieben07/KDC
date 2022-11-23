<template>
    <div class="mb-2">
        <select ref="view" v-bind="$attrs" class="form-select2-lg w-100">
            <slot />
        </select>
        <slot name="error" />
    </div>
</template>

<script lang="ts">
import { merge } from "lodash"
import "select2"
import { Options as Select2Options } from "select2"
import { Emit, Model, Options, Prop, Ref, Vue, Watch } from "vue-decorator"


@Options({
	emits: ["update:modelValue"],
	inheritAttrs: false,
})
export default class Select extends Vue {
	// eslint-disable-next-line no-undef
	select2!: any

	declare $attrs: {
		id?: string
		disabled?: any
		multiple?: any
	}

	@Model("update:modelValue", { type: [String, Number, Array, Object] })
	readonly modelValue!: string | string[] | number

	@Ref("view")
	readonly view!: HTMLSelectElement

	@Prop(Object)
	readonly options!: Select2Options

	@Prop(String)
	readonly label!: string

	@Prop({ type: Object, default: () => [] })
	readonly errors!: []

	@Emit("update:modelValue")
	modelValueSelected(value: string | string[] | number) {
		return value
	}

	@Emit("data")
	onSelectedData() {
		return this.view.multiple ? this.select2.select2('data') : this.select2.select2('data')[0]
	}

	@Watch("modelValue", { deep: true, immediate: true })
	onSelectedChange(value: number | string | string[], oldValue?: number | string | string[]) {
		if (!this.select2) return

		if (value instanceof Array) {
			this.select2.val([...value])
		} else {
			this.select2.val(value)
		}
		if (value != oldValue) {
			this.select2.trigger("change.select2")
		}
		this.modelValueSelected(value)
	}

	get defaults(): Select2Options {
		return {
			ajax: {
				method: "POST",
				data: ({ term, page }) => {
					return {
						search: term,
						page: page || 1,
						number: 10,
						offset: ((page || 1) - 1) * 10,
					}
				},
				delay: 250,
				cache: true,
			},
			debug: true,
			theme: "bootstrap-5",
			//@ts-ignore
			templateResult: ({ id, title, text }) => id ? $(`<span>${title}</span>`) : text,
			//@ts-ignore
			templateSelection: ({ id, title, text }) => id ? $(`<span>${title}</span>`) : text,
		}
	}

	mounted() {
		$(() => {
			let opts: Select2Options = merge(this.defaults, this.options)
			if (opts.ajax === null) {
				delete opts.templateSelection
				delete opts.templateResult
			}
			this.select2 = $(this.view).select2(opts)
			this.select2.on("change.select2", () => {
				this.modelValueSelected(this.select2.val())
			})
			$(".select2-selection").addClass("d-flex flex-column justify-content-center")
			if (typeof opts.data === "undefined") {
				//this.onSelectedChange(this.modelValue)
			}
		})
	}

	destroyed() {
		this.select2.select2("destroy")
	}
}
</script>

<style lang="scss">
@import '@/scss/variables';
@import '@/theme/scss/main';
@import '@/theme/scss/vendor/select2';
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
