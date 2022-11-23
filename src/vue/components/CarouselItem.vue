<template>
    <div class="carousel-item">
        <slot />
        <div v-if="hasCaptions" class="carousel-captions">
            <slot name="captions" />
        </div>
    </div>
</template>
<script lang="ts">
import { Options, Vue } from 'vue-decorator';


@Options({})
export default class CarouselItem extends Vue {

    get hasCaptions() {
        return !!this.$slots.captions
    }
}
</script>