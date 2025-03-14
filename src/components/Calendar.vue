<script setup lang="ts">
import { nextTick, onMounted, ref } from 'vue'

import CalendarViewType from './CalendarViewType.vue'
import { useCalendarEventBus } from './CalendarEventBus';
import {VIEWS} from '../models/CalendarInfoConstants';

import type { CalendarInfo } from '@/models/CalendarInfo';

const { emitEvent } = useCalendarEventBus();

interface Item {
  text: string;
  value: string;
}

const items :Item[]=[
  { value: "0",text: 'Day' },
  { value: "1", text: 'Week' },
  { value: "2",text: 'Month' }
];

onMounted(async () => {

  let info:CalendarInfo = {
            day: 0,
            month: 0,
            year: 0,
            viewType :  VIEWS.DAY
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
  <v-row>
    <v-col>
      <div style="display: flex;direction: row; justify-content: space-between; align-items:center; width: 100%; margin-bottom: 10px;">
        <div style="width: 50%;">
          <v-btn color="#42b883" rounded @click="todayClick">Today</v-btn>
          <v-btn icon="mdi-chevron-left" size="small" style="margin-left: 20px;"></v-btn>
          <v-btn icon="mdi-chevron-right" size="small" style="margin-left: 20px;"></v-btn>
          <v-label style="margin-left: 20px;font-weight: bold;color:rgba(0, 0, 0, 0.87)">FEBRUARY 2025</v-label>
        </div>
        <div style="width: 50%;display: flex; direction: row;justify-content: end;">
          <v-select label="View type" hide-details variant="solo-filled" density="compact" @update:modelValue="viewSelectChange"
            v-model="selectedValue"
            :items="items"  item-title="text"
                            item-value="value"
                            style="max-width: 120px;margin-right: 30px; margin-bottom: 0px; padding-bottom: 0px;">
          </v-select>
          <v-date-input variant="solo-filled" hide-details placeholder=""
              @update:model-value="dateSelected"
              :first-day-of-week="1"
              label="Date"
              density="compact" style="max-width: 170px;">
            </v-date-input>
        </div>
      </div>

      <CalendarViewType/>
    </v-col>
  </v-row>
</template>

<style>

</style>
