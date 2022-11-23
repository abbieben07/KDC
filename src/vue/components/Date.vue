<template>
    <div class="form-floating mb-2">
        <input ref="view" :type="type" :placeholder="placeholder" class="form-control" readonly autocomplete="off" @click="showPicker" />
        <label :for="$attrs.id">{{ label }}</label>
        <slot name="error" />
    </div>
</template>
<script lang="ts">
import { merge } from "lodash";
import moment from "moment";
import { Datepicker } from 'vanillajs-datepicker';
import { Emit, Model, Options, Prop, Ref, Vue } from 'vue-decorator';

@Options({
    inheritAttrs: false,
    emits: ['update:modelValue'],
})
export default class Date extends Vue {
    datepicker !: Datepicker;
    isShown = false;
    declare $attrs: {
        id?: string
    }

    @Model('update:modelValue', { type: String })
    readonly modelValue!: string

    @Prop({ type: Object, default: () => [] })
    readonly errors!: []

    @Prop(String)
    readonly label!: string

    @Prop({ type: String, default: '' })
    readonly placeholder!: string

    @Prop({ type: String, default: 'text' })
    readonly type!: string

    @Ref('view')
    readonly view !: HTMLInputElement

    @Prop({ type: Object, default: () => { } })
    readonly options!: object

    showPicker() {
        if (!this.isShown)
            this.datepicker.show();
    }

    get defaults() {
        return {
            format: 'dd/mm/yyyy',
            autohide: true,
            nextArrow: '<i class="fa-solid fa-chevron-right"></i>',
            prevArrow: '<i class="fa-solid fa-chevron-left"></i>'
        }
    }

    @Emit('update:modelValue')
    onDateChanged(date) {
        return moment(date).format('DD/MM/YYYY')
    }

    mounted() {
        const opts = merge(this.options, this.defaults)
        this.datepicker = new Datepicker(this.view, opts);
        //@ts-ignore
        //this.datepicker.
        this.datepicker.setDate(this.modelValue)
        // @ts-ignore
        this.view.addEventListener("changeDate", ({ detail }) => this.onDateChanged(detail.date))
    }

    destroyed() {
        this.datepicker.destroy()
    }
}
</script>
<style lang="scss">
@use '@/scss/variables' as *;
@import '@/theme/scss/main';
@import '@/scss/variables';
@import 'node_modules/vanillajs-datepicker/sass/datepicker-bs5';

input[readonly] {
    background-color: white !important;
}

.button {
    @extend .btn;
}
</style>