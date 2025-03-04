import { ref } from 'vue';
import type { CalendarInfo } from '@/models/CalendarInfo';

const eventMessage = ref<CalendarInfo | null>(null);

export function useCalendarEventBus() {
  const emitEvent = (message: CalendarInfo) => {
    eventMessage.value = message;
  };

  return {
    eventMessage,
    emitEvent,
  };
}
