<script setup lang="ts">
import { onMounted,onUnmounted, ref } from "vue";
import { useRouter } from 'vue-router'
import { useUserStore } from "@/stores/user"
import UserFormFilterView from "./UserFormFilterView.vue";
import { useI18n } from "vue-i18n";
import type { BreadCrumbItem } from "@/models/BreadCrumbItem";
import { useIsMobile } from "@/composables/useIsMobile";
import { formatDate }  from "@/utils/formatData";
import { useTheme } from 'vuetify'

    const theme = useTheme();
    const { t } = useI18n();
    const headers = ref<TableHeader[]>([]);
    const users = ref<User[]>([]);
    const showDeleteConfirmDialog = ref(false);
    const userToDelete = ref<User>();

    const userStore = useUserStore();
    const router = useRouter();
    const drawerFilter = ref(false);
    const { isMobile } = useIsMobile(); // Verifica se la risoluzione del dispositivo è Mobile

    const items = [] as string[];
    items.push("Test");
    items.push("Test1");


    onUnmounted(async () => {
      //
    })

    onMounted(async () => {
        drawerFilter.value = false;

        /*
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
        */

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
            sortable: false
        });

        await userStore.getUsers()
        users.value = userStore.users;
    })

    const emit =defineEmits<{
      (event: "breadCrumbHandler", message: BreadCrumbItem[]): void;
    }>();

    function editItem(item: User): void {
      userStore.setUserId(item.id);
      userStore.getUserDetail();
      if (userStore.userDetail === undefined || userStore.userDetail === null) {
        window.alert("No User Detail found --> Maybe has been deleted by another User");
        return;
      }

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
         },
         {
            title: "Edit",
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
       <v-label class="text-secondary" style="font-weight: bold;font-size: x-large;opacity: 0.87;">Users</v-label>
    </v-col>
    <v-col style="display: flex;justify-content: end;margin-right: 5px;margin-top: 0px;margin-bottom: 10px;padding: 10px;">
       <v-btn  style="margin-left: 5px;background-color:#03a840;color: #fff;" @click="addNewUser">Create User</v-btn>
    </v-col>
  </v-row>
</v-card>

  <v-card style="margin-right: 5px;background-color: #f9f9f9;" elevation="0">
    <v-row style="display: flex;align-items: center;background-color: white;">
       <v-col style="display: flex;justify-content: start;align-items: center; margin-right: 5px;margin-top: 10px;">
            <v-text-field
              style="max-width: 300px;margin-left: 15px;"
              class="d-none d-sm-block"
              density="compact"
              label="Search"
              prepend-inner-icon="mdi-magnify"
              variant="outlined"
              flat
              hide-details
              single-line>
           </v-text-field>
          <v-btn style="background-color:#03a840;color: #fff;margin-left: 10px;" @click="displayFilters"><!--<v-icon start>mdi-filter-cog</v-icon>-->Filters</v-btn>
      </v-col>
    </v-row>

    <v-navigation-drawer style="background-color: white;" app v-model="drawerFilter" :width="320" location="right" :temporary="true" :permanent="false">
      <UserFormFilterView @openCloseUserFilterDrawerHandler="openCloseUserFilterDrawerHandler"
                          @doFilterUsersHandler="doFilterUsersHandler"
                          @doResetFilterUsersHandler="doResetFilterUsersHandler"/>
    </v-navigation-drawer>


    <v-data-table
    class="custom-table"
    :headers="headers"
    :items="users"
    items-per-page="5"
    item-key="username"
    density="compact"
    ref="vTablee"
    select-strategy="all"
    show-select
    :hide-default-header="isMobile"
    :hide-default-footer="isMobile"
    :items-per-page-options="[5,10]">

    <template v-slot:body="{ items }" v-if="isMobile">
      <div v-for="item in items" :key="item.id" class="mobile-row">
          <v-card class="mb-2">
            <v-card-title>User: {{ item.userName }}</v-card-title>
            <v-card-subtitle>Email: {{ item.email }}</v-card-subtitle>
            <v-card-subtitle>Enabled: {{ item.enabled }}</v-card-subtitle>
            <v-card-text>
              <div style="display: flex;direction: row;justify-content: end;">
                <v-icon color="secondary"  size="large" @click="editItem(item)">mdi-pencil</v-icon>
                <v-icon color="secondary"  size="large" @click="askForDeletingItem(item)">mdi-delete</v-icon>
              </div>
            </v-card-text>
          </v-card>
        </div>
    </template>
    <template v-slot:item.enabled="{ item }">
      <div style="text-align: left;"><v-icon>mdi-checkbox-blank-circle-outline</v-icon></div>
    </template>
    <template v-slot:item.activationDate="{ item }" v-if="!isMobile">
        <span>{{ formatDate( item.activationDate,"it-IT") }}</span>
    </template>
    <template v-slot:item.actions="{ item }" v-if="!isMobile">
      <div>
      <!--
      <v-menu>
      <template v-slot:activator="{ props }">
        <v-btn
          icon="mdi-dots-horizontal" size="x-small" color="secondary" v-bind="props">
        </v-btn>
      </template>
      <v-list style="background-color: white;">
        <v-list-item @click="editItem(item)">
          <div style="display: flex;">
            <v-icon color="secondary" size="large">mdi-pencil</v-icon>
            <v-list-item-title>Edit</v-list-item-title>
          </div>
        </v-list-item>
        <v-list-item @click="askForDeletingItem(item)">
          <div style="display: flex;">
            <v-icon color="secondary" size="large">mdi-delete</v-icon>
            <v-list-item-title>Delete</v-list-item-title>
          </div>
        </v-list-item>
      </v-list>
    </v-menu>
  -->
          <v-icon color="secondary" class="me-2" size="large" @click="editItem(item)">mdi-pencil-outline</v-icon>
          <v-icon color="secondary" class="me-2" size="large" @click="askForDeletingItem(item)">mdi-delete-outline</v-icon>
      </div>
     </template>

  </v-data-table>
</v-card>

<v-dialog
      v-model="showDeleteConfirmDialog"
      width="auto">
      <v-card
        color="background"
        max-width="400">
        <v-card-title>
            <v-label class="text-secondary" style="font-weight: bold;font-size: large;opacity: 0.87;">Are you sure ?</v-label>
        </v-card-title>
        <v-card-text class="text-secondary">Are you sure to delete User <strong>{{userToDelete?.userName}} </strong> ?</v-card-text>
        <template v-slot:actions>
          <div style="display: flex;flex-direction: row;justify-content: end;">
            <v-btn
              variant="outlined" color="secondary"
              text="Disagree"
              @click="showDeleteConfirmDialog = false"
            ></v-btn>
            <v-btn
              style="background-color:#03a840;color: #fff;font-weight: bold;"
              text="Agree"
              @click="doDeleteItem();showDeleteConfirmDialog = false"
            ></v-btn>
          </div>
        </template>
      </v-card>
    </v-dialog>

</template>

<style scoped>
.fixed-height-table {
/*max-height: 60vh;*/ /* Imposta un'altezza massima */
overflow-y: auto;  /* Aggiungi uno scroll verticale se necessario */
}

::v-deep(.v-data-table-header__content) {
  color: v-bind('theme.current.value.colors.secondary') !important;
  font-weight: normal;
}

:deep(.v-data-table__td) {
  color:v-bind('theme.current.value.colors.text') !important;
}

:deep(.v-table__wrapper) {
  background-color: white !important;
}


:deep(.v-data-table-footer) {
  background-color: /*v-bind('theme.current.value.colors.background')*/ white !important;
}

:deep(.v-breadcrumbs--density-default) {
  padding: 0px;
}

:deep(.v-breadcrumbs-item ) {
  padding:0px;
}

</style>
