<script setup lang="ts" >
import { onMounted } from 'vue';


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

</script>

<template>
  <v-container>
    <div style="text-align: center; font-size: 30px; font-weight: bold;color: #42b883;">Dashboard</div>
  </v-container>
</template>
