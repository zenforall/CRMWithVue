<script setup lang="ts">
import { onMounted, ref } from 'vue'

import CalendarViewType from './CalendarViewType.vue'
import { useEventBus } from '../utils/EventBus';
import {VIEWS,EVENTS} from '../models/CalendarInfoConstants';

const { emitEvent } = useEventBus();

onMounted(async () => {
})

const dateSelected = (newDate:string) => {

}

const todayClick = () => {
  let info:CalendarInfo = {
            today: new Date(),
            next: false,
            prev: false,
            actualDay: 0,
            actualMonth: 0,
            actualYear: 0,
            choosedDate: new Date()
  };

  emitEvent(info,EVENTS.TODAY);

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
        <div style="width: 50%;display: flex; direction: row;justify-content: end;margin-right: 30px;">
          <v-select label="View type" hide-details variant="solo-filled" density="compact"
            :items="['Day', 'Week', 'Month']" style="width: 150px;margin-right: 30px; margin-bottom: 0px; padding-bottom: 0px;">
          </v-select>
          <v-date-input variant="solo-filled" hide-details placeholder=""
              @update:model-value="dateSelected"
              :first-day-of-week="1"
              label="Date"
              density="compact" style="width: 200px;">
            </v-date-input>
        </div>
      </div>

      <CalendarViewType/>
    </v-col>
  </v-row>
</template>

<style>

</style>
../utils/EventBus
