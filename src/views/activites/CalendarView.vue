<script setup lang="ts">

import Calendar from '@/components/Calendar.vue';
import type { BreadCrumbItem } from '@/models/BreadCrumbItem';
import { onMounted, onUnmounted } from 'vue';

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
   <Calendar></Calendar>
</template>

<style>


</style>
