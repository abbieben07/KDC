<template>
    <router-view />
</template>
<script lang="ts">
import Theme from '@/theme/js/main/app'
import Footer from '@/vue/layouts/App/Footer.vue'
import Header from '@/vue/layouts/App/Header.vue'
import SidebarLeft from '@/vue/layouts/App/SidebarLeft.vue'
import { Options, Prop, Vue } from 'vue-decorator'

@Options({
	components: {
		SidebarLeft,
		Header,
		Footer
	},
})
export default class App extends Vue {
	oneui!: Theme
	loading = true

	@Prop({ type: String, required: false })
	readonly title!: string

	@Prop({ type: Boolean, default: true })
	readonly banner!: boolean

	get app_name() {
		return process.env.MIX_APP_NAME
	}

	mounted() {
		this.oneui = new Theme()
		this.loading = false
	}
}
</script>

<style lang="scss">
@import '@/scss/app.scss';
#main-container > .content {
    width: 100% !important;
    padding-bottom: 1.875rem !important;
}
</style>
