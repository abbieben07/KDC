<template>
    <button class="btn" :disabled="loading" type="submit">
        <span v-if="loading && !done" dusk="loader" class="spinner-border spinner-border-sm mr-2" role="status" aria-hidden="true" />
        {{ done ? label.done : loading ? label.loading : label.normal }}
    </button>
</template>

<script lang="ts">
import { Options, Prop, Vue } from 'vue-decorator'
import { ButtonLabel } from './Button'

@Options({})
export default class Button extends Vue {
	@Prop({ type: Boolean, default: false })
	readonly loading!: boolean

	@Prop({ type: Boolean, default: false })
	readonly done!: boolean

	@Prop({ type: Object, required: false })
	readonly label!: ButtonLabel
}
</script>

<style>

</style>
