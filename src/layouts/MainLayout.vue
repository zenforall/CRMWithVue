<script setup lang="ts">

import Header from "../components/Header.vue";
import Footer from "../components/Footer.vue"
import Menu from "../components/Menu.vue"
import { RouterView } from "vue-router";

</script>

<template>
  <div>
    <div>
    <Menu/>

      <Header />
      <RouterView />
    </div>

    <Footer/>
  </div>
</template>
