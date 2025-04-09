<script setup lang="ts">
import { ref } from 'vue';
import { useRouter } from 'vue-router';
import type { VTab } from 'vuetify/components';
import ContactSummaryDetail from './ContactSummaryDetail.vue';
import ContactTimeline from './ContactTimeline.vue';
import ContactStakeHoldersDetail from './ContactStakeHoldersDetail.vue';
import ContactCompetitorsDetail from './ContactCompetitorsDetail.vue';

const router = useRouter();
const tab = ref(1);

function backToContacts() : void {
  router.push("/customers");
}

</script>

<template>
  <v-card style="background-color: white;margin-right: 5px;" elevation="1">
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

    <v-row>
     <v-col>
      <v-tabs
        align-tabs="start"
        v-model="tab">
        <v-tab :value="1">Summary</v-tab>
        <v-tab :value="2">Details</v-tab>
        <v-tab :value="3">Files</v-tab>
      </v-tabs>
      <v-card-text>
        <v-tabs-window v-model="tab">
          <v-tabs-window-item :value="1">
            <v-row style="margin-top:5px;padding: 5px;">
              <v-col>
                <ContactSummaryDetail></ContactSummaryDetail>
              </v-col>
              <v-col>
                <ContactTimeline></ContactTimeline>
              </v-col>
              <v-col>
                <v-row>
                    <v-col>
                      <ContactCompetitorsDetail></ContactCompetitorsDetail>
                    </v-col>
                </v-row>
              </v-col>
            </v-row>
          </v-tabs-window-item>
          <v-tabs-window-item :value="2">
            Two
          </v-tabs-window-item>
          <v-tabs-window-item :value="3">
            Three
          </v-tabs-window-item>
        </v-tabs-window>
      </v-card-text>
     </v-col>
    </v-row>
</v-card>

</template>

<style scoped>

:deep(.v-btn__content) {
  text-transform: none !important;
}

:deep(.text-deep-purple-accent-4) {
  color: black !important; /* Cambia colore testo */
}
</style>
