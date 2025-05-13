<script setup lang="ts" >
import { onMounted,onUnmounted,ref} from "vue";
import { VForm } from "vuetify/components";
import { useRouter } from 'vue-router'
import { getValidationResult } from "@/utils/formatData";

import { useAppStore } from "../stores/app"
import { vuetify } from '../main'; // Importa l'istanza Vuetify

import { useTheme } from "vuetify";

    const theme = useTheme();

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

    <div style="background-color: #f2f2f2;">
      <v-container>
        <v-row style=" display: flex; height: 98vh;justify-content: center;align-items: center;">
          <v-col cols="12" sm="8" md="4">
            <div style="display: flex; flex-direction: column; justify-content: flex-start; align-items: center;margin-bottom: 20px;">
              <img src="@/assets/logo.png?id=123" alt="CRM With Vue" />
            </div>
            <v-card class="pa-4" style="background-color: white;" elevation="1">
              <v-label class="text-secondary" style="font-weight: bold;font-size: x-large;opacity: 0.87;">Sign in</v-label>
              <v-divider :thickness="2" style="margin-top: 15px;margin-bottom: 15px;"></v-divider>
              <v-card-text>
                <v-form ref="formRef" lazy-validation>
                  <v-text-field
                    autofocus
                    label="Email"
                    variant="outlined"
                    density="compact"
                    :rules="[rules.required]"
                    v-model="username">
                </v-text-field>
                  <v-text-field
                    label="Password"
                    density="compact"
                    variant="outlined"
                    :rules="[rules.required]"
                    type="password"
                    v-model="password">
                </v-text-field>
                <v-row style="display: flex;align-items: center; margin-top: 15px;">
                  <v-divider :thickness="2" style="margin-bottom: 15px;"></v-divider>
                  <v-lavel>Forget password ?</v-lavel>
                  <v-row style="margin:0;justify-content: end;">
                    <v-btn
                      style="display: flex;"
                      @click="handleLogin"
                      @keydown.enter="handleLogin"
                      color="primary">
                      Sign in
                    </v-btn>
                  </v-row>
                </v-row>
                </v-form>
              </v-card-text>
          </v-card>
          </v-col>
        </v-row>
    </v-container>
  </div>
</template>

<style scoped>

.background {
  /*background: linear-gradient(135deg, #28a745, #ff7f32);*/ /* Verde e arancione */
  /*background-image: url('../assets/background_login_5.jpg');*/
  /*background-size: cover;*/ /* Copre tutta la pagina */
  /*height: 100vh;*/ /* Imposta l'altezza a 100% della finestra */
}


.link {
  text-decoration: none;
  color: v-bind("theme.current.value.colors.secondary");
  transition: 0.4s;
}

</style>
