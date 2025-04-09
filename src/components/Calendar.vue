<script setup lang="ts">
import { nextTick, onMounted, ref } from 'vue'
import { useDisplay } from 'vuetify';
import CalendarViewType from './CalendarViewType.vue'
import { useCalendarEventBus } from './CalendarEventBus';
import {VIEWS} from '../models/CalendarInfoConstants';
import type { CalendarInfo } from '@/models/CalendarInfo';

const display = useDisplay();
const { emitEvent } = useCalendarEventBus();

const filterAlignmentClass = ref("filter-align-for-small-devices");

interface Item {
  text: string;
  value: string;
}

let items :Item[]=[
  { value: "0",text: 'Day' },
  { value: "2",text: 'Month' }
];

// Visualizza il codice della risoluzione
// window.alert(display.name.value);

if ( display.name.value === 'sm' || display.name.value === 'md' || display.name.value === 'lg' || display.name.value === 'xl') {
  filterAlignmentClass.value = "filter-align-for-big-devices";
  items =[
    { value: "0",text: 'Day' },
    { value: "1", text: 'Week' },
    { value: "2",text: 'Month' }
  ];
}


onMounted(async () => {

  let info:CalendarInfo = {
            day: 0,
            month: 0,
            year: 0,
            viewType :  VIEWS.MONTH
  };

  emitEvent(info);
})

const dateSelected = (newDate:string) => {
  console.log(newDate);
}

const selectedValue = ref<string | null>("0");

const viewSelectChange = async () => {

  await nextTick(); // Attende che la variabile nel v-model sia aggionrata dal metodo @update:model-value
                    // l'evento @update:model aggiorna la variabile del v-model in modo asincrono

  let selectedViewType: VIEWS = VIEWS.DAY;
  if (selectedValue.value != null) {
    if (selectedValue.value == VIEWS.DAY.toString())
      selectedViewType = VIEWS.DAY;
    else if (selectedValue.value == VIEWS.WEEK.toString())
      selectedViewType = VIEWS.WEEK;
    else if (selectedValue.value == VIEWS.MONTH.toString())
      selectedViewType = VIEWS.MONTH;
  }


  let info:CalendarInfo = {
            day: 0,
            month: 0,
            year: 0,
            viewType :  selectedViewType
  };

  emitEvent(info);
}


const todayClick = () => {
  let info:CalendarInfo = {
            day: 0,
            month: 0,
            year: 0,
            viewType : VIEWS.DAY
  };
  emitEvent(info);
}

</script>

<template>
  <v-card style="margin-right: 5px;background-color: white;">
  <v-row xs="12" sm="6" md="6">
    <!-- Quando il v-col occupa tutte le 12 colonne i dati contenuti sono visualizzati -->
    <!-- su due righe diverse-->

    <!-- >= 960 occupa lo spazio di 6 colonne : il 50 % dello spazio -->
    <!-- < 960 occupa lo spazioe di 12 colonne: il 100% dello spazio -->
    <v-col  style="display: flex;direction: row;
                                        align-items:center;
                                        justify-content: start;
                                        margin-top: 10px;
                                        margin-left: 5px;">
        <v-btn color="primary" @click="todayClick">Today</v-btn>
        <v-btn color="secondary" icon="mdi-chevron-left" size="x-small" style="margin-left: 20px;"></v-btn>
        <v-btn color="secondary" icon="mdi-chevron-right" size="x-small" style="margin-left: 20px;"></v-btn>
        <div style="display: flex;flex-wrap: wrap;align-items: center; margin-left: 10px; width: 150px;justify-content: space-between;">
          <v-label class="text-text" style="opacity: 0.87;">SEPTEMBER</v-label>
          <v-label class="text-text" style="opacity: 0.87;">2025</v-label>
        </div>
     </v-col>

      <!-- >= 960 occupa lo spazio di 6 colonne : il 50 % dello spazio -->
      <!-- < 960 occupa lo spazioe di 12 colonne: il 100% dello spazio -->
      <!-- Per utilizzare la variabile reattiva filterAlignmentClass utilizzare la proprietà :class-->
    <v-col :class="filterAlignmentClass" style="margin-right: 5px;margin-top: 10px;">
          <v-select label="View type" hide-details variant="solo-filled" density="compact" @update:modelValue="viewSelectChange"
            v-model="selectedValue"
            :items="items"  item-title="text"
                            item-value="value"
                            style="max-width: 120px;margin-right: 30px;">
          </v-select>
          <v-date-input variant="solo-filled" hide-details placeholder=""
              @update:model-value="dateSelected"
              :first-day-of-week="1"
              density="compact" style="max-width: 170px;">
            </v-date-input>
    </v-col>
  </v-row>
  <v-row>
    <v-col>
      <CalendarViewType/>
    </v-col>
  </v-row>
</v-card>
</template>

<style scoped>

.filter-align-for-big-devices {
  display: flex;
  direction: row;
  align-items:center;
  justify-content: end;
}

.filter-align-for-small-devices {
  display: flex;
  direction: row;
  align-items:center;
  justify-content: center;
}

</style>
