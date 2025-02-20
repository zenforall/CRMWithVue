<template>
  <v-container>

    <v-row>
      <v-col v-for="day in weekDays" :key="day" class="text-center font-weight-bold">
        <v-label style="font-weight: bold;"> {{ day }} </v-label>
      </v-col>
    </v-row>
    <v-row v-for="(week, index) in monthGrid" :key="index">
      <v-col v-for="(day, i) in week" :key="i" class="border text-center;">
        <v-label>{{ day || '' }}</v-label>
      </v-col>
    </v-row>

  <!-- Intestazione con nome del giorno sopra al numero del giorno -->
  <v-row>
      <v-col></v-col>
      <v-col v-for="day in currentWeek" :key="day.date" class="text-center font-bold">
        <v-label>{{ day.name }}</v-label>
        <br/>
        <v-label style="font-weight: bold;">{{ day.date }}</v-label>
      </v-col>
    </v-row>
    <!-- Righe con tutte le ore del giorno -->
    <v-row v-for="hour in allHours" :key="hour">
      <v-col style="padding-top: 20px;padding-bottom: 0px;text-align: right;border-bottom: 1px solid rgba(0, 0, 0, 0.12);">
        <v-label> {{ hour }} </v-label>
      </v-col>
      <v-col v-for="day in currentWeek" :key="day.date" class="border p-2">
        <!-- Celle della griglia, qui puoi inserire il contenuto desiderato -->
      </v-col>
    </v-row>
  </v-container>
</template>

<script setup lang="ts">

import { ref } from 'vue';
import { format, startOfWeek, addDays } from 'date-fns';

// Calcolo dei giorni della settimana corrente
const today = new Date();
const currentWeek = ref(
  Array.from({ length: 7 }, (_, i) => {
    const date = addDays(startOfWeek(today, { weekStartsOn: 1 }), i);
    return {
      name: format(date, 'EEEE'),
      date: format(date, 'dd')
    };
  })
);

// Tutte le ore del giorno (00:00 - 23:00)
const allHours = ref(Array.from({ length: 23 }, (_, i) => `${(i+1).toString().padStart(2, '0')}:00`));


import { computed,onMounted } from 'vue';
import { startOfMonth, endOfMonth, endOfWeek, eachDayOfInterval } from 'date-fns';
import { it } from 'date-fns/locale';

import {CssClassInfo} from '../utils/CSS';

onMounted(async () => {
  //console.log(CssClassInfo(".v-col"));
});


const weekDays: string[] = ['Lun', 'Mar', 'Mer', 'Gio', 'Ven', 'Sab', 'Dom'];
const currentMonth: Date = new Date();

type DayInfo = {
  date: Date;
  dayNumber: string;
};

const daysInMonth = computed<DayInfo[]>(() => {
  const start: Date = startOfWeek(startOfMonth(currentMonth), { weekStartsOn: 1 });
  const end: Date = endOfWeek(endOfMonth(currentMonth), { weekStartsOn: 1 });
  return eachDayOfInterval({ start, end }).map(day => ({
    date: day,
    dayNumber: format(day, 'd', { locale: it })
  }));
});

const monthGrid = computed<string[][]>(() => {
  const grid: string[][] = [];
  let week: string[] = [];
  daysInMonth.value.forEach((day, index) => {
    week.push(index < 7 || day.dayNumber !== '1' ? day.dayNumber : '');
    if ((index + 1) % 7 === 0) {
      grid.push(week);
      week = [];
    }
  });
  if (week.length) grid.push(week);
  return grid;
});


</script>

<style scoped>
.v-col {
  min-width: 40px;
  text-align: center;
}
</style>
