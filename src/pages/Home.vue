<template>
    <div class="container-fluid">
        <div class="row">
            <div class="col p-3">
                <Map ref="mapView" height="calc(100vh - 2rem)" />
            </div>
        </div>
    </div>
</template>
<script lang="ts">
import Map from "@/vue/components/Map.vue"
import { BaseLayerOptions } from 'ol-layerswitcher'
import TileLayer from 'ol/layer/Tile'
import TileWMS from 'ol/source/TileWMS'
import { Options, Ref, Vue } from "vue-decorator"


@Options({
	components: {
		Map
	}
})
export default class Home extends Vue {

	@Ref("mapView")
	readonly map!: InstanceType<typeof Map>

	async mounted() {

		this.map.olMap.addLayer(
			new TileLayer({
				title: "Kaduna Building Footprint",
				source: new TileWMS({
					url: `http://localhost:8082/geoserver/kdc/wms`,
					params: {
						TILED: true,
						//SRS: params.srs,
						LAYERS: 'kdc:kd',
						//SLD_BODY: await this.getStyle(),
					},
					transition: 0,
					serverType: 'geoserver',
				}),
			} as BaseLayerOptions)
		)

	}
}
</script>