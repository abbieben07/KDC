<template>
    <div class="form-floating mb-4">
        <input ref="input" type="text" v-bind="$attrs" class="form-control" :value="modelValue" autocomplete="off" @click="showPicker" />
        <label :for="$attrs.id">
            <slot />
        </label>
        <Errors :errors="errors" />
    </div>
</template>

<script lang="ts">
import { merge } from "lodash";
import Errors from './Errors.vue';
//import datepicker from 'js-datepicker'
import { Datepicker as JSDatepicker } from 'vanillajs-datepicker';
import { Model, Options, Prop, Ref, Vue } from 'vue-decorator';

@Options({
    components: {
        Errors,
    },
    inheritAttrs: false,
    emits: ['update:modelValue'],
})
export default class Datepicker extends Vue {
    datepicker !: JSDatepicker;
    isShown = false;
    declare $attrs: {
        id?: string
    }

    @Model('update:modelValue', { type: String })
    readonly modelValue!: string

    @Prop({ type: Object, default: () => [] })
    readonly errors!: []

    @Ref('input')
    readonly input !: HTMLInputElement


    @Prop({ type: Object, default: () => { } })
    readonly options!: object

    showPicker() {
        if (!this.isShown)
            this.datepicker.show();
    }

    get defaults() {
        /* return {
            formatter:(_input, date, _instance)=> {
                this.$emit('update:modelValue', moment(date).format('DD/MM/YYYY'))
            },
            onShow: () => (this.isShown = true),
            onHide: () => (this.isShown = false),
            minDate: moment().toDate(),
            id: Math.random()
        } */

        return {
            format: 'dd/mm/yyyy'
        }
    }

    mounted() {
        const opts = merge(this.options, this.defaults)
        this.datepicker = new JSDatepicker(this.input, opts);
    }

    destroyed() {
        this.datepicker.destroy()
    }
}
</script>

<style lang="scss">
//@import '~js-datepicker/src/datepicker';
@import '~vanillajs-datepicker/sass/datepicker-bs5';
</style>
