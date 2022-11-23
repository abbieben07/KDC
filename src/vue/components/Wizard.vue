<template>
	<div id="wizard">
		<slot name="top" />
		<div ref="content" class="block block-rounded step-content">
			<div class="block-header block-header-default">
				<slot name="title" />
			</div>

			<div class="card-body">
				<slot />
			</div>
		</div>
	</div>
</template>

<script lang="ts">
import {  Vue, Ref } from 'vue-decorator'
import "jquery.steps"

export default class Wizard extends Vue {
	steps = 0;
	step = 1;

	@Ref('content')
	readonly content!: HTMLDivElement

	back(){
		this.step--
	}

	next(){
		this.step++
	}

}
</script>