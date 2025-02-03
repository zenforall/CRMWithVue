<script setup lang="ts" >
import { onMounted,ref } from 'vue';
//import ChartComponent from '../components/ChartComponent.vue'

import { DoughnutChart } from 'vue-chart-3';
import { Chart, registerables } from "chart.js";

Chart.register(...registerables);

    const emit =defineEmits<{
      (event: "breadCrumbHandler", message: BreaCrumbItem[]): void;
    }>();

    onMounted(async () => {
      const breadCrumbItems :  BreaCrumbItem[] = [];
      breadCrumbItems.push(
         {
            title: "Home",
            disabled : false,
            href : ""
         }
      );

      emit("breadCrumbHandler",breadCrumbItems);
    })

    const testData = {
      labels: ['Paris', 'Nîmes', 'Toulon', 'Perpignan', 'Autre'],
      datasets: [
        {
          data: [30, 40, 60, 70, 5],
          backgroundColor: ['#77CEFF', '#0079AF', '#123E6B', '#97B0C4', '#A5C8ED'],
        },
      ],
    };

    const chartOptions = ref({
      responsive: true,
      scales: {
        y: {
          beginAtZero: true, // Impostiamo l'asse Y per iniziare da zero
        },
      },
      plugins: {
        legend: {
          position: 'top', // Posizione della legenda
        },
      },
    });

</script>

<template>
  <v-container>
    <div style="text-align: center; font-size: 30px;color: #42b883;">Dashboard</div>
    <DoughnutChart :chartData="testData" />

  </v-container>
</template>
