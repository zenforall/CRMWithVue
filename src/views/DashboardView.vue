<script setup lang="ts" >
import { onMounted,ref } from 'vue';
import ChartComponent from '../components/ChartComponent.vue'

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

    const chartData = ref({
      labels: ['Gen', 'Feb', 'Mar', 'Apr', 'Mag', 'Giu'],
      datasets: [
        {
          label: 'Vendite',
          backgroundColor: '#42A5F5', // Colore delle barre
          data: [50, 75, 100, 125, 150, 175], // Dati
        },
      ],
    });

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
    <ChartComponent :type="'bar'" :chartData="chartData" :chartOptions="chartOptions" ></ChartComponent>

  </v-container>
</template>
