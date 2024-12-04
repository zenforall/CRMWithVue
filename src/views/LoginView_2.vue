<script setup lang="ts" >
import { onMounted,onUnmounted,ref } from "vue";

    const username = ref("");
    const password = ref("");

    const formRef = ref(null);
    const formIsValid = ref(false);

    /*
    function submit() {
      window.alert("Hai cliccato sul pulsante di Login");
      window.alert(username.value + " " +password.value);

      username.value = "";
      password.value = "";
    }
    */

    const rules = {
      required: (value) => !!value || 'Il campo è obbligatorio',
    };

    const submitForm = (validate) => {
      if (validate()) {
        alert('Form inviato con successo!');
      } else {
        alert('Correggi gli errori nel form.');
      }
    };


    onMounted(() => {
      console.log("Mounted LoginView 2");
    })

    onUnmounted(() => {
      console.log("UnMounted LoginView 2");
    })

</script>

<template>
    <v-container style="display: flex; height: 100vh;">
      <v-row style="align-content: center;justify-content: center;">
        <v-col cols="12" sm="8" md="4">
          <v-card class="pa-4">
            <v-card-title style="text-align: left;">
              Login
            </v-card-title>
            <v-card-text>
              <v-form @click="submitForm(validate)">
                <v-text-field
                  label="Email"
                  :rules="[rules.required]"
                  v-model="username">
               </v-text-field>
                <v-text-field
                  label="Password"
                  type="password"
                  v-model="password">
               </v-text-field>
               <v-row style="margin:0">
                <a href="#">Recover forgotten password</a>
                <v-row style="margin:0;justify-content: end;">
                  <a href="#">Sign in</a>
                </v-row>
               </v-row>
               <br/>
                <v-btn
                  style="display: flex; min-width: 100%;"
                  color="primary"
                  @click="submitForm" variant="elevated">
                  Login
                </v-btn>
              </v-form>
            </v-card-text>
        </v-card>
        </v-col>
      </v-row>
  </v-container>
</template>