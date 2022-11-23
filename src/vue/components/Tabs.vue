<template>
    <ul class="nav" role="tablist">
        <slot />
    </ul>
</template>
<script lang="ts">
import { Options, Vue } from 'vue-decorator'

@Options({})
export default class Tabs extends Vue { }
</script>