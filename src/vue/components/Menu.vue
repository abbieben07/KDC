<template>
    <ul class="nav-main" :class="styles">
        <li v-for="(itemA, i) in menu" :key="i" class="nav-main-item">
            <a class="nav-main-link" :class="itemA.submenu ? 'nav-main-link-submenu' : ''" :href="route(itemA.name)" :data-toggle="itemA.submenu ? 'submenu' : ''">
                <i class="nav-main-link-icon" :class="itemA?.icon"></i>
                <span class="nav-main-link-name">{{ itemA.label }}</span>
            </a>
            <ul v-if="itemA.submenu" class="nav-main-submenu">
                <li v-for="(itemB, j) in itemA.submenu" :key="j" class="nav-main-item">
                    <a class="nav-main-link" :class="itemB.submenu ? 'nav-main-link-submenu' : ''" :data-toggle="itemB.submenu ? 'submenu' : ''" aria-haspopup="true" aria-expanded="false" :href="route(itemB.name)">
                        <i class="nav-main-link-icon" :class="itemB?.icon"></i>
                        <span class="nav-main-link-name">{{ itemB.label }}</span>
                    </a>
                    <ul v-if="itemB.submenu" class="nav-main-submenu">
                        <li v-for="(itemC, k) in itemB.submenu" :key="k" class="nav-main-item">
                            <a class="nav-main-link" :href="route(itemC.name)">
                                <i class="nav-main-link-icon" :class="itemC?.icon"></i>
                                <span class="nav-main-link-name">{{ itemC.label }}</span>
                            </a>
                        </li>
                    </ul>
                </li>
            </ul>
        </li>
    </ul>
</template>

<script lang="ts">
import { Options, Prop, Vue } from "vue-decorator"
import { MenuItem } from "./Menu"

@Options({
	name: 'Menu'
})
export default class Menu extends Vue {
	@Prop(Array)
	readonly menu !: MenuItem[]

	@Prop({ type: Boolean, default: false })
	readonly boxed!: boolean

	get styles() {
		return this.boxed ? "nav-main-dark nav-main-horizontal nav-main-hover" : ''
	}
}
</script>

<style>
</style>
