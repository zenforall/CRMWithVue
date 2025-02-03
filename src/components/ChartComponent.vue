<template>
  <div style="margin: 1px solid black;">
    <DoughnutChart :chartData="testData" />
  </div>
</template>

<script lang="ts">
import { defineComponent, type PropType, computed } from 'vue'
import { PieChart, BarChart, LineChart, RadarChart,DoughnutChart } from 'vue-chart-3'
import {
  Chart as ChartJS,
  Title,
  Tooltip,
  Legend,
  ArcElement,
  BarElement,
  LineElement,
  PointElement,
  CategoryScale,
  LinearScale,
  RadialLinearScale,
} from 'chart.js'

// Registra i moduli di Chart.js
ChartJS.register(
  Title,
  Tooltip,
  Legend,
  ArcElement,
  BarElement,
  LineElement,
  PointElement,
  CategoryScale,
  LinearScale,
  RadialLinearScale
)

export default defineComponent({
  name: 'ChartComponent',
  props: {
    type: {
      type: String as PropType<'pie' | 'bar' | 'line' | 'radar'>,
      required: true,
    },
    chartData: {
      type: Object as PropType<any>, // Tipo basato su Chart.js
      required: true,
    },
    chartOptions: {
      type: Object as PropType<any>, // Tipo basato su Chart.js
      default: () => ({}),
    },
  },
  setup(props) {
    // Mappa il tipo al componente appropriato
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
</script>
