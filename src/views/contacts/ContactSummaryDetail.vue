<script setup lang="ts">


</script>
<template>
  <v-card color="white" style="padding: 5px;" border>
    <v-row>
      <v-col>
        <v-label>Customer</v-label>
      </v-col>
    </v-row>
    <v-form>
      <v-row>
        <!-- User Name -->
        <v-col>
          <v-text-field
            variant="underlined"
            label="First name"
            density="compact"
            required>
          </v-text-field>
          <v-text-field
            variant="underlined"
            label="Last name"
            density="compact"
            required>
          </v-text-field>
          <v-text-field
            variant="underlined"
            label="Address"
            density="compact"
            required>
          </v-text-field>
          <v-text-field
            variant="underlined"
            label="Mobile phone"
            density="compact"
            required>
          </v-text-field>
          <v-text-field
            variant="underlined"
            label="Email"
            density="compact"
            required>
          </v-text-field>

        </v-col>
      </v-row>
    </v-form>
    </v-card>
  </template>
<style scoped>


</style>
