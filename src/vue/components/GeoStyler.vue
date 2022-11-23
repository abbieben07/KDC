<!-- eslint-disable vue/attribute-hyphenation -->
<template>
    <div class="border border-dark p-4 pt-5 pb-2 rounded border-form">
        <Editor ref="editor" :compact="true" :style="modelValue" ruleRenderType="SLD" :enableClassification="true" @styleChange="onStyleChange" />
    </div>
</template>
<script lang="ts">
import { Style as StyleComponent } from "geostyler"
import { Style } from "geostyler-style"
import { applyReactInVue } from "veaury"
import { Emit, Model, Options, Ref, Vue } from "vue-decorator"

@Options({
    components: {
        Editor: applyReactInVue(StyleComponent)
    }
})
export default class GeoStyler extends Vue {
    @Ref("editor")
    readonly editor !: InstanceType<typeof StyleComponent>

    @Model("update:modelValue", { type: [Object] })
    readonly modelValue!: Style


    @Emit("update:modelValue")
    onStyleChange(value: Style) {
        return value
    }

}
</script>
<style lang="scss">
@import '~antd/dist/antd.css';
@import '~geostyler/browser/geostyler.css';
@import '@/scss/variables';
@import '@/theme/scss/main.scss';

//$body-bg : #CCC;
//$input-border-color: #AAA;

body {
    background-color: $body-bg;
}

.editor {
    border: 1px solid black;
}

.border-form {
    border-color: $input-border-color !important;
}
</style>
