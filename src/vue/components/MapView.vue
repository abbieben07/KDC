<template>
    <Block>
        <Map ref="map" />
        <div v-show="loading" class="text-center mt-3">
            <div class="spinner-border text-primary" role="status">
                <span class="visually-hidden">Rendering...</span>
            </div>
        </div>
    </Block>
</template>
<script lang="ts">
import { Options, Ref, Vue } from "vue-decorator"
import Block from "./Block.vue"
import Map from "./Map.vue"

@Options({
    components: {
        Map,
        Block
    }
})
export default class MapView extends Vue {
    @Ref("map")
    readonly map !: InstanceType<typeof Map>

    loading = true

    get olMap() {
        return this.map.olMap
    }

    mounted() {
        this.olMap.on('postrender', () => this.loading = false)
        this.olMap.on('loadstart', () => this.loading = true)
        this.olMap.on('loadend', () => this.loading = false)
    }
}
</script>