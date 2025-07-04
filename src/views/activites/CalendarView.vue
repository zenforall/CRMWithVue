<script setup lang="ts">

import Calendar from '@/components/Calendar.vue';
import type { BreadCrumbItem } from '@/models/BreadCrumbItem';
import { onMounted, onUnmounted } from 'vue';


 const items = [] as string[];
    items.push("Activities");
    items.push("Calendar");

const emit =defineEmits<{
      (event: "breadCrumbHandler", message: BreadCrumbItem[]): void;
    }>();

  onUnmounted(async () => {
      //
    });


  onMounted(async () => {
    const breadCrumbItems :  BreadCrumbItem[] = [];

    breadCrumbItems.push(
          {
              title: "Activities",
              disabled : false,
              href : ""
          },
          {
              title: "Calendar",
              disabled : false,
              href : ""
          }
        );
    emit("breadCrumbHandler",breadCrumbItems);
  });

</script>

<template>

<v-card style="margin-right: 5px;margin-bottom: 10px;margin-top: 10px;background-color: #f9f9f9;" elevation="0">
  <v-row style="display: flex;align-items: center;background-color: white;border: solid black 0px;">
    <v-col style="margin-top: 10px;margin-left: 20px;padding: 10px;">
      <v-breadcrumbs :items="items" color="secondary">
        <template v-slot:divider>
          /
        </template>
       </v-breadcrumbs>
    </v-col>
  </v-row>
  <v-row style="display: flex;align-items: center;background-color: white;border: 0px solid black;">
    <v-col style="margin-top: 0px;margin-left: 20px;padding: 10px;">
       <v-label class="text-secondary" style="font-weight: bold;font-size: x-large;opacity: 0.87;">Calendar</v-label>
    </v-col>
    <v-col style="display: flex;justify-content: end;margin-right: 5px;margin-top: 0px;margin-bottom: 10px;padding: 10px;">
       <v-btn  style="margin-left: 5px;background-color:#03a840;color: #fff;">Create Event</v-btn>
    </v-col>
  </v-row>
</v-card>


   <Calendar></Calendar>
</template>

<style scoped>
:deep(.v-breadcrumbs--density-default) {
  padding: 0px;
}

:deep(.v-breadcrumbs-item ) {
  padding:0px;
}

</style>
