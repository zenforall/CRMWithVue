import { ref } from 'vue';

const eventMessageA = ref<string | null>(null);
const eventMessageB = ref<string | null>(null);

export function useComponentEventBus() {
  const emitEventToA = (message: string) => {
    eventMessageA.value = message;
  };

  const emitEventToB = (message: string) => {
    eventMessageB.value = message;
  };


  return {
    eventMessageA,
    eventMessageB,
    emitEventToA,
    emitEventToB
  };
}
