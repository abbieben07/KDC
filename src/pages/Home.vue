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
import { extents, styler, styles } from '@/vue/components/Map'
import Map from "@/vue/components/Map.vue"
import { BaseLayerOptions } from 'ol-layerswitcher'
import GeoJSON from 'ol/format/GeoJSON'
import VectorLayer from 'ol/layer/Vector'
import VectorSource from 'ol/source/Vector'
import { Fill, Stroke } from 'ol/style'
import CircleStyle from 'ol/style/Circle'
import { Options, Ref, Vue } from "vue-decorator"


@Options({
	components: {
		Map
	}
})
export default class Home extends Vue {

	@Ref("mapView")
	readonly map!: InstanceType<typeof Map>

	get extent() {
		return extents.custom(5.098732467, 10.949464356, 13.484692375, 6.775892043)
	}

	async mounted() {

		fetch('/data/boundary.json')
			.then((response) => response.json())
			.then((json) => {
				const style = styles()
				style.Polygon.setStroke(new Stroke({ width: 2, color: 'black' }))
				style.Polygon.setFill(new Fill({ color: 'rgba(0,0,0,0)' }))
				this.map.olMap.addLayer(
					new VectorLayer({
						source: new VectorSource({
							features: new GeoJSON().readFeatures(json, { featureProjection: 'EPSG:3857' }),
						}),
						visible: true,
						style: (f) => styler(f, style),
					} as BaseLayerOptions)
				)
			})

		fetch('/data/settlements.json').then(
			response => response.json()
		).then(
			(json) => {
				const style = styles()
				const circle = style.Point.getImage() as CircleStyle
				circle.setFill(new Fill({ color: 'green' }))
				circle.setStroke(new Stroke({ width: 0 }))
				this.map.olMap.addLayer(
					new VectorLayer({
						title: "Settlements (Point)",
						source: new VectorSource({
							features: new GeoJSON().readFeatures(json, { featureProjection: 'EPSG:3857' }),
						}),
						visible: true,
						style: (f) => styler(f, style),
					} as BaseLayerOptions)
				)
			}
		)


		fetch('/data/settlements.polygon.new.json')
			.then((response) => response.json())
			.then((json) => {
				const style = styles()
				style.MultiPolygon.setStroke(new Stroke({ width: 1, color: 'blue' }))
				style.MultiPolygon.setFill(new Fill({ color: 'blue' }))
				this.map.olMap.addLayer(
					new VectorLayer({
						title: 'New Settlements',
						source: new VectorSource({
							features: new GeoJSON().readFeatures(json, { featureProjection: 'EPSG:3857' }),
						}),
						visible: true,
						style: (f) => styler(f, style),
					} as BaseLayerOptions)
				)
			})


		fetch('/data/settlements.polygon.json')
			.then((response) => response.json())
			.then((json) => {
				const style = styles()
				style.MultiPolygon.setStroke(new Stroke({ width: 1, color: 'orange' }))
				style.MultiPolygon.setFill(new Fill({ color: 'orange' }))
				this.map.olMap.addLayer(
					new VectorLayer({
						title: 'Settlements',
						source: new VectorSource({
							features: new GeoJSON().readFeatures(json, { featureProjection: 'EPSG:3857' }),
						}),
						visible: true,
						style: (f) => styler(f, style),
					} as BaseLayerOptions)
				)
			})


		fetch('/data/road.json')
			.then((response) => response.json())
			.then((json) => {
				const style = styles()
				style.LineString.setFill(new Fill({ color: 'black' }))
				this.map.olMap.addLayer(
					new VectorLayer({
						title: 'Roads',
						source: new VectorSource({
							features: new GeoJSON().readFeatures(json, { featureProjection: 'EPSG:3857' }),
						}),
						visible: true,
						style: (f) => styler(f, style),
					} as BaseLayerOptions)
				)
			})

		fetch('/data/building.json')
			.then((response) => response.json())
			.then((json) => {
				const style = styles()
				style.Polygon.setStroke(new Stroke({ width: 1, color: 'violet' }))
				style.Polygon.setFill(new Fill(({ color: 'violet' })))
				this.map.olMap.addLayer(
					new VectorLayer({
						title: 'Building FootPrint',
						source: new VectorSource({
							features: new GeoJSON().readFeatures(json, { featureProjection: 'EPSG:3857' }),
						}),
						visible: true,
						style: (f) => styler(f, style),
					} as BaseLayerOptions)
				)
			})

		fetch('/data/layout.json')
			.then((response) => response.json())
			.then((json) => {
				const style = styles()
				style.LineString.setFill(new Fill({ color: 'gray' }))
				this.map.olMap.addLayer(
					new VectorLayer({
						title: 'Layout Floor Plan',
						source: new VectorSource({
							features: new GeoJSON().readFeatures(json, { featureProjection: 'EPSG:4326' }),
						}),
						visible: true,
						style: (f) => styler(f, style),
					} as BaseLayerOptions)
				)
			})




		//extents.custom(6, 8, 12, 10)this.map.olMap.getView().fit(extents.custom(6, 8, 12, 10))

	}
}
</script>
