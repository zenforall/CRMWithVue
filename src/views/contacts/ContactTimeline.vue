<script setup lang="ts">


</script>
<template>
  <v-card color="white" style="padding: 5px;" border>
    <v-row>
      <v-col>
        <v-label>Timeline</v-label>
      </v-col>
      <v-col style="display: flex;justify-content: end">
        <v-btn size="x-small"  icon="mdi-note-plus-outline"></v-btn>
        <v-btn style="margin-left: 5px;" size="x-small" icon="mdi-sort"></v-btn>
      </v-col>
    </v-row>
    <v-row>
      <v-col>
        <v-text-field
            append-icon="mdi-attachment"
            variant="underlined"
            label="Enter a note"
            density="compact"
            required>
          </v-text-field>
      </v-col>
    </v-row>
  </v-card>

</template>
<style scoped>


</style>
