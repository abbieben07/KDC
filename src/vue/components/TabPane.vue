<template>
    <div class="tab-pane fade" role="tabpanel">
        <div class="container-fluid">
            <slot />
        </div>
    </div>
</template>
<script lang="ts">
import { Options, Vue } from 'vue-decorator'

@Options({})
export default class TabPane extends Vue { }
</script>