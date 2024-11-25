<script setup lang="ts">
// https://codesandbox.io/p/sandbox/vuetify-login-base-forked-kzy5pr?file=%2Fsrc%2Fcomponents%2FLogin.vue%3A7%2C1 : link per prendere ispirazione
  
import { ref } from "vue";

const username = ref("");
const password = ref("");

function login() {
  window.alert("Login");
}
</script>

<template>
    <v-text-field label="test"></v-text-field>
</template>
