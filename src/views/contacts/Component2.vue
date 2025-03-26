<script setup lang="ts">
import { ref, watch } from 'vue';
import { useComponentEventBus } from './ComponentEventBus';

const messages = ref([] as string[]);

const { emitEventToA } = useComponentEventBus();

function sendMessageToA(): void {
  emitEventToA("Message from Component B "+Date().toLocaleString());
}

const { eventMessageB} = useComponentEventBus();

watch(eventMessageB, (newEventMessage) => {
  if (newEventMessage) {
    messages.value.push(newEventMessage);
  }
});


</script>

<template>
  <v-container>
    <v-btn @click="sendMessageToA">Send Message to Component A</v-btn>
    <li v-for="item in messages">
      {{item}}
    </li>
  </v-container>
</template>

<style scoped>


</style>
