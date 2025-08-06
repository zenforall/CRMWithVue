<script setup lang="ts">
    import { ref,onMounted } from "vue";
    import { useRouter } from 'vue-router';
    import { useUserStore } from "@/stores/user";
    import { getValidationResult } from "@/utils/formatData";
    import type { BreadCrumbItem } from "@/models/BreadCrumbItem";
    import type { User } from "@/models/User";

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

    const emit =defineEmits<{
      (event: "breadCrumbHandler", message: BreadCrumbItem[]): void;
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
          await userStore.updateUser(userToUpdate);
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

      await userStore.getUserDetail();
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

      const breadCrumbItems :  BreadCrumbItem[] = [];
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
      router.push("/admin/users");
    }

 const items = [] as string[];
    items.push("Admin");
    items.push("Users");
    items.push("Create-Edit User");

</script>

<template>
  <!--<v-card style="background-color: white;margin-right: 5px;" elevation="1"> -->
    <v-snackbar :timeout="1000" color="success" location="center" v-model="displaySnackBarOK">
      <div style="text-align: center;">User Saved Successfully</div>
    </v-snackbar>

    <v-snackbar :timeout="1000" location="center" color="error" v-model="displaySnackBarKO">
      There were errors saving (check the log)
    </v-snackbar>

    <!--
    <v-row style="display: flex;align-items: center;">
      <v-col cols="1" style="margin-top: 10px;">
        <v-btn color="primary" style="margin-left: 5px;"  @click="backToUsers">&lt; BACK</v-btn>
      </v-col>
    </v-row>
  -->

<v-card style="margin-right: 5px;margin-bottom: 10px;margin-top: 10px;background-color: #f9f9f9;" elevation="0">
  <v-row style="display: flex;align-items: center;background-color: white;border: solid black 0px;">
    <v-col style="margin-top: 10px;margin-left: 20px;padding: 10px;">
      <v-breadcrumbs :items="items" color="secondary">
        <template v-slot:divider>
          /
        </template>
       </v-breadcrumbs>
    </v-col>
  </v-row>
  <v-row style="display: flex;align-items: center;background-color: white;border: 0px solid black;">
    <v-col style="margin-top: 0px;margin-left: 20px;padding: 10px;">
       <v-label class="text-secondary" style="font-weight: bold;font-size: x-large;opacity: 0.87;">Create/Edit User</v-label>
    </v-col>
    <v-col style="display: flex;justify-content: end;margin-right: 5px;margin-top: 0px;margin-bottom: 10px;padding: 10px;">
       <v-btn variant="outlined" color="secondary" @click="backToUsers">Back</v-btn>
       <v-btn  style="margin-left: 5px;background-color:#03a840;color: #fff;" @click="saveUser">Save User</v-btn>
    </v-col>
  </v-row>
</v-card>

<v-card style="margin-right: 5px;margin-bottom: 10px;margin-top: 5px;background-color: white" elevation="0">
      <v-form ref="formRef" lazy-validation style="margin-top: 10px;margin-left: 5px;margin-right: 5px;">
       <v-row>
        <!-- User Name -->
        <v-col cols="12" md="6">
          <v-text-field
            :rules="[rules.required]"
            v-model="formData.userName"
            label="User Name"
            density="compact"
            variant="outlined"
            required
          ></v-text-field>
        </v-col>
        <!-- Password -->
        <v-col cols="12" md="6">
          <v-text-field
            variant="outlined"
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
            variant="outlined"
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
            variant="outlined"
            :rules="[rules.required]"
            v-model="formData.company"
            label="Company"
            density="compact"
          ></v-text-field>
        </v-col>

        <!-- Activation Date -->
        <v-col cols="12" md="6">
            <v-date-input
              variant="outlined"
              :rules="[rules.required]"
              :first-day-of-week="1"
              label="Activation Date"
              density="compact"
              v-model="formData.activationDate">
            </v-date-input>
        </v-col>

        <!-- Enable -->
        <v-col cols="12" md="6">
          <v-checkbox
            v-model="formData.enable"
            label="Enabled"
            density="compact"
          ></v-checkbox>
        </v-col>
      </v-row>
    </v-form>
  </v-card>
</template>

<style scoped>

.button-container {
  width: 100%;
  display: flex;              /* Abilita Flexbox */
  justify-content: space-between; /* Posiziona i pulsanti agli estremi */
  align-items: center;        /* Allinea verticalmente i pulsanti */
  padding: 10px;              /* Spaziatura interna (opzionale) */
}

.right-buttons {
  /*border: solid black 1px;*/
  display: flex;              /* Abilita Flexbox per i pulsanti a destra */
  justify-content: end;
  gap: 5px;                  /* Spazio tra i pulsanti a destra */
  /*background-color: transparent;*/
}

:deep(.v-breadcrumbs--density-default) {
  padding: 0px;
}

:deep(.v-breadcrumbs-item ) {
  padding:0px;
}

</style>
