<script setup lang="ts" >
import { onMounted,onUnmounted,ref } from "vue";

    const username = ref("");
    const password = ref("");

    function submit() {
      window.alert("Hai cliccato sul pulsante di Login");
      window.alert(username.value + " " +password.value);

      username.value = "";
      password.value = "";
    }

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
              <v-form ref="form">
                <v-text-field
                  label="Email"
                  required
                  v-model="username"
                ></v-text-field>

                <v-text-field
                  label="Password"
                  type="password"
                  required
                  v-model="password"
                ></v-text-field>
                <v-row style="display: flex; justify-content: end;">
                    <v-btn
                      color="primary"
                      @click="submit">
                      Login
                    </v-btn>
                    <v-btn
                      style="margin-left: 1vw"
                      color="required">
                      Cancel
                    </v-btn>
                </v-row>
              </v-form>
              <br/>
              <a href="#">Recover forgotten password</a>
            </v-card-text>
        </v-card>
        </v-col>
      </v-row>
  </v-container>
</template>