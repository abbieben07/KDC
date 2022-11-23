<template>
    <canvas ref="view" />
</template>
<script lang="ts">
import variables from "@/scss/variables.module.scss"
import { Chart as BaseChart, ChartConfiguration, registerables } from 'chart.js'
import 'chartjs-adapter-moment'
import { merge } from 'lodash'
import { Options, Prop, Ref, Vue } from 'vue-decorator'

BaseChart.register(...registerables)

@Options({})
export default class Chart extends Vue {
    chart !: BaseChart

    @Ref("view")
    readonly view!: HTMLCanvasElement

    @Prop({ type: Object, default: () => ({}) })
    readonly options!: ChartConfiguration

    get defaults(): ChartConfiguration {
        return {
            type: 'bar',
            data: {
                //@ts-ignore
                datasets: [{
                    backgroundColor: variables.primary
                }]
            },
            options: {
                scales: {
                    x: {
                        type: 'time',
                        time: {
                            unit: 'year'
                        },
                        adapters: {
                            date: ""
                        }
                    }
                }
            }
        }
    }

    mounted() {
        let opts = merge(this.defaults, this.options)
        this.chart = new BaseChart(this.view, opts)
    }
}
</script>