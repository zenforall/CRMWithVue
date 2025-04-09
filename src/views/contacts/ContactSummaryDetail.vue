<script setup lang="ts">


</script>
<template>
  <v-card color="background" elevation="1" style="padding: 5px;">
    <v-row>
      <v-col>
        <v-label style="color: black;opacity: 100;">Customer</v-label>
      </v-col>
    </v-row>
    <v-form>
      <v-row>
        <!-- User Name -->
        <v-col>
          <v-text-field
            style="color: black;"
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
      <v-row>
      <v-col cols="12" style="margin-bottom: 5px;">
          <div class="right-buttons">
            <v-btn
            color="primary"
                @click="">
            SAVE
          </v-btn>
          <v-btn
                  @click=""
                  color="secondary">
              CANCEL
            </v-btn>
          </div>
       </v-col>
    </v-row>
    </v-form>
    </v-card>
  </template>
<style scoped>

.right-buttons {
  display: flex;              /* Abilita Flexbox per i pulsanti a destra */
  justify-content: end;
  gap: 5px;                  /* Spazio tra i pulsanti a destra */
}

</style>
