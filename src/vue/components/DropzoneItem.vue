<template>
    <li class="list-group-item">
        <div class="d-flex">
            <img id="thumb" :src="src" class="h-auto text-success" />
            <div class="d-flex flex-grow-1 flex-column ms-2">
                <div class="d-flex justify-content-between">
                    <div class="d-flex">
                        <div class="text-truncate mw-50">
                            <span> {{ item.name }} </span>
                        </div>
                        <span class="ms-2"> {{ size }} </span>
                    </div>
                    <button type="button" class="btn-close btn-sm m-1" aria-label="Close" @click="onItemCancel" />
                </div>
                <Progressbar :progress="item.upload.progress" height="5px" />
                <div class="justify-content-between">
                    <div>
                        <span> {{ item.status }} </span>
                    </div>
                </div>
            </div>
        </div>
    </li>
</template>
<script lang="ts">
// @ts-nocheck
import { DropzoneFile } from "dropzone"
import bytes from "pretty-bytes"
import { Emit, Options, Prop, Vue } from "vue-decorator"
import Dropzone from "./Dropzone.vue"
import Progressbar from "./Progressbar.vue"

@Options({
	components: {
		Progressbar,
	},
	emits: ["itemCancel"],
})
export default class DropzoneItem extends Vue {
	//uploaded = false;

	//@ts-ignore
	declare $parent: Dropzone

	@Prop(Object)
	readonly item!: DropzoneFile

	@Emit("itemCancel")
	onItemCancel(e) {
		return { file: this.item, e }
	}

	get size() {
		return bytes(this.item.size)
	}

	get src() {
		return ""
	}

	update(file: DropzoneFile) {
		if (this.item.upload.uuid === file.upload.uuid) this.$forceUpdate()
	}

	created() {
		this.$parent.dropzone.on("uploadprogress", (file) => this.update(file))
		this.$parent.dropzone.on("success", (file) => this.update(file))
		this.$parent.dropzone.on("error", (file) => this.update(file))
		this.$parent.dropzone.on("canceled", (file) => this.update(file))
		this.$parent.dropzone.on("complete", (file) => this.update(file))
	}
}
</script>

<style lang="scss">
#thumb {
    width: 40px;
}
</style>
