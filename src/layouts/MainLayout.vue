<script setup lang="ts">
import { ref } from 'vue';
import { RouterView } from 'vue-router'
import MenuList from '@/components/MenuList.vue'
//import Footer from '@/components/Footer.vue'
//import { useDisplay } from 'vuetify';
import { useAppStore } from "@/stores/app"
import { useRouter } from 'vue-router';
import type { BreadCrumbItem } from '@/models/BreadCrumbItem';
import { useIsMobile } from "@/composables/useIsMobile";

const { isMobile } = useIsMobile(); // Verifica se la risoluzione del dispositivo è Mobile
const router = useRouter();
const drawer = ref(true);
const appStore = useAppStore();
//const display = useDisplay();
const menu = ref(false); // Stato del menu

//const displayOnMobile = ref(false);
//const displayAfterClickingSearchButtonOnMobileView = ref(false);

/*
if ( display.name.value === 'lg') {
  drawer.value = true;
}

if (display.name.value === 'xs')
  displayOnMobile.value = true;
else
  displayOnMobile.value = false;
*/

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
  <v-app-bar color="background" elevation="0">
    <div style="border: 0px solid black;display: flex;width: 80%;flex-direction: row;">
      <v-app-bar-nav-icon color="primary" @click="toggleDrawer"></v-app-bar-nav-icon>

      <div style="display: flex; align-items: center;border: 0px solid black;">
        <img src="@/assets/logo.png" alt="CRM With Vue" style="max-height: 200px;width: auto;" />
      </div>
      <div v-show="!isMobile" style="width: 80%;display: flex;flex-direction: row;justify-content: center;border: 0px solid black;">
        <v-text-field
            class="d-none d-sm-block"
            density="compact"
            label="Mega Search"
            prepend-inner-icon="mdi-magnify"
            variant="outlined"
            style="max-width: 600px;"
            flat
            hide-details
            single-line>
        </v-text-field>
        <v-btn style="border: #03a840 solid 2px;margin-left: 10px;"
          icon
          size="small"
          class="rounded-circle">
          <v-icon color="#03a840">mdi-plus</v-icon>
        </v-btn>

        <!--
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
      </div>
    </div>
    <div style="border: 0px solid black;display: flex;width: 20%;flex-direction: row;justify-content: end;">
      <div style="display: flex;flex-direction: row;justify-content: end;border: 0px solid black;">
        <v-menu
          v-model="menu">
          <template #activator="{ props }">
            <v-btn style="border: #03a840 solid 2px;"
              v-bind="props"
              icon
              class="rounded-circle">
              <!-- <v-icon color="#03a840">mdi-account</v-icon> -->
              SG
            </v-btn>
          </template>
              <!-- Menu a discesa -->
              <v-list style="margin-top: 5px" class="custom-list">
                <v-list-item disabled>
                  <v-list-item-title>Version 0.6.1</v-list-item-title>
                </v-list-item>
                <v-list-item>
                  <v-divider></v-divider>
                </v-list-item>
                <v-list-item link @click="logout">
                  <v-list-item-title>Log out</v-list-item-title>
                </v-list-item>
              </v-list>
        </v-menu>
      </div>
    </div>
  </v-app-bar>

  <v-navigation-drawer app v-model="drawer" :permanent="true">
      <!--<Menu @breadCrumbHandler="breadCrumbItemsHandler"/>-->
    <MenuList @breadCrumbHandler="breadCrumbItemsHandler"/>
  </v-navigation-drawer>

  <!-- Contenuto principale -->
  <v-main style="margin-left: 5px;background-color: #f2f2f2;">
     <!--
      <v-breadcrumbs :items="items" color="secondary">
        <template v-slot:divider>
          /
        </template>
       </v-breadcrumbs>
     -->
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

.custom-list .v-list-item--density-default.v-list-item--one-line {
  min-height: 10px !important;
  padding-top: 0px !important;
  padding-bottom: 0px !important;
}

.v-navigation-drawer--left {
 border-right-width: 0px !important;
}

</style>
