<script setup lang="ts">
import { ref } from 'vue';
import { RouterView } from 'vue-router'
import Menu from '../components/Menu.vue'
import MenuList from '../components/MenuList.vue'
import Footer from '../components/Footer.vue'
import { useDisplay } from 'vuetify';
import { useAppStore } from "../stores/app"
import { useRouter } from 'vue-router';

const router = useRouter();

const drawer = ref(false);

const appStore = useAppStore();

const display = useDisplay();

const menu = ref(false); // Stato del menu

if ( display.name.value === 'lg') {
  drawer.value = true;
}


const toggleDrawer = () => {
      drawer.value = !drawer.value;
};

const items = ref([] as BreaCrumbItem[]);

function breadCrumbItemsHandler(message:BreaCrumbItem[]) : void {
  items.value = message;
}

function logout(): void {
  appStore.logout();
  router.push("/");
}


</script>

<template>
  <v-app-bar>
    <v-app-bar-nav-icon @click="toggleDrawer"></v-app-bar-nav-icon>

    <div style="display: flex; align-items: center;width: 80%;">
      <v-toolbar-title style="color: #42b883">CRM With Vue</v-toolbar-title>
    <v-text-field
        density="compact"
        label="Search"
        prepend-inner-icon="mdi-magnify"
        variant="solo-filled"
        flat
        hide-details
        single-line
      ></v-text-field>
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
            <v-list>
              <v-list-item link>
                <v-list-item-title>Opzione 1</v-list-item-title>
              </v-list-item>
              <v-list-item link>
                <v-list-item-title>Opzione 2</v-list-item-title>
              </v-list-item>
              <v-list-item link>
                <v-list-item-title>Opzione 3</v-list-item-title>
              </v-list-item>
            </v-list>
      </v-menu>

      <v-btn icon @click="logout">
         <v-icon>mdi-logout</v-icon>
      </v-btn>
    </div>
  </v-app-bar>

  <v-navigation-drawer app v-model="drawer" :permanent="false" style="border: 0px;">
      <!--<Menu @breadCrumbHandler="breadCrumbItemsHandler"/>-->
      <MenuList @breadCrumbHandler="breadCrumbItemsHandler"/>
  </v-navigation-drawer>

  <!-- Contenuto principale -->
  <v-main>
      <v-breadcrumbs :items="items" color="#42b883">
        <template v-slot:divider>
          <!--<v-icon icon="mdi-forward"></v-icon>-->
          >
        </template>
      </v-breadcrumbs>
      <RouterView @breadCrumbHandler="breadCrumbItemsHandler"/>
  </v-main>

  <!-- Footer -->
  <v-footer app>
    <Footer/>
  </v-footer>
</template>
<style>
.rounded-circle {
  border-radius: 50%;
  border: solid black 1px;
}

.v-overlay__content {
  margin-top: 15px;
}

</style>
