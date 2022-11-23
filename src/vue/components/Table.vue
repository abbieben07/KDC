<template>
	<div>
		<table class="table">
			<thead>
				<th v-for="header in headers" :key="header">{{ header }}</th>
			</thead>
			<slot />
			<tfoot>
				<th v-for="footer in footers" :key="footer">{{ footer }}</th>
			</tfoot>
		</table>
	</div>
</template>

<script lang="ts">
import { Prop, Vue } from 'vue-decorator'

export default class Table extends Vue {
    @Prop({type: Array, default: () => []})
    readonly headers!: string[];

    @Prop({type: Array, default: () => []})
    readonly footers!: string[];
}
</script>

<style>
</style>