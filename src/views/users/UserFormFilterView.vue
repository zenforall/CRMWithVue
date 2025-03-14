<script setup lang="ts">
import { ref } from 'vue'

const emitUserFilterEvent = defineEmits<{
  (event: 'openCloseUserFilterDrawerHandler', message: string): void
  (event: 'doFilterUsersHandler', message: UserFilter): void
  (event: 'doResetFilterUsersHandler', message: string): void
}>()

const filter = ref<UserFilter>({
  userName: '',
  activationDateFrom: null,
  activationDateTo: null,
  id: '',
  password: '',
  email: '',
  company: '',
  activationDate: null,
  locale: '',
  localeLanguage : '',
  enabled: false,
})

function closeDrawer(): void {
  emitUserFilterEvent('openCloseUserFilterDrawerHandler', 'DO_SOMETHING')
}

function doFilter(): void {
  emitUserFilterEvent('doFilterUsersHandler',filter.value);
}

function doReset(): void {
  filter.value.userName = "";
  filter.value.email = "";
  filter.value.company = "";
  filter.value.activationDateFrom = null;
  filter.value.activationDateTo = null;
  filter.value.enabled = false;

  emitUserFilterEvent('doResetFilterUsersHandler',"DO_RESET");
}
</script>

<template>
  <v-row>
    <v-col cols="12">
      <v-icon class="me-2" size="small" @click="closeDrawer">mdi-close</v-icon>
    </v-col>
    <v-col cols="12">
      <v-text-field
        v-model="filter.userName"
        label="User Name"
        width="90%"
        style="margin-left: 5px"
        density="compact"
      >
      </v-text-field>
    </v-col>

    <!-- Email -->
    <v-col cols="12">
      <v-text-field
        v-model="filter.email"
        label="Email"
        width="90%"
        style="margin-left: 5px"
        density="compact"
      ></v-text-field>
    </v-col>
    <!-- Email -->
    <v-col cols="12">
      <v-text-field
        v-model="filter.company"
        label="Company"
        width="90%"
        style="margin-left: 5px"
        density="compact"
      ></v-text-field>
    </v-col>

    <v-col cols="12">
      <v-date-input
        v-model="filter.activationDateFrom"
        label="From"
        width="90%"
        density="compact"
      >
      </v-date-input>
    </v-col>
    <v-col cols="12">
      <v-date-input
        v-model="filter.activationDateTo"
        width="90%"
        label="To"
        density="compact"
      >
      </v-date-input>
    </v-col>
    <v-col cols="12">
      <v-checkbox
        v-model="filter.enabled"
        label="Enabled"
        density="compact"
      ></v-checkbox>
    </v-col>
  </v-row>
  <v-row>
    <v-col cols="12" style="padding: 0px">
      <div
        style="
          width: 100%;
          display: flex;
          flex-direction: row;
          justify-content: center;">
        <v-btn
          color="#42b883"
          rounded
          @click="doFilter"
          style="margin-right: 5px;"
          >Search</v-btn>
        <v-btn color="#42b883" rounded @click="doReset">Reset</v-btn>
      </div>
    </v-col>
  </v-row>
</template>

<style scoped></style>
