import { ref } from 'vue';

const eventMessage = ref<any | null>(null);
const eventType = ref<any | null>(null);

export function useEventBus() {
  const emitEvent = (message: any,evnType:any) => {
    eventMessage.value = message;
    eventType.value = evnType;
  };

  return {
    eventMessage,
    eventType,
    emitEvent,
  };
}
