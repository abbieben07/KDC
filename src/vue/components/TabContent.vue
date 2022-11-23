<template>
    <div class="tab-content">
        <slot />
    </div>
</template>
<script lang="ts">
import { Options, Vue } from 'vue-decorator'

@Options({})
export default class TabContent extends Vue { }
</script>