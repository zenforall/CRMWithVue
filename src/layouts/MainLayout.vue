<script setup lang="ts">

import Header from "../components/Header.vue";
import Footer from "../components/Footer.vue"
import Menu from "../components/Menu.vue"
import { RouterView } from "vue-router";

</script>

<template>
    <v-row>
        <v-col cols="2">
          <Menu/>
        </v-col>
        <v-col cols="10">
          <Header/>
          <RouterView/>
        </v-col>
    </v-row>
    <v-row>
      <Footer/>
    </v-row>
</template>
