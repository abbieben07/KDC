<template>
    <div class="text-center mp-container">
        <MediaPlayer ref="player" type="video" autoplay :volume="0" />
    </div>
</template>

<script lang="ts">
import MediaPlayer from '@/components/MediaPlayer.vue'
import { Options, Ref, Vue } from 'vue-decorator'

@Options({
	components: {
		MediaPlayer,
	},
	emits: ['loaded'],
})
export default class Webcam extends Vue {
	stream!: MediaStream

	@Ref('player')
	readonly player!: InstanceType<typeof MediaPlayer>

	async mounted() {
		this.stream = await navigator.mediaDevices.getUserMedia({ video: true, audio: true })
		console.log('here 2')
		this.player.video.srcObject = this.stream

		this.$emit('loaded', this.stream)
	}
}
</script>

<style lang="scss">
$height: 40vh;
.mp-container {
    background: black;
    height: $height !important;
    max-height: $height !important;
}
</style>
