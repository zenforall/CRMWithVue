<script setup lang="ts">
import { onMounted,onUnmounted} from "vue";
import UserFormFilterView from "./UserFormFilterView.vue";
import { UserComposableService } from "../composable/UserComposableService";

    const emit =defineEmits<{
      (event: "breadCrumbHandler", message: BreaCrumbItem[]): void;
    }>();

    const userComposableService = new UserComposableService(emit);

    function myEventHandler(event: any) {
      userComposableService.checkAndAssignMobileStatus;
    }

    const doFilterUsersHandler = async (message:UserFilter) => {
        await  userComposableService.userStore.search(message);
        userComposableService.users.value = userComposableService.userStore.users;
    }

    onUnmounted(async () => {
      window.removeEventListener("resize", myEventHandler);
    })

    onMounted(async () => {
        window.addEventListener("resize", myEventHandler);
        userComposableService.drawerFilter.value = false;
        userComposableService.checkAndAssignMobileStatus;
        await userComposableService.fetchUsers();
    })

</script>

<template>

  <v-container>
      <div style="display: flex;direction: row; justify-content: space-between;width: 100%;margin-bottom: 10px;">
        <v-btn color="#42b883" rounded @click="userComposableService.addNewUser()">Create User</v-btn>
        <div style="display: flex; direction: row; justify-items: end;">
          <v-btn color="#42b883" rounded @click="userComposableService.displayFilters()">Search</v-btn>
        </div>
      </div>

    <v-navigation-drawer app v-model="userComposableService.drawerFilter.value" location="right" :temporary="true" :permanent="false" style="margin-top: 10px;">
      <UserFormFilterView @openCloseUserFilterDrawerHandler="userComposableService.openCloseUserFilterDrawerHandler()"
                          @doFilterUsersHandler="doFilterUsersHandler"
                          @doResetFilterUsersHandler="userComposableService.doResetFilterUsersHandler()"/>
    </v-navigation-drawer>

    <v-data-table
    :headers="userComposableService.headers.value"
    :items="userComposableService.users.value"
    items-per-page="5"
    item-key="username"
    density="compact"
    ref="vTablee"
    select-strategy="all"
    show-select
    class="fixed-height-table"
    :hide-default-header="userComposableService.isMobile.value"
    :items-per-page-options="[5,10]">

    <template v-slot:body="{ items }" v-if="userComposableService.isMobile.value">
      <div v-for="item in items" :key="item.id" class="mobile-row">
          <v-card class="mb-2">
            <v-card-title>User: {{ item.userName }}</v-card-title>
            <v-card-subtitle>Email: {{ item.email }}</v-card-subtitle>
            <v-card-subtitle>Enabled: {{ item.enabled }}</v-card-subtitle>
            <v-card-text>
              <div style="display: flex;direction: row;justify-content: end;">
                <v-icon class="me-2" size="small" @click="userComposableService.editItem(item)">mdi-pencil</v-icon>
                <v-icon class="me-2" size="small" @click="userComposableService.askForDeletingItem(item)">mdi-delete</v-icon>
              </div>
            </v-card-text>
          </v-card>
        </div>
    </template>
    <template v-slot:item.activationDate="{ item }" v-if="!userComposableService.isMobile.value">
        <span>{{ userComposableService.formatDate( item.activationDate  ) }}</span>
    </template>
    <template v-slot:item.actions="{ item }" v-if="!userComposableService.isMobile.value">
      <div style="text-wrap: nowrap;">
          <v-icon class="me-2" size="small" @click="userComposableService.editItem(item)">mdi-pencil</v-icon>
          <v-icon class="me-2" size="small" @click="userComposableService.askForDeletingItem(item)">mdi-delete</v-icon>
      </div>
     </template>

  </v-data-table>
</v-container>

<v-dialog
      v-model="userComposableService.showDeleteConfirmDialog.value"
      width="auto">
      <v-card
        max-width="400"
        prepend-icon="mdi-delete-alert"
        title="Confirm Deletion">
        <v-card-text>Are you sure to delete User {{userComposableService.userToDelete.value?.userName}} ?</v-card-text>
        <template v-slot:actions>
          <div style="display: flex;flex-direction: row;justify-content: end;">
            <v-btn
              class="ms-auto"
              text="YES"
              @click="userComposableService.doDeleteItem();userComposableService.showDeleteConfirmDialog.value = false"
            ></v-btn>
            <v-btn
              class="ms-auto"
              text="NO"
              @click="userComposableService.showDeleteConfirmDialog.value = false"
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
