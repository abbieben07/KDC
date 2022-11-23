<template>
	<Modal ref="modal">
		<template #header>
			<span>Color Picker</span>
		</template>
		<div class="row">
			<div class="col-12">
				<div id="box" ref="box" />
			</div>
		</div>
	</Modal>
	<div ref="trigger" @click="modal.onShowModal">
		{{ modelValue }}
	</div>
</template>

<script lang="ts">
import IRO from "@jaames/iro";
import { Emit, Model, Options, Prop, Ref, Vue } from 'vue-decorator';
import Modal from "./Modal.vue";

@Options({
    components: {
        Modal
    },
    inheritAttrs: false,
    emits: ['update:modelValue'],
})
export default class Color extends Vue {

    picker!: IRO.ColorPicker

    @Ref("box")
    readonly box !: HTMLDivElement

    @Ref("trigger")
    readonly trigger !: HTMLDivElement

    @Ref("modal")
    readonly modal !: InstanceType<typeof Modal>

    @Emit("update:modelValue")
    onColorChanged(color: IRO.Color): string {
        return color.rgbaString
    }

    @Model('update:modelValue', { type: [String, Number] })
    readonly modelValue!: string | number

    @Prop({ type: Object, default: () => [] })
    readonly errors!: []

    @Prop({ type: String, default: "" })
    readonly label !: string

    mounted() {
        this.picker = IRO.ColorPicker(this.box, {
            // @ts-ignore
            color: this.modelValue,
            layoutDirection: 'horizontal',

        })
        this.picker.on("change:color", (color: IRO.Color) => this.onColorChanged(color))
    }
}


</script>

<style>
</style>
