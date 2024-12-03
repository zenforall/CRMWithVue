<script lang="ts">
// https://codesandbox.io/p/sandbox/vuetify-login-base-forked-kzy5pr?file=%2Fsrc%2Fcomponents%2FLogin.vue%3A7%2C1 : link per prendere ispirazione

import { ref } from "vue";
export default {
  setup() {
    const username = ref("");
    const password = ref("");

    function login() {
      window.alert("Hai cliccato sul pulsante di Login");
      window.alert(username.value + " " +password.value);

      username.value = "";
      password.value = "";
    }

    return {
      username,password,login
    }

  },
  mounted() {
    console.log("mounted");
  },
  unmounted() {
    console.log("unmounted");
  }
}
</script>

<template>
    <v-text-field label="Email" v-model="username" ></v-text-field>
    <v-text-field label="Password" v-model="password"></v-text-field>
    <v-btn text="Sign in" @click="login()"></v-btn>
</template>
