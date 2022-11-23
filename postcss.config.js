///const cssnano = require('cssnano')
//const reporter = require('postcss-reporter')
//const purgecss = require('@fullhuman/postcss-purgecss')
const autoprefixer = require('autoprefixer')
module.exports = {
	plugins: [
		autoprefixer(),
		// purgecss({
		// 	content: ['./src/**/*.html', './src/**/*.vue'],
		// 	defaultExtractor(content) {
		// 		const contentWithoutStyleBlocks = content.replace(/<style[^]+?<\/style>/gi, '')
		// 		return contentWithoutStyleBlocks.match(/[A-Za-z0-9-_/:]*[A-Za-z0-9-_/]+/g) || []
		// 	},
		// 	safelist: [/-(leave|enter|appear)(|-(to|from|active))$/, /^(?!(|.*?:)cursor-move).+-move$/, /^router-link(|-exact)-active$/, /data-v-.*/, /select2*/],
		// 	fontFace: true,
		// }),
	],
}
