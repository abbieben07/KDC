<template>
    <div>
        <table ref="view">
            <thead v-if="showHeader">
                <slot name="header" />
            </thead>
            <tbody>
                <slot name="body" />
            </tbody>
            <tfoot v-if="showFooter">
                <slot name="footer" />
            </tfoot>
        </table>
    </div>
</template>
<script lang="ts">
// @ts-nocheck
import { Options, Prop, Ref, Vue } from "vue-decorator"

import DataTable from "datatables.net"
import "datatables.net-bs5"
//import "datatables.net-autofill-bs5";
import "datatables.net-buttons-bs5"
//import "datatables.net-colreorder-bs5";
//import "datatables.net-datetime";
//import "datatables.net-fixedcolumns-bs5";
//import "datatables.net-fixedheader-bs5";
//import "datatables.net-keytable-bs5";
import "datatables.net-responsive-bs5"
//import "datatables.net-rowgroup-bs5";
//import "datatables.net-rowreorder-bs5";
import "datatables.net-scroller-bs5"
//import "datatables.net-searchbuilder-bs5";
//import "datatables.net-searchpanes-bs5";
import { AxiosError } from "axios"
import "datatables.net-select-bs5"
import "jszip"
import "pdfmake"

// /import  jQueryDataTable  from 'datatables.net'
import { merge } from "lodash"

@Options({})
export default class Datatable extends Vue {
	// eslint-disable-next-line no-undef
	datatable!: typeof DataTable.Api<HTMLTableElement>

	@Ref("view")
	readonly view !: HTMLTableElement

	@Prop({ type: Object, default: () => { } })
	readonly options!: object

	get showHeader() {
		return !!this.$slots.header
	}

	get showFooter() {
		return !!this.$slots.footer
	}

	get defaults() {
		return {
			search: {
				return: true,
			},
			searching: true,
			ordering: true,
			destroy: true,
			processing: true,
			deferRender: true,
			responsive: true,
			serverSide: true,
			//fixedHeader: true,
			lengthMenu: [10, 20, 50, 100],
			language: {
				info: '<span class="d-block">Showing <b>_START_ to _END_</b> of _TOTAL_ entries</span>',
				infoEmpty: '<span class="d-block">Showing <b>0 to 0 of 0</b></span>',
				lengthMenu: '<div class="input-group"><span class="input-group-text"><i class="fas fa-eye"></i></span>_MENU_</div>',
				processing: '<div class="d-block text-center"><div class="spinner-grow text-primary" role="status"><span class="visually-hidden">Loading...</span></div></div><span class"d-block text-center">Processing...</span>',
				search: '<div class="input-group">_INPUT_<span class="input-group-text me-2"><i class="fas fa-search"></i></span></div>',
				searchPlaceholder: "Search...",
				paginate: {
					next: "<i class='fas fa-chevron-right'></i>",
					previous: "<i class='fas fa-chevron-left'></i>",
				},
			},
			dom: "<'row table-head g-1' <'col-md-6 col-sm-12 d-flex justify-content-md-start justify-content-sm-center' B>" +
				"<'col-md-6 col-sm-12 d-flex justify-content-md-end justify-content-sm-center' f l>>" +
				"<'row table-body' <'col-12' <'table-indicator' r> t>>" +
				"<'row table-foot gy-1' <'col-md-6 col-sm-12 d-flex justify-content-md-start justify-content-sm-center' i>" +
				"<'col-md-6 col-sm-12 d-flex justify-content-md-end justify-content-sm-center' p>>",
			rowId: "id",
			select: {
				style: "os",
				selector: "td:not(:last-child)",
				blurable: true,
			},
			ajax: {
				data: (data, settings) => {
					let api = new DataTable.Api(settings)
					data.columns.push({
						data: "slug"
					})
					return merge(data, {
						trash: false,
						orderable: api.order().length > 0,
					})
				},
				method: "POST",
			},
			columnDefs: [
				{
					targets: -1,
					data: null,
					type: "html",
					class: "align-middle text-center",
				},
				{
					targets: "_all",
					orderable: false,
					searchable: false,
					class: "align-middle",
					width: "fit-content",
				},
			],
		}
	}


	deleteRow(data: object) {
		this.datatable.processing(true)
		const url = new URL(`${this.datatable.settings().ajax.url()}/editor/${data.slug}`)
		this.$http
			.delete(url.toString())
			.then(() => this.datatable.draw())
			.catch((e: AxiosError) => console.error(e.response.data.message))
	}

	mounted() {
		// @ts-ignore
		this.datatable = new DataTable(this.view, merge(this.defaults, this.options))
		$(() => {
			$(".dataTables_filter input").removeClass("form-control-sm")
			$(".dataTables_length select").removeClass("form-select-sm")
			$(".dataTable").addClass("table table-responsive table-bordered")
		})
		document.onkeyup = (e) => {
			if (e.code === "Delete") {
				const rows = this.datatable.rows({ selected: true })
				for (let i = 0; i < rows.count(); i++) {
					this.deleteRow(rows.data()[i])
				}
			}
		}

		this.datatable.on("click", ".delete, .restore", ({ target }: { target: HTMLAnchorElement }) => {
			const data = this.datatable.row($(target).parents("tr")).data()
			this.deleteRow(data)
		})
		DataTable.ext.errMode = "throw"
	}
}
$.fn.dataTable.Api.register('processing()', function (show) {
	return this.iterator('table', function (ctx) {
		ctx.oApi._fnProcessingDisplay(ctx, show)
	})
})

//$(() => {
//declare name$.fn.dataTable!: JQueryDataTables;
$.extend(true, $.fn.dataTable.Buttons.defaults, {
	dom: {
		container: {
			tag: "div",
			className: "dt-buttons",
		},
	},
})

$.fn.dataTable.ext.buttons.refresh = {
	text: '<i class="fas fa-sync-alt"></i>',
	titleAttr: "Refresh Table Information",
	action: (_e, table) => table.ajax.reload(),
	className: "btn-success",
	attr: {
		"data-toggle": "tooltip",
	},
}

$.fn.dataTable.ext.buttons.create = {
	text: '<i class="fa fa-plus"></i>',
	tag: "a",
	titleAttr: "Create",
	className: "btn-primary",
	action: "",
	init: (_dt, node) => {
		node.off("click")
	},
}

$.fn.dataTable.ext.buttons.export = {
	text: '<i class="fas fa-cloud-download-alt"></i>',
	extend: "collection",
	autoClose: true,
	titleAttr: "Export Table Information",
	buttons: ["copy", "excel", "csv", "pdf", "print"],
}

$.fn.dataTable.ext.buttons.select = {
	extend: "collection",
	text: '<i class="fas fa-check-square"></i>',
	className: "btn-warning",
	autoClose: true,
	titleAttr: "Select Table Information",
	buttons: [
		{
			extend: "selectAll",
			text: "Select All",
			titleAttr: "Select All",
		},
		{
			extend: "selectNone",
			text: "Select None",
			titleAttr: "Select None",
		},
	],
}
$.fn.dataTable.ext.buttons.delete = {
	text: '<i class="fas fa-trash"></i>',
	extend: "remove",
	titleAttr: "Delete Selected Rows Data",
}

$.fn.dataTable.ext.buttons.filter = {
	text: '<i class="fas fa-filter"></i>',
	extend: "collection",
	autoClose: true,
	value: null,
	buttons: [],
	init: (dt, node, config) => {
		dt.on("preXhr", (_e, _settings, data) => (data.filter = { type: config?.filter }))
		dt.on("xhr", (_e, _settings, { categories }) => {
			let buttons = []
			buttons = categories.map((item) => ({ text: item.title, action: () => dt.on("preXhr", (_e, _settings, data) => (data.filter.value = item.id)).draw() }))
			buttons.unshift("<hr />")
			buttons.unshift({ text: "All", action: () => dt.on("preXhr", (_e, _settings, data) => (data.filter.value = null)).draw() })
			dt.button(null, node).collectionRebuild(buttons)
		})
	},
}

$.fn.dataTable.ext.buttons.trashed = {
	text: '<i class="fas fa-trash"></i>',
	titleAttr: "Thrashed",
	action: (_e, dt, node) => {
		let { trash } = dt.ajax.params()
		if (trash) {
			dt.on("preXhr", (_e, _settings, data) => (data.trash = false)).draw()
			dt.button(0, node).text('<i class="fas fa-trash"></i>')
		} else {
			dt.on("preXhr", (_e, _settings, data) => (data.trash = true)).draw()
			dt.button(0, node).text('<i class="fas fa-trash-restore"></i>')
		}
	},
}

/* $.extend(true, $.fn.dataTable.Editor.defaults, {
		ajax: {
			remove: {
				method: 'DELETE',
				error: (xhr) => console.error(xhr.response),
				success: (response) => console.log(response),
			},
			edit: {
				method: 'PUT',
				error: (xhr) => console.error(xhr.response),
				success: (response) => console.log(response),
			},
		},
		table: '#table',
		idSrc: 'id',
	}) */

$(() => {
	//$('.btn-toobar .btn').button('toggle')
	$(".filter input, .trash input").on("change", (e) => {
		let table = $(e.target).parents(".btn-toolbar").first().data("table")
		$(table).DataTable().ajax.reload()
	})
})

//})


</script>

<style lang="scss">
@import "~datatables.net-bs5/css/dataTables.bootstrap5.css";
//@import '~datatables.net-autofill-bs5/css/autoFill.bootstrap5.css';
@import "~datatables.net-buttons-bs5/css/buttons.bootstrap5.css";
//@import '~datatables.net-colreorder-bs5/css/colReorder.bootstrap5.css';
//@import '~datatables.net-datetime/css/dataTables.dateTime';
//@import '~datatables.net-fixedcolumns-bs5/css/fixedColumns.bootstrap5.css';
//@import '~datatables.net-fixedheader-bs5/css/fixedHeader.bootstrap5.css';
//@import '~datatables.net-keytable-bs5/css/keyTable.bootstrap5.css';
@import "~datatables.net-responsive-bs5/css/responsive.bootstrap5.css";
//@import '~datatables.net-rowgroup-bs5/css/rowGroup.bootstrap5.css';
//@import '~datatables.net-rowreorder-bs5/css/rowReorder.bootstrap5.css';
@import "~datatables.net-scroller-bs5/css/scroller.bootstrap5.css";
//@import '~datatables.net-searchbuilder-bs5/css/searchBuilder.bootstrap5.css';
//@import '~datatables.net-searchpanes-bs5/css/searchPanes.bootstrap5.css';
@import '~datatables.net-select-bs5/css/select.bootstrap5.css';

.dataTable {
	width: 100% !important;

	.avatar {
		max-width: 70px !important;
	}
}

.dataTables_info,
.dataTables_filter,
.dataTables_length,
.dataTables_paginate {
	width: fit-content;
}

.dataTables_info {
	padding-top: 0 !important;
}
</style>
