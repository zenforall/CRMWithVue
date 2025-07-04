

<script lang="ts">

/*
import { defineComponent, computed, type PropType, type DefineComponent } from 'vue'
import { PieChart, BarChart, LineChart, RadarChart } from 'vue-chart-3'

const ChartComponent: DefineComponent<{
  type: 'pie' | 'bar' | 'line' | 'radar',
  chartData: any,
  chartOptions?: any,
}> = defineComponent({
  name: 'ChartComponent',
  props: {
    type: {
      type: String as PropType<'pie' | 'bar' | 'line' | 'radar'>,
      required: true,
    },
    chartData: {
      type: Object as PropType<any>,
      required: true,
    },
    chartOptions: {
      type: Object as PropType<any>,
      default: () => ({}),
    },
  },
  setup(props) {
    const chartComponent = computed(() => {
      switch (props.type) {
        case 'pie':
          return PieChart
        case 'bar':
          return BarChart
        case 'line':
          return LineChart
        case 'radar':
          return RadarChart
        default:
          throw new Error(`Tipo di grafico non supportato: ${props.type}`)
      }
    })

    return {
      chartComponent,
    }
  },
})

export default ChartComponent

*/
</script>

<template>
  <component :is="chartComponent" :chart-data="chartData" :options="chartOptions" />
</template>


