<template>
    <div class="progress" :style="`height: ${height}`">
        <div class="progress-bar" v-bind="$attrs" role="progressbar" :style="`width: ${progress}%`">
            <slot />
        </div>
    </div>
</template>

<script lang="ts">
import { Options, Prop, Vue } from 'vue-decorator'

@Options({
	inheritAttrs: false,
})
export default class Progressbar extends Vue {
	@Prop({ type: Number, default: 0 })
	readonly progress!: number

	@Prop({ type: String, default: '' })
	readonly type!: string

	@Prop({ type: String, default: '20px' })
	readonly height!: string
}
</script>
