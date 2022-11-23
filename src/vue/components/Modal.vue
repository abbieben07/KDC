<template>
	<div class="modal" tabindex="-1" role="dialog" aria-labelledby="modal-block-vcenter" aria-hidden="true">
		<div class="modal-dialog" role="document" v-bind="$attrs">
			<div class="modal-content">
				<div class="block block-rounded block-transparent mb-0">
					<div v-if="hasHeader" class="block-header block-header-default">
						<slot name="header" />
						<button type="button" class="btn-close" aria-label="Close" @click="onHideModal"></button>
					</div>
					<div class="block-content fs-sm">
						<slot />
					</div>
					<div v-if="hasFooter" class="block-content block-content-full text-end bg-body">
						<slot name="footer" />
					</div>
				</div>
			</div>
		</div>
	</div>
</template>

<script lang="ts">
import { Modal as BModal } from 'bootstrap'
import { Options, Prop, Vue } from 'vue-decorator'

@Options({
	inheritAttrs: false,
})
export default class Modal extends Vue {
	modal!: BModal

	get hasHeader() {
		return !!this.$slots.header
	}

	get hasFooter() {
		return !!this.$slots.footer
	}

	@Prop({ type: [Boolean, String], default: true })
	readonly backdrop!: boolean | "static" | undefined

	@Prop({ type: Boolean, default: true })
	readonly keyboard!: boolean

	@Prop({ type: Boolean, default: true })
	readonly focus!: boolean

	onShowModal() {
		this.modal.show()
	}

	onHideModal() {
		this.modal.hide()
	}

	onToggleModal() {
		this.modal.toggle()
	}

	mounted() {
		this.modal = new BModal(this.$el, {
			backdrop: this.backdrop,
			keyboard: this.keyboard,
			focus: this.focus,
		})
	}

	destroyed() {
		this.modal.dispose()
	}
}
</script>
