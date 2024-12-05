<script setup lang="ts" >
import { onMounted,onUnmounted,ref,nextTick } from "vue";

    const username = ref("");
    const password = ref("");

    const formRef = ref(null);

    /* Utilizzare una struttura per incapsulare la Promise dopo aver chiamato il validate()
      interface Person {
        Name: string;
        Age: number;
      }

      const jsonString = '{"Name": "John Doe", "Age": 30}';

      // Parsing della stringa JSON in un oggetto di tipo 'Person'
      const jsonObject: Person = JSON.parse(jsonString);

      // Accesso alla proprietà 'Name'
      const name = jsonObject.Name;

      console.log(name);  // Output: "John Doe"
    */

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

    const handleLogin = async () => {

      const  gg = await formRef.value?.validate();

      let resultAsString: string = JSON.stringify(gg);
      let resultObject: object = JSON.parse(resultAsString);

      const isValid = resultObject.valid;

      window.alert("Valore from await:"+isValid);

      window.alert("GG: "+JSON.stringify(gg));

      gg.then(value => {
        window.alert("Value: "+JSON.stringify(value))
      })

      window.alert(gg);

      /*
      window.alert(formRef.value?.validate().then(value => {
        window.alert(JSON.stringify(value))
      }));
      */

      formRef.value?.validate().then(({valid: isValid}) => {
        if (isValid) {
          alert('Login effettuato con successo!');
        } else {
          //alert('Correggi gli errori nel form.');
        }
      })

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
              <v-form ref="formRef" lazy-validation>
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
                  @click="handleLogin"
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
