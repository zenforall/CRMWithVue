<script setup lang="ts" >
import { onMounted,onUnmounted,ref,nextTick } from "vue";
import { VForm } from "vuetify/components";
import { useRouter } from 'vue-router'
import { getValidationResult } from "@/utils/formValidation";
import { useAppStore } from "../stores/app"
import { vuetify } from '../main'; // Importa l'istanza Vuetify

    const username = ref("");
    const password = ref("");

    const formRef = ref();

    const appStore = useAppStore();

    const router = useRouter();

    const loginKO = ref(false);

    const rules = {
      required: (value:any) => !!value || 'The field is compulsory ',
    };

    const handleLogin = async () => {
      const validationResult = await formRef.value.validate();
      let resultObject: ValidateObj = getValidationResult(validationResult);

      if (resultObject.valid) {
          appStore.authenticateUser(username.value,password.value);
          if (appStore.isUserAutheticated) {
            // Ottiene il dettaglio dell'utente ed assegna il valore corretto del locale
            /* Da abilitare
            vuetify.locale.current.value = "es";
            vuetify.date.options.locale.value = "es";
            */

            router.push("/dashboard");
          } else {
            loginKO.value = true;
          }

      }

      /* Alternativa per leggere la property valid dal json di ritorno dal metodo vlaidate()
      formRef.value.validate().then(({valid: isValid}) => {
        if (isValid) {
          alert('Login effettuato con successo!');
        } else {
          //alert('Correggi gli errori nel form.');
        }
      })
      */

    }

    const handleKey = async (event: any) => {
        if (event.key === 'Enter') {
          await handleLogin();
        }
    }

    onMounted(() => {
      window.addEventListener('keydown', handleKey);
    })

    onUnmounted(() => {
    })

</script>

<template>

    <v-snackbar :timeout="1000" location="center" color="error" v-model="loginKO">
      Invalid Credentials
    </v-snackbar>

    <v-container style="display: flex; height: 100vh;">
      <v-row style="align-content: center;justify-content: center;">
        <v-col cols="12" sm="8" md="4">
          <v-card class="pa-4">
            <v-card-text>
              <v-form ref="formRef" lazy-validation>
                <v-text-field
                  label="Email"
                  :rules="[rules.required]"
                  v-model="username">
               </v-text-field>
                <v-text-field
                  label="Password"
                  :rules="[rules.required]"
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
                  @click="handleLogin"
                  @keydown.enter="handleLogin"
                  rounded
                  color="#42b883"
                  variant="elevated">
                  Login
                </v-btn>
              </v-form>
            </v-card-text>
        </v-card>
        </v-col>
      </v-row>
  </v-container>
</template>
