<script setup lang="ts">

import { Qalendar } from "qalendar";

function addNewEvent() : void {
  window.alert("Add new Event");
}


// TODO: Utilizzare il componente leggendo la documentazione:
// https://tomosterlund.github.io/qalendar/
// https://github.com/tomosterlund

</script>

<template>
  <v-row class="fill-height">
    <v-col>
      <Qalendar></Qalendar>
    </v-col>
  </v-row>
</template>

<style>
@import "qalendar/dist/style.css";
</style>
