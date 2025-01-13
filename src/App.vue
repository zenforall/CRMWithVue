<script setup lang="ts">
import { RouterLink, RouterView } from 'vue-router'

</script>

<template>
  <v-responsive class="border rounded">
    <v-app>
      <RouterView />
    </v-app>
  </v-responsive>
</template>

<style scoped>
header {
  line-height: 1.5;
}

.logo {
  display: block;
  margin: 0 auto 2rem;
}

</style>
