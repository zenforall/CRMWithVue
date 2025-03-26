<script setup lang="ts">
import { ref, watch } from 'vue';
import { useComponentEventBus} from './ComponentEventBus';

const messages = ref([] as string[]);

const { emitEventToB } = useComponentEventBus();

function sendMessageToB(): void {
  emitEventToB("Message from Component A "+Date().toLocaleString());
}

const { eventMessageA} = useComponentEventBus();

watch(eventMessageA, (newEventMessage) => {
  if (newEventMessage) {
    messages.value.push(newEventMessage);
  }
});


</script>

<template>
  <v-container>
    <v-btn @click="sendMessageToB">Send Message to Component B</v-btn>
    <li v-for="item in messages">
      {{item}}
    </li>
  </v-container>
</template>

<style scoped>


</style>
