<script setup lang="ts">

import { ScheduleXCalendar } from '@schedule-x/vue'
import {
  createCalendar,
  createViewDay,
  createViewMonthAgenda,
  createViewMonthGrid,
  createViewWeek,
} from '@schedule-x/calendar'

function addNewEvent() : void {
  window.alert("Add new Event");
}

// TODO: Utilizzare il componente leggendo la documentazione:
// https://schedule-x.dev/docs/frameworks/vue
// https://github.com/tomosterlund

// Do not use a ref here, as the calendar instance is not reactive, and doing so might cause issues
// For updating events, use the events service plugin
const calendarApp = createCalendar({
  selectedDate: '2023-12-19',
  views: [
    createViewDay(),
    createViewWeek(),
    createViewMonthGrid(),
    createViewMonthAgenda(),
  ],
  events: [
    {
      id: 1,
      title: 'Event 1',
      start: '2023-12-19',
      end: '2023-12-19',
    },
    {
      id: 2,
      title: 'Event 2',
      start: '2023-12-20 12:00',
      end: '2023-12-20 13:00',
    },
    {
      id: 3,
      title: 'Event 3',
      start: '2023-12-20 12:30',
      end: '2023-12-20 13:00',
    },
    {
      id: 4,
      title: 'Event 4',
      start: '2023-12-20 12:45',
      end: '2023-12-20 13:00',
    },
  ],
})
</script>

<template>
  <v-row class="fill-height">
    <v-col>
      <ScheduleXCalendar :calendar-app="calendarApp" />
    </v-col>
  </v-row>
</template>

<style>
  @import '@schedule-x/theme-default/dist/index.css';
</style>
