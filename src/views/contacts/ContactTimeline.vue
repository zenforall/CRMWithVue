<script setup lang="ts">
import { ref } from 'vue';
import { formatDate }  from "@/utils/formatData";

const timelines = ref<ContactTimeline[]>([]);

const timeLineDescription = ref("");

function addNote() : void {
  if (timeLineDescription.value) {

    const newTimeLine : ContactTimeline = <ContactTimeline>{};
    newTimeLine.description = timeLineDescription.value;
    newTimeLine.id = new Date().getTime().toString();
    newTimeLine.creationDate = new Date();

    timelines.value.push(newTimeLine);
    timeLineDescription.value = "";
  }
}

</script>
<template>
  <v-card color="background" style="padding: 5px;" elevation="5">
    <v-row>
      <v-col>
        <v-label style="color: black;opacity: 100;">Timeline notes</v-label>
      </v-col>
      <v-col style="display: flex;justify-content: end;padding-bottom: 0;">
        <v-btn size="x-small" color="secondary"  icon="mdi-comment-plus-outline" @click="addNote"></v-btn>
        <!--
        <v-btn style="margin-left: 5px;" size="x-small" color="secondary"  icon="mdi-sort"></v-btn>
         -->
      </v-col>
    </v-row>
    <v-row>
      <v-col cols="10" style="padding-bottom: 0;padding-top: 0;">
        <v-textarea
            v-model="timeLineDescription"
            variant="underlined"
            label="Enter a note"
            density="compact"
            rows="3">
          </v-textarea>
      </v-col>
      <!--
      <v-col style="display: flex;justify-content: start; align-items: end;">
        <v-icon color="secondary" size="x-large">mdi-attachment</v-icon>
      </v-col>
    -->
    </v-row>
    <v-row v-if="timelines.length > 0">
      <v-data-table
      style="background-color: white;"
      :items="timelines"
      items-per-page="3"
      item-key="id"
      density="compact"
      select-strategy="all"
      :show-select="false"
      :items-per-page-options="[3,5]">
      <template v-slot:item.creationDate="{ item }">
        <span>{{ formatDate( item.creationDate,"it-IT") }}</span>
      </template>

      </v-data-table>
    </v-row>
  </v-card>
</template>
<style scoped>

</style>
