import { Tooltip as BTooltip } from 'bootstrap'
import { Directive } from 'vue'

const Tooltip: Directive = {
	mounted(el, { value }) {
		new BTooltip(el, {
			placement: value ?? 'auto',
		})
	},
}

export default Tooltip
