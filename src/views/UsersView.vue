<script setup lang="ts">
import { onMounted,onUnmounted, ref } from "vue";
import { useRouter } from 'vue-router'
import { useUserStore } from "../stores/user"
import UserFormFilterView from "./UserFormFilterView.vue";
import { useI18n } from "vue-i18n";
import { UserService } from "../services/UserService";

    const userService = new UserService();
    const { t } = useI18n();
    const headers = ref<TableHeader[]>([]);
    const users = ref<User[]>([]);

    const showDeleteConfirmDialog = ref(false);

    const userToDelete = ref<User>();

    const formatDate = (date: Date | null): string => {

      if (date == null) return "";

      return date.toLocaleDateString("it-IT", {
        year: "numeric",
        month: "2-digit",
        day: "2-digit",
      });
    };

    const userStore = useUserStore();
    const router = useRouter();
    const drawerFilter = ref(false);

    let isMobile = ref(false);

    function checkAndassignMobileStatus() : void {
      if (window.innerWidth < 769) {
        isMobile.value = true;
      } else {
        isMobile.value = false;
      }
    }

    function myEventHandler(event: any) {
      checkAndassignMobileStatus();
    }

    onUnmounted(async () => {
      window.removeEventListener("resize", myEventHandler);
    })

    onMounted(async () => {

        window.addEventListener("resize", myEventHandler);

        drawerFilter.value = false;
        checkAndassignMobileStatus();

        headers.value.push({
            title : t("userName"),
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
            title : "Activation",
            value: "activationDate",
            sortable: true
        });
        headers.value.push({
            title : t("enabled"),
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

        //await userService.fetchUsers();
        //users.value = userService.users;

    })

    const emit =defineEmits<{
      (event: "breadCrumbHandler", message: BreaCrumbItem[]): void;
    }>();

    function editItem(item: User): void {
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

    function askForDeletingItem(item: User): void {
      userToDelete.value = item;
      showDeleteConfirmDialog.value = true;
    }

    function doDeleteItem() {
      if (userToDelete.value != null) {
        userStore.setUserId(userToDelete.value.id);
        userStore.deleteUser();
      }
    }


    function displayFilters() : void {
      drawerFilter.value = !drawerFilter.value;
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

    function openCloseUserFilterDrawerHandler(message:string) : void {
        drawerFilter.value = !drawerFilter.value;
    }

   // const handleLoadUsers = async (value: string) => {

    const doFilterUsersHandler = async (message:UserFilter) => {
        await userStore.search(message);
        users.value = userStore.users;
    }


    const doResetFilterUsersHandler = async (message:string) => {
      await userStore.resetSearch();
      users.value = userStore.users;
    }

</script>

<template>

  <v-container>
      <div style="display: flex;direction: row; justify-content: space-between;width: 100%;margin-bottom: 10px;">
        <v-btn color="#42b883" rounded @click="addNewUser">Create User</v-btn>
        <div style="display: flex; direction: row; justify-items: end;">
          <v-btn color="#42b883" rounded @click="displayFilters">Search</v-btn>
        </div>
      </div>

    <v-navigation-drawer app v-model="drawerFilter" location="right" :temporary="true" :permanent="false" style="margin-top: 10px;">
      <UserFormFilterView @openCloseUserFilterDrawerHandler="openCloseUserFilterDrawerHandler"
                          @doFilterUsersHandler="doFilterUsersHandler"
                          @doResetFilterUsersHandler="doResetFilterUsersHandler"/>
    </v-navigation-drawer>

    <v-data-table
    :headers="headers"
    :items="users"
    items-per-page="5"
    item-key="username"
    density="compact"
    ref="vTablee"
    select-strategy="all"
    show-select
    class="fixed-height-table"
    :hide-default-header="isMobile"
    :items-per-page-options="[5,10]">

    <template v-slot:body="{ items }" v-if="isMobile">
      <div v-for="item in items" :key="item.id" class="mobile-row">
          <v-card class="mb-2">
            <v-card-title>User: {{ item.userName }}</v-card-title>
            <v-card-subtitle>Email: {{ item.email }}</v-card-subtitle>
            <v-card-subtitle>Enabled: {{ item.enabled }}</v-card-subtitle>
            <v-card-text>
              <div style="display: flex;direction: row;justify-content: end;">
                <v-icon class="me-2" size="small" @click="editItem(item)">mdi-pencil</v-icon>
                <v-icon class="me-2" size="small" @click="askForDeletingItem(item)">mdi-delete</v-icon>
              </div>
            </v-card-text>
          </v-card>
        </div>
    </template>
    <template v-slot:item.activationDate="{ item }" v-if="!isMobile">
        <span>{{ formatDate( item.activationDate  ) }}</span>
    </template>
    <template v-slot:item.actions="{ item }" v-if="!isMobile">
      <div style="text-wrap: nowrap;">
          <v-icon class="me-2" size="small" @click="editItem(item)">mdi-pencil</v-icon>
          <v-icon class="me-2" size="small" @click="askForDeletingItem(item)">mdi-delete</v-icon>
      </div>
     </template>

  </v-data-table>
</v-container>

<v-dialog
      v-model="showDeleteConfirmDialog"
      width="auto">
      <v-card
        max-width="400"
        prepend-icon="mdi-delete-alert"
        title="Confirm Deletion">
        <v-card-text>Are you sure to delete User {{userToDelete?.userName}} ?</v-card-text>
        <template v-slot:actions>
          <div style="display: flex;flex-direction: row;justify-content: end;">
            <v-btn
              class="ms-auto"
              text="YES"
              @click="doDeleteItem();showDeleteConfirmDialog = false"
            ></v-btn>
            <v-btn
              class="ms-auto"
              text="NO"
              @click="showDeleteConfirmDialog = false"
            ></v-btn>
          </div>
        </template>
      </v-card>
    </v-dialog>

</template>

<style>
.fixed-height-table {
/*max-height: 60vh;*/ /* Imposta un'altezza massima */
overflow-y: auto;  /* Aggiungi uno scroll verticale se necessario */
}
</style>
