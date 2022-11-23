<template>
    <VForm ref="vform" @submit="onSubmit">
        <slot />
        <div ref="placeholder" />
    </VForm>
</template>

<script lang="ts">
// @ts-nocheck
/*global grecaptcha */
import $script from "scriptjs"
import { Form as VForm } from "vee-validate"
import { Options, Prop, Ref, Vue } from "vue-decorator"

@Options({
    components: {
        VForm,
    },
    emits: ["submit"]
})
export default class Form extends Vue {

    @Ref("vform")
    readonly vform!: typeof VForm

    @Prop({ type: String, default: "" })
    readonly id: string

    @Ref("placeholder")
    readonly placeholder!: HTMLDivElement

    setErrors(errors) {
        this.vform.setErrors(errors)
    }

    validate() {
        return this.vform.validate()
    }

    mounted() {
        if (process.env.MIX_APP_ENV === "production" || process.env.MIX_APP_ENV === "development") {
            $script(`https://www.google.com/recaptcha/api.js?render=${process.env.MIX_RECAPTCHA_KEY}`, () => {
                if (typeof grecaptcha === 'undefined') {
                    // eslint-disable-next-line no-global-assign
                    grecaptcha = {}
                }
                grecaptcha.ready = (cb) => {
                    const c = '___grecaptcha_cfg'
                    window[c] = window[c] || {};
                    (window[c]['fns'] = window[c]['fns'] || []).push(cb)
                }
            })
        }
    }

    onSubmit(payload) {
        if (process.env.MIX_APP_ENV === "production" || process.env.MIX_APP_ENV === "development") {
            grecaptcha.ready(() => grecaptcha.execute(process.env.MIX_RECAPTCHA_KEY, { action: 'submit' }).then((token) => this.$emit('submit', { ...payload, token, form: this.id })))
        } else {
            this.$emit("submit", { ...payload, form: this.id, token: 'fake' })
        }
    }
}

</script>

<style>

</style>
