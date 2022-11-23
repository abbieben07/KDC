import vue from '@vitejs/plugin-vue'
import laravel from 'laravel-vite-plugin'
import path from 'path'
import { defineConfig } from 'vite'

export default defineConfig({
	plugins: [
		laravel(['resources/css/app.css', 'resources/ts/app.ts']),
		vue({
			template: {
				transformAssetUrls: {
					base: null,
					includeAbsolute: false,
				},
			},
		}),
	],
	resolve: {
		alias: {
			'@': path.join(__dirname, 'resources/'),
			//'~': path.join(__dirname, 'node_modules/'),
			vue$: path.join(__dirname, 'node_modules/vue/dist/vue.esm-bundler.js'),
			ziggy$: 'node_modules/ziggy-js/dist/vue.es.js',
		},
	},
})
