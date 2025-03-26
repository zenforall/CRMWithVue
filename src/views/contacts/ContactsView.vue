<script setup lang="ts">

</script>

<template>
    <v-row style="margin-top: 10px;margin-bottom: 10px;">
      <v-col cols="2" style="display: flex;align-items: center">
        <v-label class="text-accent" style="font-size: 25px;margin-left: 5px;">Customers</v-label>
      </v-col>
      <v-col style="display: flex;align-items: center;">
        <v-btn color="primary" style="margin-right: 20px;">Create</v-btn>
        <v-text-field style="border: 1px solid grey; max-width: 600px;"
            class="d-none d-sm-block"
            density="compact"
            label="Search"
            prepend-inner-icon="mdi-magnify"
            variant="solo-filled"
            flat
            hide-details
            single-line></v-text-field>
      </v-col>
   </v-row>
    <v-divider :thickness="1" class="border-opacity-50"></v-divider>
   <v-row>

   </v-row>

</template>

<style scoped>

</style>
