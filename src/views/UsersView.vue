<script setup lang="ts">
import { onMounted, ref } from "vue";
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

    onMounted(async () => {

        headers.value.push({
            title : "Username",
            value: "userName"
        });
        headers.value.push({
            title : "Password",
            value: "password"
        });
        headers.value.push({
            title : "Activation Date",
            value: "activationDate"
        });

        headers.value.push({
            title : "Actions",
            value: "actions"
        });

        await userStore.getUsers()
        users.value = userStore.users;
    })

    function editItem(item: User): void {
      window.alert("Editing "+item.userName);
    }

    function deleteItem(item: User): void {
      window.alert("Deleting "+item.userName);
    }

</script>

<template>
  <v-data-table
    :headers="headers"
    :items="users"
    item-key="username"
    density="compact"
    select-strategy="all"
    show-select
    class="fixed-height-table"
    :items-per-page-options="[5, 10]">
    <template v-slot:item.activationDate="{ item }">
        <span>{{ formatDate(item.activationDate) }}</span>
    </template>
    <template v-slot:item.actions="{ item }">
          <v-icon class="me-2" size="small" @click="editItem(item)">mdi-pencil</v-icon>
          <v-icon class="me-2" size="small" @click="deleteItem(item)">mdi-delete</v-icon>
     </template>

  </v-data-table>
</template>

<style>
.fixed-height-table {
/*max-height: 60vh;*/ /* Imposta un'altezza massima */
overflow-y: auto;  /* Aggiungi uno scroll verticale se necessario */
}
</style>
