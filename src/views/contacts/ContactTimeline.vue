<script setup lang="ts">
import { onMounted, onUnmounted, ref } from 'vue';
import { formatDate }  from "@/utils/formatData";

const headers = ref<TableHeader[]>([]);
const timelines = ref<ContactTimeline[]>([]);

const timeLineDescription = ref("");

onUnmounted(async () => {
      //
})
onMounted(async () => {
  headers.value.push({
            title : "Note",
            value: "description",
            sortable: true
        });

  headers.value.push({
      title : "Date",
      value: "creationDate",
      sortable: true
  });

  headers.value.push({
      title : "Actions",
      value: "actions",
      sortable: true
  });
})

function addNote() : void {
  if (timeLineDescription.value) {

    const newTimeLine : ContactTimeline = <ContactTimeline>{};
    newTimeLine.description = timeLineDescription.value;

    if (newTimeLine.description.length > 20) {
      newTimeLine.description = newTimeLine.description.substring(0,20)+" ...";
    }

    newTimeLine.id = new Date().getTime().toString();
    newTimeLine.creationDate = new Date();

    timelines.value.push(newTimeLine);
    timeLineDescription.value = "";
  }
}

</script>
<template>
  <v-card color="background" style="padding: 5px;" elevation="1">
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
      :headers="headers"
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
      <template v-slot:item.actions="{ item }">
        <div style="text-wrap: nowrap;">
            <v-icon color="secondary" class="me-2" size="large">mdi-pencil</v-icon>
            <v-icon color="secondary" class="me-2" size="large">mdi-delete</v-icon>
        </div>
      </template>

      </v-data-table>
    </v-row>
  </v-card>
</template>
<style scoped>

</style>
