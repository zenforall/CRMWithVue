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
  name:null,
  surname:null,
  address:null,
  cap:null,
  city:null,
  type:null,
  phone:null
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

  //emitUserFilterEvent('doResetFilterUsersHandler',"DO_RESET");
}
</script>

<template>
  <v-row style="background-color: white;margin-top: 2px;">
    <v-col style="display: flex;justify-content: start;align-items: center;">
      <v-label class="text-secondary" style="margin-left: 5px; font-size: x-large;font-weight: bold; opacity: 0.87;">Filters</v-label>
    </v-col>
    <v-col style="display: flex;margin-right: 10px; justify-content: end;align-items: center;">
      <!--
      <v-btn color="secondary" title="Close" @click="closeDrawer" icon="mdi-close" size="x-small"></v-btn>
      -->
      <v-icon color="secondary" size="large" @click="closeDrawer" >mdi-close</v-icon>
    </v-col>
  </v-row>
  <v-row style="background-color: white;">
    <v-col cols="12">
      <v-text-field
        v-model="filter.userName"
        variant="outlined"
        label="User Name"
        width="90%"
        style="margin-left: 5px;"
        hide-details
        density="compact"
      >
      </v-text-field>
    </v-col>

    <!-- Email -->
    <v-col cols="12">
      <v-text-field
        v-model="filter.email"
        variant="outlined"
        label="Email"
        hide-details
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
        variant="outlined"
        hide-details
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
        hide-details
        variant="outlined"
        density="compact"
      >
      </v-date-input>
    </v-col>
    <v-col cols="12">
      <v-date-input
        v-model="filter.activationDateTo"
        hide-details
        width="90%"
        variant="outlined"
        label="To"
        density="compact"
      >
      </v-date-input>
    </v-col>
    <v-col cols="12">
      <v-checkbox
        v-model="filter.enabled"
        label="Enabled"
        hide-details
        density="compact"
      ></v-checkbox>
    </v-col>
  </v-row>
  <v-row style="background-color: white;">
    <v-col cols="12">
      <div
        style="
          width: 100%;
          display: flex;
          flex-direction: row;
          justify-content: end;">
        <v-btn variant="outlined" color="secondary" @click="doReset">Clean</v-btn>
        <v-btn
          @click="doFilter"
          style="margin-left: 5px;background-color:#03a840;color: #fff;"
          >Apply Filters</v-btn>
      </div>
    </v-col>
  </v-row>
</template>

<style scoped></style>
