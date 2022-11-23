<template>
    <li class="nav-item">
        <a ref="view" v-bind="$attrs" class="nav-link" data-bs-toggle="tab" :data-bs-target="target" role="tab" dusk="tab" @click="show">
            <slot />
        </a>
    </li>
</template>

<script lang="ts">
import { Tab as BTab } from 'bootstrap'
import { Options, Prop, Ref, Vue } from 'vue-decorator'

@Options({
	inheritAttrs: false
})
export default class Tab extends Vue {
	tab!: BTab

	@Prop(String)
	readonly target!: string

	@Ref('view')
	readonly view!: HTMLAnchorElement

	show() {
		this.tab.show()
	}

	mounted() {
		this.tab = new BTab(this.view)
	}
}
</script>
<style lang="scss">
.nav-link {
	cursor: pointer;
}
</style>