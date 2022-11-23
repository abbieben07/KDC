<template>
    <div class="mb-3 p-2">
        <div class="row">
            <div class="col-6">
                <div class="row">
                    <div id="uploader" ref="uploader" class="col-12 border border-5 border-dark rounded-3 vh-50 p-3 mb-2" />
                </div>
                <div class="row">
                    <div class="col-12 text-center">
                        <button class="btn btn-primary ml-2" @click="openFile">Upload File</button>
                    </div>
                </div>
            </div>
            <div class="col-6">
                <ul class="list-group">
                    <DropzoneItem v-for="item in items" :key="item.upload.uuid" :item="item" @itemCancel="onFileCancel" />
                </ul>
            </div>
        </div>
    </div>
</template>

<script lang="ts">
// @ts-nocheck
import JDropzone, { DropzoneFile, DropzoneOptions } from "dropzone"
import { merge } from "lodash"
import { Emit, Model, Options, Prop, Ref, Vue } from "vue-decorator"
import DropzoneItem from "./DropzoneItem.vue"

@Options({
	components: {
		DropzoneItem,
	},
	emits: ["progress", "update:modelValue"]
})
export default class Dropzone extends Vue {
	dropzone!: JDropzone
	items: DropzoneFile[] = [];

	@Model('update:modelValue', { type: [String] })
	readonly modelValue!: string

	@Prop(String)
	readonly url!: string

	@Prop({ type: String, default: "file" })
	readonly param!: string

	@Prop({ type: Object, default: () => { } })
	readonly options!: object

	@Prop({ type: Boolean, default: true })
	readonly multiple!: boolean

	@Ref("uploader")
	readonly uploader: HTMLDivElement

	@Emit("update:modelValue")
	modelValueUpdated(value) {
		return value
	}


	get defaults(): DropzoneOptions {
		return {
			acceptedFiles: "application/vnd.openxmlformats-officedocument.spreadsheetml.sheet",
			//@ts-ignore
			disablePreviews: true,
			headers: {
				'X-CSRF-TOKEN': document.querySelector('meta[name="csrf-token"]').getAttribute('content'),
			},
			addedfile: (file) => {
				if (!this.multiple)
					this.items = []
				this.items.push(file)
			},
			success: (file) => this.modelValueUpdated(JSON.parse(file.xhr?.response)?.file),
			paramName: this.param,
			url: this.url,
		}
	}

	openFile() {
		this.dropzone.hiddenFileInput.click()
	}

	onFileCancel({ file }) {
		this.dropzone.cancelUpload(file)
		this.dropzone.removeFile(file)
		this.items.splice(this.items.indexOf(file), 1)
	}

	mounted() {
		this.dropzone = new JDropzone(this.uploader, merge(this.defaults, this.options))
	}
}
</script>

<style lang="scss">
#uploader {
	height: 400px;
	border-style: dashed !important;
}
</style>
