<script setup lang="ts">
import { ref } from 'vue';
import { useRouter } from 'vue-router';
import type { VTab } from 'vuetify/components';

const router = useRouter();
const tab = ref(1);

function backToContacts() : void {
  router.push("/customers");
}

</script>

<template>
  <v-card style="background-color: white;margin-right: 5px;">
    <v-snackbar :timeout="1000" color="success" location="center">
      <div style="text-align: center;">User Saved Successfully</div>
    </v-snackbar>

    <v-snackbar :timeout="1000" location="center" color="error">
      There were errors saving (check the log)
    </v-snackbar>

    <v-row style="display: flex;align-items: center;">
      <v-col cols="1" style="margin-top: 10px;">
        <v-btn color="primary" style="margin-left: 5px;" @click="backToContacts">&lt; BACK</v-btn>
      </v-col>
    </v-row>

    <v-tabs
      align-tabs="start"
      v-model="tab"
      color="deep-purple-accent-4">
      <v-tab :value="1">Summary</v-tab>
      <v-tab :value="2">Details</v-tab>
      <v-tab :value="3">Files</v-tab>
      <v-tab :value="4">Related</v-tab>
    </v-tabs>
    <v-card-text>
      <v-tabs-window v-model="tab">
        <v-tabs-window-item :value="1">
          One
        </v-tabs-window-item>
        <v-tabs-window-item :value="2">
          Two
        </v-tabs-window-item>
        <v-tabs-window-item :value="3">
          Three
        </v-tabs-window-item>
        <v-tabs-window-item :value="4">
          Four
        </v-tabs-window-item>
      </v-tabs-window>
    </v-card-text>

</v-card>

</template>

<style scoped>

:deep(.v-btn__content) {
  text-transform: none !important;
}

</style>
