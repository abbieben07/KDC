<template>
	<div ref="view" class="map" :style="`height:${height};`" />
	<div id="popup" ref="popup" class="ol-popup">
		<a id="popup-closer" href="#" class="ol-popup-closer"> </a>
		<div id="popup-content"></div>
	</div>
</template>
<script lang="ts">
import LayerSwitcher, { BaseLayerOptions } from 'ol-layerswitcher'
import { defaults as defaultControls, FullScreen } from 'ol/control'
import Rotate from 'ol/control/Rotate'
import ScaleLine from 'ol/control/ScaleLine'
import ZoomSlider from 'ol/control/ZoomSlider'
import ZoomToExtent from 'ol/control/ZoomToExtent'
import { Extent } from 'ol/extent'
import { defaults as defaultInteractions, DragRotateAndZoom } from 'ol/interaction'
import TileLayer from 'ol/layer/Tile'
import OlMap from 'ol/Map'
import Overlay from 'ol/Overlay'
import OSM from 'ol/source/OSM'
import XYZ from 'ol/source/XYZ'
import View from 'ol/View'
import { Prop, Ref, Vue } from 'vue-decorator'
import { extents } from './Map'

export default class Map extends Vue {
    olMap!: OlMap

    @Ref("view")
    readonly view !: HTMLDivElement

    @Ref("popup")
    readonly popup !: HTMLDivElement

    @Prop({ type: Object, default: () => extents.nigeria })
    readonly extent!: Extent

    @Prop({ type: String, default: '300px' })
    readonly height !: string

    mounted() {
        const overlay = new Overlay({
            element: this.popup,
            autoPan: {
                animation: {
                    duration: 250
                },
            }
        })
        this.olMap = new OlMap({
            controls: defaultControls().extend([new FullScreen(), new ZoomSlider(), new ScaleLine(), new ZoomToExtent(), new Rotate()]),
            interactions: defaultInteractions().extend([new DragRotateAndZoom()]),
            layers: [
                new TileLayer({
                    title: 'Open Street Map',
                    type: 'base',
                    source: new OSM(),

                } as BaseLayerOptions),
                new TileLayer({
                    title: 'Google Terrain View',
                    type: 'base',
                    visible: false,
                    source: new XYZ({
                        url: 'http://mt0.google.com/vt/lyrs=p&hl=en&x={x}&y={y}&z={z}'
                    })

                } as BaseLayerOptions),
                new TileLayer({
                    title: 'Google Satellite View',
                    type: 'base',
                    visible: false,
                    source: new XYZ({
                        url: 'http://mt0.google.com/vt/lyrs=s&hl=en&x={x}&y={y}&z={z}'
                    })

                } as BaseLayerOptions),
                new TileLayer({
                    title: 'Google Road Map View',
                    type: 'base',
                    visible: false,
                    source: new XYZ({
                        url: 'http://mt0.google.com/vt/lyrs=m&hl=en&x={x}&y={y}&z={z}'
                    })
                } as BaseLayerOptions)
            ],
            overlays: [overlay],
            target: this.view,
            view: new View({
                showFullExtent: true,
                extent: this.extent,
                zoom: 0,
                center: [0, 0]
            })
        })
       /*  this.olMap.on('singleclick', (e) => {
            console.log(e)
            const coordinate = e.coordinate
            const hdms = toStringHDMS(toLonLat(coordinate))

            this.popup.getElementsByTagName("div")[0].innerHTML = '<p>You clicked here:</p><code>' + hdms + '</code>'
            overlay.setPosition(coordinate)
        }) */

        this.olMap.addControl(new LayerSwitcher())
    }

    destroyed() {
        this.olMap.dispose()
    }
}
</script>
<style lang="scss">
@import '~ol/ol.css';
@import '~ol-layerswitcher/dist/ol-layerswitcher.css';

.map {
	background-color: #ccc;
	width: 100%;
	height: auto;

	.loader {
		text-align: center;
		width: 100%;
		font-weight: bold;
	}
}

.ol-popup {
	position: absolute;
	background-color: white;
	box-shadow: 0 1px 4px rgba(0, 0, 0, 0.2);
	padding: 15px;
	border-radius: 10px;
	border: 1px solid #cccccc;
	bottom: 12px;
	left: -50px;
	min-width: 280px;
}

.ol-popup:after,
.ol-popup:before {
	top: 100%;
	border: solid transparent;
	content: ' ';
	height: 0;
	width: 0;
	position: absolute;
	pointer-events: none;
}

.ol-popup:after {
	border-top-color: white;
	border-width: 10px;
	left: 48px;
	margin-left: -10px;
}

.ol-popup:before {
	border-top-color: #cccccc;
	border-width: 11px;
	left: 48px;
	margin-left: -11px;
}

.ol-popup-closer {
	text-decoration: none;
	position: absolute;
	top: 2px;
	right: 8px;
}

.ol-popup-closer:after {
	content: '✖';
}
</style>
