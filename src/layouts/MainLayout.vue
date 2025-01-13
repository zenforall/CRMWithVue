<script setup lang="ts">
import { ref } from 'vue';
import { RouterView } from 'vue-router'
import Menu from '../components/Menu.vue'

const drawer = ref(true);

const toggleDrawer = () => {
      drawer.value = !drawer.value;
    };


</script>

<template>
  <v-app-bar>
    <v-app-bar-nav-icon @click="toggleDrawer"></v-app-bar-nav-icon>
    <v-toolbar-title style="color: #42b883;font-weight: bold;">CRM With Vue</v-toolbar-title>
  </v-app-bar>

  <v-navigation-drawer app v-model="drawer" :permanent="false">
      <Menu/>
  </v-navigation-drawer>

  <!-- Contenuto principale -->
  <v-main>
    <RouterView/>
  </v-main>

  <!-- Footer -->
  <v-footer app>
    <v-col class="text-center" style="color: #42b883;">© 2025 CRM With Vue</v-col>
  </v-footer>
</template>
