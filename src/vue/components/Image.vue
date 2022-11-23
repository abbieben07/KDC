<template>
    <img ref="view" class="image" alt="World Bank" />
</template>
<script lang="ts">
import { Options, Ref, Vue } from 'vue-decorator';

@Options({})
export default class Image extends Vue {
    @Ref("view")
    readonly view!: HTMLImageElement
}
</script>
<style lang="scss">
.image {
    transition-property: all;
    transition-duration: 500ms;
    transition-timing-function: ease-in-out;

    &:hover {
        filter: none !important;
        transform: scale(1.4, 1.4);
    }

    &.gray {
        filter: grayscale(100%);
    }
}
</style>