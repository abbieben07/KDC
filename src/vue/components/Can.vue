<template>
    <slot v-if="can" />
</template>

<script lang="ts">
//import Model from '@/ts/models/Model';
import { Prop, Vue } from 'vue-decorator';

export default class Can extends Vue {
    @Prop(String)
    readonly ability !: string

    @Prop([String, Object])
    readonly model !: string;// | Model;

    get can(): boolean {
        return true //this.$gate.allow(this.ability, this.model);
    }
}
</script>
