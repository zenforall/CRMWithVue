<script setup lang="ts">
import { onMounted, ref } from "vue";
import { useRouter } from 'vue-router'
import { useUserStore } from "../stores/user"

    const headers = ref<TableHeader[]>([]);
    const users = ref<User[]>([]);

    const formatDate = (date: Date): string => {
      return date.toLocaleDateString("it-IT", {
        year: "numeric",
        month: "2-digit",
        day: "2-digit",
      });
    };

    const userStore = useUserStore();
    const router = useRouter();

    onMounted(async () => {

        headers.value.push({
            title : "Username",
            value: "userName",
            sortable: true
        });
        headers.value.push({
            title : "Email",
            value: "email",
            sortable: true
        });
        headers.value.push({
            title : "Company",
            value: "company",
            sortable: true
        });
        headers.value.push({
            title : "Enabled",
            value: "enabled",
            sortable: true
        });

        headers.value.push({
            title : "Actions",
            value: "actions",
            sortable: true
        });

        await userStore.getUsers()
        users.value = userStore.users;
    })

    const emit =defineEmits<{
      (event: "breadCrumbHandler", message: BreaCrumbItem[]): void;
    }>();

    function editItem(item: User): void {
      //router.push({name:'userDetail',params:{id:item.id}});

      /* Aggiungere un parametro nel Router userDetail/:id
      router.push({
        name: 'userDetail',
        state: {
          userId: item.id,
        },
      });
      */
      userStore.setUserId(item.id);
      userStore.getUserDetail();
      if (userStore.userDetail === undefined || userStore.userDetail === null) {
        window.alert("No User Detail found --> Maybe has been deleted by another User");
        return;
      }

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
         },
         {
            title: "Edit User",
            disabled : false,
            href : ""
         }
      );

      emit("breadCrumbHandler",breadCrumbItems);

      userStore.setUserAction("U"); // Azione Update
      router.push({name:'userDetail'});
    }

    function deleteItem(item: User): void {
      let confirmed: boolean = window.confirm("Are you sure to delete User "+item.userName+" ?");
      if (confirmed) {
        userStore.setUserId(item.id);
        userStore.deleteUser();
      }
    }

    function displayFilters() : void {
      drawer.value = !drawer.value;
    }


    function addNewUser() : void {
      userStore.setUserId("");
      userStore.setUserAction("C"); // Azione Create
      userStore.getUserDetail();

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
         },
         {
            title: "New User",
            disabled : false,
            href : ""
         }
      );

      emit("breadCrumbHandler",breadCrumbItems);

      router.push({name:'userDetail'});
    }

    const drawer = ref(false);

</script>

<template>

  <v-container>
    <v-toolbar density="compact" elevation="1" rounded="lg" style="margin-bottom: 20px;" color="#F8F8F8">
      <div style="display: flex;direction: row; justify-content: space-between;width: 100%;">
        <v-btn color="#42b883" rounded @click="addNewUser">+ Create User</v-btn>
        <div style="display: flex; direction: row; justify-items: end;">
          <v-btn color="#42b883" rounded @click="displayFilters">Filters</v-btn>
        </div>
      </div>
    </v-toolbar>

    <v-navigation-drawer app v-model="drawer" location="right" :permanent="false" style="border: 0px;margin-top: 10px;">
      <v-row>
          <v-col cols="12">
          <v-text-field
            label="User Name"
            width="90%"
            density="compact"
          ></v-text-field>
        </v-col>

        <!-- Email -->
        <v-col cols="12">
          <v-text-field
            label="Email"
            width="90%"
            density="compact"
          ></v-text-field>
        </v-col>
        <!-- Email -->
        <v-col cols="12">
          <v-text-field
            label="Company"
            width="90%"
            density="compact"
          ></v-text-field>
        </v-col>

        <v-col cols="12">
            <v-date-input
              label="From"
              width="90%"
              density="compact">
            </v-date-input>
        </v-col>
        <v-col cols="12">
            <v-date-input
              width="90%"
              label="To"
              density="compact">
            </v-date-input>
        </v-col>
        <v-col cols="12">
          <v-checkbox
            label="Enabled"
            density="compact"
          ></v-checkbox>
        </v-col>
      </v-row>
      <v-row>
        <v-col cols="12">
          <div style="width: 100%; display: flex;flex-direction: row;justify-content: center;">
            <v-toolbar density="compact" color="#F8F8F8" elevation="1">
              <div style="width:100%; display: flex; flex-direction: row;justify-content: center">
                <v-btn color="#42b883" rounded>> Search</v-btn>
                <v-btn color="#42b883" rounded>> Reset</v-btn>
              </div>
          </v-toolbar>
        </div>
        </v-col>
      </v-row>
    </v-navigation-drawer>

    <!--
    <v-expansion-panels>
      <v-expansion-panel style="margin-bottom: 10px;">
        <v-expansion-panel-title style="background-color: #F8F8F8; color: #42b883;">FILTERS</v-expansion-panel-title>
        <v-expansion-panel-text>
          <v-row>
          <v-col cols="12" md="4">
          <v-text-field
            label="User Name"
            density="compact"
          ></v-text-field>
        </v-col>

        <v-col cols="12" md="4">
          <v-text-field
            label="Email"
            density="compact"
          ></v-text-field>
        </v-col>
        <v-col cols="12" md="4">
          <v-text-field
            label="Company"
            density="compact"
          ></v-text-field>
        </v-col>

        <v-col cols="12" md="4">
            <v-date-input
              label="From"
              density="compact">
            </v-date-input>
        </v-col>
        <v-col cols="12" md="4">
            <v-date-input
              label="To"
              density="compact">
            </v-date-input>
        </v-col>
        <v-col cols="12" md="4">
          <v-checkbox
            label="Enabled"
            density="compact"
          ></v-checkbox>
        </v-col>
      </v-row>
      <v-row>
        <v-col cols="12">
          <v-toolbar density="compact" color="#F8F8F8" elevation="1">
            <div style="width: 100%; display: flex; flex-direction: row;justify-content: end;">
              <v-btn color="#42b883" rounded>> Apply Filters</v-btn>
              <v-btn color="#42b883" rounded>> Reset Filters</v-btn>
            </div>
        </v-toolbar>
        </v-col>
      </v-row>

        </v-expansion-panel-text>
      </v-expansion-panel>
  </v-expansion-panels>
-->

  <v-data-table
    :headers="headers"
    :items="users"
    items-per-page="5"
    item-key="username"
    density="compact"
    select-strategy="all"
    show-select
    class="fixed-height-table"
    :items-per-page-options="[5,10]">
    <template v-slot:item.activationDate="{ item }">
        <span>{{ formatDate(item.activationDate) }}</span>
    </template>
    <template v-slot:item.actions="{ item }">
      <div style="text-wrap: nowrap;">
          <v-icon class="me-2" size="small" @click="editItem(item)">mdi-pencil</v-icon>
          <v-icon class="me-2" size="small" @click="deleteItem(item)">mdi-delete</v-icon>
      </div>
     </template>

  </v-data-table>
</v-container>

</template>

<style>
.fixed-height-table {
/*max-height: 60vh;*/ /* Imposta un'altezza massima */
overflow-y: auto;  /* Aggiungi uno scroll verticale se necessario */
}
</style>
