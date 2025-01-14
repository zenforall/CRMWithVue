<script setup lang="ts">
    import { ref,onMounted } from "vue";
    import { useRoute } from 'vue-router';
    import { format, parse } from 'date-fns';
    import { useUserStore } from "../stores/user"

    const router = useRoute();
    const userStore = useUserStore();

    const isFormValid = ref(false);
    const form = ref(null);
    const formData = ref({
      userName: '' as string,
      password: '' as string,
      email: '' as string,
      company: '' as string,
      activationDate: null as Date | null,
      activationDateFormatted: '' as string,
      enable: false as boolean,
    });

    const formatDate = (date: Date): string => {
      return date.toLocaleDateString("it-IT", {
        year: "numeric",
        month: "2-digit",
        day: "2-digit",
      });
    };
    function saveUser() {
      ;
    }

    onMounted(async () => {
      //window.alert(router.params.id);
      userStore.getUserDetail();
      if (userStore.userDetail === null || undefined) {
        window.alert("No User Detail found --> Go Back to Users List");
      } else {
        if (userStore.userDetail != null && userStore.userDetail != undefined) {
          formData.value.userName = userStore.userDetail?.userName;
          formData.value.password = userStore.userDetail?.password;
          formData.value.email = userStore.userDetail?.email;
          formData.value.company = userStore.userDetail?.company;
          formData.value.activationDate = userStore.userDetail?.activationDate;
          formData.value.enable = userStore.userDetail?.enabled;
        }
      }
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
