import { ref } from 'vue';

const eventMessage = ref<any | null>(null);

export function useEventBus() {
  const emitEvent = (message: any) => {
    eventMessage.value = message;
  };

  return {
    eventMessage,
    emitEvent,
  };
}
