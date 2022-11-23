//import Gate from '@/ts/policies/Gate'

import { PhoneNumberFormat, PhoneNumberUtil } from 'google-libphonenumber'
import { isNull } from 'lodash'
import moment from 'moment'

// @ts-nocheck
export class CellRender {
	static approval() {
		return (data) => {
			switch (data) {
				case 0:
					return '<span class="text-warning">PENDING<span>'
				case 1:
					return '<span class="text-success">APPROVED<span>'
				case -1:
					return '<span class="text-danger">REJECTED<span>'
			}
		}
	}

	static date(format = 'MMM DD, YYYY hh:mm A', fromNow = true) {
		format = 'MMM DD, YYYY hh:mm A'
		fromNow = fromNow || true
		return (data) => {
			if (isNull(data)) return ''
			let date = moment(data)
			if (date.isBetween(moment(), moment().subtract(5, 'day'))) {
				return date.fromNow()
			} else if (date.isBetween(moment(), moment().add(5, 'day'))) {
				return date.toNow()
			} else {
				return date.format(format)
			}
		}
	}

	static actions(_gate?: any) {
		return (data, _type, row): string => {
			let buttons = ''
			//let canView = gate?.allow('view', row)
			//let canUpdate = gate?.allow('update', row)
			//let canDelete = gate?.allow('delete', row)
			let actions = '<div class="btn-group btn-group-lg" role="group">'
			if (buttons.length > 1) actions += buttons
			//if (canView)
			actions += `<a class="btn btn-info" title="View Record" href="${data.single}"><i class="fa fa-eye"></i></a>`

			//if (canUpdate)
			actions += `<a class="btn btn-primary" title="Update Record" href="${data.update}"><i class="fas fa-pencil-alt"></i></a>`

			//if (canDelete)
			if (row.trashed) {
				actions += `<a class="btn btn-warning restore" data-id="${row.id}" title="Restore Record"><i class="fa fa-trash-restore"></i></a>`
			} else {
				actions += `<a class="btn btn-danger delete"  data-id="${row.id}" title="Delete record"><i class="fa fa-trash" style="color:white;"></i></a>`
			}

			actions += '</div>'
			return actions
		}
	}

	static title() {
		return (data, _type, row: any): string => {
			let title = ''
			let link = ''
			if (typeof data === 'object') {
				title = data.title
				link = data.url.single
			} else if (typeof data === 'string') {
				title = data
				link = row.url.single
			}

			let html = `<a href="${link}"><span class="d-flex align-self-center">${title}</span></a>`

			return html
		}
	}

	static avatar() {
		return (data): string => `<img src="${data}" class="img-fluid img-thumbnail rounded-circle avatar"/>`
	}

	static enums(action) {
		return (data): string => action(data)
	}

	static phone() {
		let phone = PhoneNumberUtil.getInstance()
		return (data: string) => phone.format(phone.parse(data), PhoneNumberFormat.INTERNATIONAL)
	}
}
