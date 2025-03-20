<script setup lang="ts">

import { ref } from 'vue';
import { format, startOfWeek, addDays } from 'date-fns';
import { computed,onMounted } from 'vue';
import { startOfMonth, endOfMonth, endOfWeek, eachDayOfInterval } from 'date-fns';
import { useCalendarEventBus } from '@/components/CalendarEventBus';
import { watch } from 'vue';
import { VIEWS } from '@/models/CalendarInfoConstants';
import { it } from 'date-fns/locale';
import { useTheme } from 'vuetify';

const theme = useTheme();

// Calcolo dei giorni della settimana corrente
const today = new Date();
const currentWeek = ref(
  Array.from({ length: 7 }, (_, i) => {
    const date = addDays(startOfWeek(today, { weekStartsOn: 1 }), i);
    return {
      name: format(date, 'EEEE').toUpperCase(),
      date: format(date, 'dd')
    };
  })
);

// Tutte le ore del giorno (00:00 - 23:00)
const allHours = ref(Array.from({ length: 23 }, (_, i) => `${(i+1).toString().padStart(2, '0')}:00`));

const { eventMessage } = useCalendarEventBus();

onMounted(async () => {
  //console.log(CssClassInfo(".v-col"));
});

const isDay = ref(false);
const isWeek = ref(false);
const isMonth = ref(false);

watch(eventMessage, (newEventMessage) => {
  if (newEventMessage) {
      isDay.value = (VIEWS.DAY === newEventMessage.viewType);
      isWeek.value = (VIEWS.WEEK === newEventMessage.viewType);
      isMonth.value = (VIEWS.MONTH === newEventMessage.viewType);
  }
});

const viewType = ref(false)

const weekDays: string[] = ['LUN', 'MAR', 'MER', 'GIO', 'VEN', 'SAB', 'DOM'];
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
    week.push(index < 7 || day.dayNumber !== '1' ? day.dayNumber : '1');
    if ((index + 1) % 7 === 0) {
      grid.push(week);
      week = [];
    }
  });
  if (week.length) grid.push(week);
  return grid;
});

const selectUnSelectCell = ref("unselectedCell");
/*
const selectedCell = () => {
  window.alert("Ho cliccato su una cella !!!");
}
*/

interface SelectedCell {
  row: number;
  col: number;
}

// Memorizza la cella selezionata
const selectedCell = ref<SelectedCell | null>(null);

const selectCell = (row: number, col:number) => {
  selectedCell.value = { row, col };
};

const dbClick = () => {
  window.alert("Doppio Click");
}

</script>

<template>
  <v-container>

    <!-- Giorno -->
    <v-scroll-x-transition>
      <div v-if="isDay">
        <v-row transition="slide-x-transition">
          <v-col cols="12">
            <v-label class="text-text">TUESDAY</v-label>
            <br/>
            <v-label class="text-text" style="font-weight: bold;">{{ format(today,"dd") }}</v-label>
          </v-col>
        </v-row>
        <v-row v-for="hour in allHours" :key="hour">
          <v-col style="padding-top: 20px;padding-bottom: 0px;text-align: right;border-bottom: 1px solid rgba(0, 0, 0, 0.12);">
            <v-label class="text-text"> {{ hour }} </v-label>
          </v-col>
          <v-col class="border p-2" cols="11">
            <!-- Celle della griglia, qui puoi inserire il contenuto desiderato -->
          </v-col>
        </v-row>
      </div>
  </v-scroll-x-transition>

  <!-- Settimana -->
  <v-scroll-x-transition>
    <div v-if="isWeek">
      <v-row transition="slide-x-transition">
          <v-col></v-col>
          <v-col v-for="day in currentWeek" :key="day.date" class="text-center font-bold">
            <v-label class="text-text">{{ day.name }}</v-label>
            <br/>
            <v-label class="text-text" style="font-weight: bold;">{{ day.date }}</v-label>
          </v-col>
        </v-row>
        <!-- Righe con tutte le ore del giorno -->
        <v-row v-for="hour in allHours" :key="hour">
          <v-col style="padding-top: 20px;padding-bottom: 0px;text-align: right;border-bottom: 1px solid rgba(0, 0, 0, 0.12);">
            <v-label class="text-text"> {{ hour }} </v-label>
          </v-col>
          <v-col v-for="day in currentWeek" :key="day.date" class="border p-2">
            <!-- Celle della griglia, qui puoi inserire il contenuto desiderato -->
          </v-col>
        </v-row>
      </div>
    </v-scroll-x-transition>

    <!-- Month -->
  <v-scroll-x-transition>
    <div v-if="isMonth">
      <v-row v-if="isMonth">
        <v-col v-for="day in weekDays" :key="day" class="text-center font-weight-bold">
          <v-label class="text-text"> {{ day }} </v-label>
        </v-col>
      </v-row>
      <v-row v-for="(week, index) in monthGrid" :key="index">
        <v-col @dblclick="dbClick" @click="selectCell(index, i)" :class="{'selected-cell': selectedCell?.row === index && selectedCell?.col === i}"  class="border p-2" v-for="(day, i) in week" :key="i">
          <v-label class="text-text">{{ day || '' }}</v-label>
          <v-card height="10px" color="warning">
            <v-card-title>Event 1</v-card-title>
          </v-card>
        </v-col>
      </v-row>
    </div>
  </v-scroll-x-transition>

  </v-container>
</template>

<style scoped>
.v-col {
  min-width: 40px;
  text-align: center;
}

.selected-cell {
  border: 1px solid v-bind("theme.current.value.colors.accent") !important; /* Bordo verde marcato */
  /*background-color: #F9F9F9 !important;*/ /* Leggero verde di sfondo */
  color: v-bind("theme.current.value.colors.accent") !important;
  font-weight: bold;
}
</style>

