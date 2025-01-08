<script setup lang="ts">
    import { ref } from "vue";

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
</script>

<template>
  <v-container>
    <v-form ref="form" v-model="isFormValid">
      <v-row>
        <!-- User Name -->
        <v-col cols="12" md="6">
          <v-text-field
            v-model="formData.userName"
            label="User Name"
            required
          ></v-text-field>
        </v-col>

        <!-- Password -->
        <v-col cols="12" md="6">
          <v-text-field
            v-model="formData.password"
            label="Password"
            type="password"
            required
          ></v-text-field>
        </v-col>

        <!-- Email -->
        <v-col cols="12" md="6">
          <v-text-field
            v-model="formData.email"
            label="Email"
            type="email"
            required
          ></v-text-field>
        </v-col>

        <!-- Company -->
        <v-col cols="12" md="6">
          <v-text-field
            v-model="formData.company"
            label="Company"
          ></v-text-field>
        </v-col>

        <!-- Activation Date -->
        <v-col cols="12" md="6">
          <v-date-picker
            v-model="formData.activationDate"
            label="Activation Date"
            required
          ></v-date-picker>
        </v-col>

        <!-- Enable -->
        <v-col cols="12" md="6">
          <v-checkbox
            v-model="formData.enable"
            label="Enable"
          ></v-checkbox>
        </v-col>
      </v-row>

      <v-btn :disabled="!isFormValid" @click="">
        Submit
      </v-btn>
    </v-form>
  </v-container>
</template>

<style scoped>

</style>
