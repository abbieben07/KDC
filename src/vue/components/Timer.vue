<template>
	<div class="d-flex justify-content-center">
		<h1>{{ time }}</h1>
	</div>
</template>

<script lang="ts">
import ETimer from 'easytimer.js'
import { Vue } from 'vue-decorator'

export default class Timer extends Vue {
	timer = new ETimer()
	time = '00:00:00'

	start() {
		this.timer.start()
	}

	pause() {
		this.timer.pause()
	}

	stop() {
		this.timer.stop()
	}

	isPaused() {
		this.timer.isPaused()
	}

	reset() {
		this.timer.reset()
	}

	mounted() {
		this.timer.addEventListener('secondsUpdated', () => (this.time = this.timer.getTimeValues().toString()))
	}
}
</script>

<style></style>
