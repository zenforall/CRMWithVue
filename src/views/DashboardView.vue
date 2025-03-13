<script setup lang="ts" >
import { onMounted,ref } from 'vue';
import { DoughnutChart,BarChart,LineChart,PieChart } from 'vue-chart-3';
import { Chart, registerables } from "chart.js";

Chart.register(...registerables);

    onMounted(async () => {
      ;
    })

    const testData = {
      labels: ['Paris', 'Nîmes', 'Toulon', 'Perpignan', 'Autre'],
      datasets: [
        {
          data: [30, 40, 60, 70, 5],
          backgroundColor: ['#42b883', '#35495e', '#ffb400', '#f2f2f2', '#e07a5f'],
        },
      ],
    };
</script>

<template>
  <v-container>
    <v-row>
      <v-col cols="12" md="6" lg="6">
        <DoughnutChart :chartData="testData" style="margin-bottom: 10px;"/>
        <BarChart :chartData="testData" />
      </v-col>
      <v-col cols="12" md="6" lg="6">
        <LineChart :chartData="testData" style="margin-bottom: 10px;"/>
        <PieChart :chartData="testData" />
      </v-col>
    </v-row>
  </v-container>
</template>
