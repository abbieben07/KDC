<template>
    <div class="invalid-feedback" :class="showErrors">
        <span v-for="(error, i) in errors" :key="i" class="d-block">{{ error }}</span>
    </div>
</template>

<script lang="ts">
import { Vue, Prop } from 'vue-decorator'

export default class Errors extends Vue {
	@Prop({ type: Object, default: () => [] })
	readonly errors!: []

	get showErrors() {
		return this.errors.length ? 'd-inline-block' : ''
	}
}
</script>

<style></style>
