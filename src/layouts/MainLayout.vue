<script setup lang="ts">
import { ref } from 'vue';
import { RouterView } from 'vue-router'
import Menu from '../components/Menu.vue'
import Footer from '../components/Footer.vue'

const drawer = ref(true);

const toggleDrawer = () => {
      drawer.value = !drawer.value;
};

const items = ref([] as BreaCrumbItem[]);

function breadCrumbItemsHandler(message:BreaCrumbItem[]) : void {
  items.value = message;
}
</script>

<template>
  <v-app-bar>
    <v-app-bar-nav-icon @click="toggleDrawer"></v-app-bar-nav-icon>
    <v-toolbar-title style="color: #42b883;font-weight: bold;">CRM With Vue</v-toolbar-title>
  </v-app-bar>

  <v-navigation-drawer app v-model="drawer" :permanent="false" style="border: 0px;">
      <Menu @breadCrumbHandler="breadCrumbItemsHandler"/>
  </v-navigation-drawer>

  <!-- Contenuto principale -->
  <v-main>
      <v-breadcrumbs :items="items">
        <template v-slot:divider>
          <v-icon icon="mdi-forward"></v-icon>
        </template>
      </v-breadcrumbs>
      <RouterView @breadCrumbHandler="breadCrumbItemsHandler"/>
  </v-main>

  <!-- Footer -->
  <v-footer app>
    <Footer/>
  </v-footer>
</template>
