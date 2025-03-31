<script setup lang="ts">
import { ref,onMounted } from 'vue';
import { RouterView } from 'vue-router'
import MenuList from '@/components/MenuList.vue'
import Footer from '@/components/Footer.vue'
import { useDisplay } from 'vuetify';
import { useAppStore } from "@/stores/app"
import { useRouter } from 'vue-router';
import type { BreadCrumbItem } from '@/models/BreadCrumbItem';

const router = useRouter();
const drawer = ref(false);
const appStore = useAppStore();
const display = useDisplay();
const menu = ref(false); // Stato del menu

const displayOnMobile = ref(false);
const displayAfterClickingSearchButtonOnMobileView = ref(false);

if ( display.name.value === 'lg') {
  drawer.value = true;
}

if (display.name.value === 'xs')
  displayOnMobile.value = true;
else
  displayOnMobile.value = false;

const toggleDrawer = () => {
      drawer.value = !drawer.value;
};

const items = ref([] as BreadCrumbItem[]);

function breadCrumbItemsHandler(message:BreadCrumbItem[]) : void {
  items.value = message;
}

function logout(): void {
  appStore.logout();
  router.push("/");
}

/*
function manageSearchForMobileView() : void {
  displayAfterClickingSearchButtonOnMobileView.value = true;
}
*/

</script>

<template>
  <v-app-bar>
    <v-app-bar-nav-icon @click="toggleDrawer"></v-app-bar-nav-icon>

    <div style="display: flex; align-items: center;width: 80%;">
      <v-toolbar color="surface">
      <v-toolbar-title  class="text-secondary">CRM*With*Vue</v-toolbar-title>

      <!--
      <v-text-field
          class="d-none d-sm-block"
          density="compact"
          label="Search"
          prepend-inner-icon="mdi-magnify"
          variant="solo-filled"
          flat
          hide-details
          single-line></v-text-field>


      <v-text-field
          v-show="displayOnMobile"
          density="compact"
          label="Search"
          prepend-inner-icon="mdi-magnify"
          variant="solo-filled"
          flat
          hide-details
          single-line></v-text-field>

          <v-btn
              @click="manageSearchForMobileView"
            icon
            class="d-xs-block d-sm-none rounded-circle">
            <v-icon>mdi-magnify</v-icon>
          </v-btn>
        -->

        </v-toolbar>
    </div>
    <div style="width: 20%;display: flex;flex-direction: row;justify-content: end;">
      <v-menu
        v-model="menu">
        <template #activator="{ props }">
          <v-btn
            v-bind="props"
            icon
            class="rounded-circle">
            <v-icon>mdi-account</v-icon>
          </v-btn>
        </template>
            <!-- Menu a discesa -->
            <v-list style="margin-top: 5px">
              <v-list-item link @click="logout">
                <v-list-item-title><v-icon>mdi-logout</v-icon> Logout</v-list-item-title>
              </v-list-item>
            </v-list>
      </v-menu>
    </div>
  </v-app-bar>

  <v-navigation-drawer app v-model="drawer" :permanent="false" style="border: 0px solid black">
      <!--<Menu @breadCrumbHandler="breadCrumbItemsHandler"/>-->
      <MenuList @breadCrumbHandler="breadCrumbItemsHandler"/>
  </v-navigation-drawer>

  <!-- Contenuto principale -->
  <v-main style="margin-left: 5px;">
      <v-breadcrumbs :items="items" color="secondary">
        <template v-slot:divider>
          /
        </template>
       </v-breadcrumbs>
      <RouterView @breadCrumbHandler="breadCrumbItemsHandler"/>
  </v-main>

  <!-- Footer -->
  <!--
  <v-footer class="bg-background" app>
    <Footer/>
  </v-footer>
-->
</template>
<style>
.rounded-circle {
  border-radius: 50%;
  border: solid black 1px;
}

.v-breadcrumbs-item {
  font-weight: normal;
}

.v-toolbar-title__placeholder {
  font-weight: normal;
}

</style>
