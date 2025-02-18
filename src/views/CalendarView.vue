<script setup lang="ts">

function addNewEvent() : void {
  window.alert("Add new Event");
}


// TODO: Utilizzare il componente leggendo la documentazione:
// https://github.com/richardtallent/vue-simple-calendar

</script>

<template>
  <v-row class="fill-height">
    <v-col>
        <v-calendar
          ref="calendar"
          color="primary"
          type="month"
          @click="addNewEvent">
        </v-calendar>
    </v-col>
  </v-row>
</template>

<style>

</style>
