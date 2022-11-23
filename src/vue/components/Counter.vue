<template>
    <a class="block block-rounded block-link-pop border-start border-primary border-4" href="javascript:void(0)">
        <div class="block-content block-content-full">
            <div class="fs-sm fw-semibold text-uppercase text-muted">{{ title }}</div>
            <div ref="counter" class="fs-2 fw-normal text-dark" />
        </div>
    </a>
</template>

<script lang="ts">
import { CountUp, CountUpOptions } from "countup.js"
import { merge } from "lodash"
import { Options, Prop, Ref, Vue } from 'vue-decorator'
import Card from "./Card.vue"

@Options({
    components: {
        Card
    }
})
export default class Counter extends Vue {
    counter!: CountUp

    @Ref('counter')
    readonly view!: HTMLHeadElement

    @Prop(String)
    readonly title!: string

    @Prop({ type: Number, default: 0 })
    readonly value!: number

    @Prop({ type: Object, default: () => { } })
    readonly options!: CountUpOptions

    get defaults(): CountUpOptions {
        return {

        }
    }

    reset() {
        this.counter.reset();
    }

    update(value: number) {
        this.counter.update(value);
    }

    mounted() {
        const opts: CountUpOptions = merge(this.defaults, this.options);
        this.counter = new CountUp(this.view, this.value, opts);
        this.counter.start()
    }
}
</script>

<style>
</style>