<template>
  <v-container>
    <v-row>
      <v-col v-for="day in weekDays" :key="day" class="text-center font-weight-bold">
        {{ day }}
      </v-col>
    </v-row>
    <v-row v-for="(week, index) in monthGrid" :key="index">
      <v-col v-for="(day, i) in week" :key="i" class="text-center border">
        {{ day || '' }}
      </v-col>
    </v-row>
  </v-container>
</template>

<script setup lang="ts">
import { ref, computed } from 'vue';
import { startOfMonth, endOfMonth, startOfWeek, endOfWeek, eachDayOfInterval, format } from 'date-fns';
import { it } from 'date-fns/locale';

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
