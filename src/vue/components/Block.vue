<template>
    <div class="block block-rounded">
        <div v-if="hasHeader" class="block-header block-header-default">
            <slot name="header" />
        </div>
        <div class="block-content block-content-full" :class="style">
            <slot />
        </div>
        <div v-if="hasFooter" class="block-footer block-footer-default">
            <slot name="footer" />
        </div>
    </div>
</template>
<script lang="ts">
import { Options, Prop, Vue } from 'vue-decorator'

@Options({})
export default class Block extends Vue {
    @Prop({ type: Boolean, default: true })
    readonly padding!: boolean

    get hasHeader() {
        return !!this.$slots.header
    }

    get hasFooter() {
        return !!this.$slots.footer
    }

    get style() {
        return this.padding ? '' : 'p-0 ps-3'
    }
}
</script>
