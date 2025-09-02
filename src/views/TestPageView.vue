<script setup lang="ts" >

import Autocomplete  from '@/components/autocomplete.vue';

function onSelect(val: any) {
  window.alert("Elemento Selezionato: "+val);
}

</script>

<template>

  <br/>
  <div>
  <h3>Test componente AutoComplete</h3>
  <Autocomplete
    :options="['Roma','RRoma', 'Milano', 'Napoli', 'Torino', 'Firenze']"
    placeholder="Cerca città..."
    @select="onSelect"
  />
  </div>
  <br/>

</template>

<style scoped>

</style>
