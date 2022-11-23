import { transformExtent } from 'ol/proj'
import { Circle as CircleStyle } from 'ol/style'
import Fill from 'ol/style/Fill'
import Stroke from 'ol/style/Stroke'
import Style from 'ol/style/Style'

export const extents = {
	nigeria: transformExtent([2.32972872530833, 4.17157817396626, 14.6885090061778, 14.2088043723801], 'EPSG:4326', 'EPSG:3857'),
	custom: (l: number, b: number, t: number, r: number) => transformExtent([l, b, t, r], 'EPSG:4326', 'EPSG:3857'),
}

const image = new CircleStyle({
	radius: 3,
	stroke: new Stroke({
		color: 'orange',
		width: 1,
	}),
	fill: new Fill({
		color: 'red',
	}),
})

export const styles = {
	Point: new Style({
		image: image,
	}),
	LineString: new Style({
		stroke: new Stroke({
			color: 'green',
			width: 1,
		}),
	}),
	MultiLineString: new Style({
		stroke: new Stroke({
			color: 'green',
			width: 1,
		}),
	}),
	MultiPoint: new Style({
		image: image,
	}),
	MultiPolygon: new Style({
		stroke: new Stroke({
			color: 'blue',
			width: 1,
		}),
		fill: new Fill({
			color: 'rgba(0, 0, 255, 0.6)',
		}),
	}),
	Polygon: new Style({
		stroke: new Stroke({
			color: 'blue',
			lineDash: [4],
			width: 3,
		}),
		fill: new Fill({
			color: 'rgba(0, 0, 255, 0.1)',
		}),
	}),
	GeometryCollection: new Style({
		stroke: new Stroke({
			color: 'magenta',
			width: 2,
		}),
		fill: new Fill({
			color: 'magenta',
		}),
		image: image,
	}),
	Circle: new Style({
		stroke: new Stroke({
			color: 'red',
			width: 2,
		}),
		fill: new Fill({
			color: 'rgba(255,0,0,0.2)',
		}),
	}),
}

export const styler = (feature, styles) => styles[feature.getGeometry().getType()]
