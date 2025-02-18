<script setup lang="ts">
import { onMounted, ref } from 'vue'

import CalendarViewType from './CalendarViewType.vue'

onMounted(async () => {
})

</script>

<template>
  <v-row class="fill-height">
    <v-col>
      <div style="display: flex;direction: row; justify-content: start; align-items:center; width: 100%; margin-bottom: 10px;">
        <v-btn color="#42b883" rounded>Today</v-btn>
        <v-btn icon="mdi-page-first" size="small" style="margin-left: 20px;"></v-btn>
        <v-btn icon="mdi-page-last" size="small" style="margin-left: 20px;"></v-btn>
        <v-label style="margin-left: 20px;font-weight: bold; ">FEBRUARY 2025</v-label>
      </div>

      <CalendarViewType />
    </v-col>
  </v-row>
</template>

<style>

</style>
