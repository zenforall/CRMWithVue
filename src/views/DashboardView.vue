<script setup lang="ts" >
import { onMounted } from 'vue';
import { DoughnutChart,BarChart,LineChart } from 'vue-chart-3';
//import { Chart, registerables } from "chart.js";
import type { BreadCrumbItem } from '@/models/BreadCrumbItem';

Chart.register(...registerables);

    onMounted(async () => {
      const breadCrumbItems :  BreadCrumbItem[] = [];
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
          backgroundColor: ['#42b883', '#35495e', '#ffb400', '#f2f2f2', '#e07a5f'],
        },
      ],
    };

    const emit =defineEmits<{
      (event: "breadCrumbHandler", message: BreadCrumbItem[]): void;
    }>();

</script>

<template>
  <v-container>
    <v-row>
      <v-col>
        <v-card elevation="1" color="background">
          <DoughnutChart :chartData="testData" style="margin-bottom: 10px;"/>
        </v-card>
      </v-col>
      <v-col>
        <v-card elevation="1" color="background">
          <BarChart :chartData="testData" />
        </v-card>
      </v-col>
      <v-col>
        <v-card elevation="1" color="background">
          <LineChart :chartData="testData" style="margin-bottom: 10px;"/>
        </v-card>
      </v-col>
      <!--
      <v-col cols="12" md="3" lg="3">
        <v-card elevation="5" color="background">
          <BarChart :chartData="testData" />
        </v-card>
      </v-col>
      <v-col cols="12" md="3" lg="3">
        <v-card elevation="5" color="background">
          <LineChart :chartData="testData" style="margin-bottom: 10px;"/>
        </v-card>
      </v-col>
    -->
    </v-row>
      <!--
      <v-col cols="12" md="6" lg="6">
        <v-card elevation="5" color="background">
          <LineChart :chartData="testData" style="margin-bottom: 10px;"/>
        </v-card>
        <v-card elevation="5">
          <PieChart :chartData="testData" />
        </v-card>
      </v-col>
    </v-row>
  -->
  </v-container>
</template>
