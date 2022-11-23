<template>
    <div class="card card-rounded">
        <div v-if="hasHeader" class="card-header card-header-default">
            <slot name="header" />
        </div>
        <div class="card-body">
            <slot />
        </div>
        <div v-if="hasFooter" class="card-footer card-footer-default">
            <slot name="footer" />
        </div>
    </div>
</template>
<script lang="ts">
import { Vue } from 'vue-decorator';

export default class Card extends Vue {
	declare $el: HTMLDivElement

	get hasHeader() {
		return !!this.$slots.header
	}

	get hasFooter() {
		return !!this.$slots.footer
	}
}
</script>
