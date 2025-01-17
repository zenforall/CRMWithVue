<script setup lang="ts">
    import { ref,onMounted } from "vue";
    import { useRouter } from 'vue-router';
    //import { format, parse } from 'date-fns';
    import { useUserStore } from "../stores/user";
    import { getValidationResult } from "../utils/FormValidation";

    const router = useRouter();
    const userStore = useUserStore();

    const formData = ref({
      id : '' as string,
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

    const emit =defineEmits<{
      (event: "breadCrumbHandler", message: BreaCrumbItem[]): void;
    }>();

    const formRef = ref();

    const emailRegex = /^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/;

    const displaySnackBarOK  = ref(false);
    const displaySnackBarKO  = ref(false);

    const rules = {
      required: (value:any) => !!value || 'The field is compulsory ',
      emailValidation: (value:any) => emailRegex.test(formData.value.email) || 'The email is not valid',
    };


    const saveUser = async () => {

      const validationResult = await formRef.value.validate();
      let resultObject: ValidateObj = getValidationResult(validationResult);

      try {
        if (resultObject.valid) {
          let userToUpdate =  getUserFromUserDataForm();
          userStore.updateUser(userToUpdate);
          displaySnackBarOK.value = true;
        }

      } catch (error) {
        displaySnackBarKO.value = true;
        console.log(error);
      }

    }

    // Ripristina i valori originali dell'utente
    function cancel() : void {
      assignOriginalUserDataToForm(userStore.userDetail);
    }

    onMounted(async () => {

      if (userStore.userAction === 'C') return;

      userStore.getUserDetail();
      assignOriginalUserDataToForm(userStore.userDetail);
    })

    function assignOriginalUserDataToForm(userDetail: User | null | undefined) {
      if (userDetail != null && userDetail != undefined) {
        formData.value.id = userDetail?.id;
        formData.value.userName = userDetail?.userName;
        formData.value.password = userDetail?.password;
        formData.value.email = userDetail?.email;
        formData.value.company = userDetail?.company;
        formData.value.activationDate = userDetail?.activationDate;
        formData.value.enable = userDetail?.enabled;
      }
    }

    function getUserFromUserDataForm() : User {
      let result : User = <User>{}; // crea un oggetto vuoto dove User  è un'interfaccia

      result.id = formData.value.id;
      if (formData.value.activationDate != null) {
        result.activationDate = formData.value.activationDate;
      }
      result.company = formData.value.company;
      result.email = formData.value.email;
      result.enabled = formData.value.enable;
      result.password = formData.value.password;
      result.userName = formData.value.userName;

      return result;
    }


    function backToUsers() {

      const breadCrumbItems :  BreaCrumbItem[] = [];
      breadCrumbItems.push(
         {
            title: "Admin",
            disabled : false,
            href : ""
         },
         {
            title: "Users",
            disabled : false,
            href : ""
         }
      );

      emit("breadCrumbHandler",breadCrumbItems);
      router.push("/users");
    }

</script>

<template>
  <v-container>
    <v-snackbar :timeout="1000" color="success" v-model="displaySnackBarOK">
      <div style="text-align: center;">User Saved Successfully</div>
    </v-snackbar>

    <v-snackbar :timeout="1000" color="error" v-model="displaySnackBarKO">
      There were errors saving (check the log)
    </v-snackbar>

      <v-row>
        <v-col>
          <v-btn color="primary" @click="backToUsers">Back to Users</v-btn>
          <!--<span v-if="userStore.userAction === 'U'" style="margin-left: 10px;font-size: large;color: #42b883;">Edit User</span>
          <span v-else-if="userStore.userAction === 'C'" style="margin-left: 10px;font-size: large;color: #42b883;">New User</span> -->
        </v-col>
      </v-row>

      <v-form ref="formRef" lazy-validation>
       <v-row>
        <!-- User Name -->
        <v-col cols="12" md="6">
          <v-text-field
            :rules="[rules.required]"
            v-model="formData.userName"
            label="User Name"
            density="compact"
            required
          ></v-text-field>
        </v-col>

        <!-- Password -->
        <v-col cols="12" md="6">
          <v-text-field
            :rules="[rules.required]"
            v-model="formData.password"
            append-inner-icon="mdi-eye"
            label="Password"
            type="password"
            density="compact"
            required
          ></v-text-field>
        </v-col>

        <!-- Email -->
        <v-col cols="12" md="6">
          <v-text-field
            :rules="[rules.required,rules.emailValidation]"
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
            :rules="[rules.required]"
            v-model="formData.company"
            label="Company"
            density="compact"
          ></v-text-field>
        </v-col>

        <!-- Activation Date -->
        <v-col cols="12" md="6">
            <v-date-input
              :rules="[rules.required]"
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
          <v-btn
               @click="saveUser"
               variant="elevated"
               color="primary">
          Save
        </v-btn>
        <v-btn v-if="userStore.userAction === 'U'"
                @click="cancel"
                variant="elevated"
                style="margin-left: 5px;"
                color="primary">
            Cancel
          </v-btn>
        </v-col>
      </v-row>
    </v-form>
  </v-container>
</template>

<style scoped>

</style>
