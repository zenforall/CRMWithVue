<script setup lang="ts">
    import { ref,onMounted } from "vue";
    import { useRoute } from 'vue-router';

    const router = useRoute();

    const isFormValid = ref(false);
    const form = ref(null);
    const formData = ref({
      userName: '',
      password: '',
      email: '',
      company: '',
      activationDate: null,
      enable: false,
    });

    function saveUser() {
      ;
    }

    onMounted(async () => {
      ;
    })


</script>

<template>
  <v-container>



    <v-form ref="form">
      <v-row>
        <v-col>
          <v-btn color="primary">Back to Users</v-btn>
          <span style="margin-left: 10px;font-size: large;color: #42b883;">User Details</span>
        </v-col>
      </v-row>

       <v-row>
        <!-- User Name -->
        <v-col cols="12" md="6">
          <v-text-field
            v-model="formData.userName"
            label="User Name"
            density="compact"
            required
          ></v-text-field>
        </v-col>

        <!-- Password -->
        <v-col cols="12" md="6">
          <v-text-field
            v-model="formData.password"
            label="Password"
            type="password"
            density="compact"
            required
          ></v-text-field>
        </v-col>

        <!-- Email -->
        <v-col cols="12" md="6">
          <v-text-field
            v-model="formData.email"
            label="Email"
            type="email"
            density="compact"
            required
          ></v-text-field>
        </v-col>

        <!-- Company -->
        <v-col cols="12" md="6">
          <v-text-field
            v-model="formData.company"
            label="Company"
            density="compact"
          ></v-text-field>
        </v-col>

        <!-- Activation Date -->
        <v-col cols="12" md="6">
            <v-date-input
              label="Select a date"
              density="compact"
              v-model="formData.activationDate">
            </v-date-input>
        </v-col>

        <!-- Enable -->
        <v-col cols="12" md="6">
          <v-checkbox
            v-model="formData.enable"
            label="Enable"
            density="compact"
          ></v-checkbox>
        </v-col>

        <v-col cols="12" style="display: flex; justify-content: flex-end;">
          <v-btn :disabled="!isFormValid"
               @click="saveUser"
               variant="elevated"
               color="blue">
          Save
        </v-btn>
        <v-btn
               @click=""
               variant="elevated"
               style="margin-left: 5px;"
               color="blue">
          Cancel
        </v-btn>
        </v-col>
      </v-row>
    </v-form>
  </v-container>
</template>

<style scoped>

</style>
