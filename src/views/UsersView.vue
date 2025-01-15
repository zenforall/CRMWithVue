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

    function addNewUser() : void {
      userStore.setUserId("");
      userStore.setUserAction("C"); // Azione Create
      userStore.getUserDetail();
      router.push({name:'userDetail'});
    }

</script>

<template>

  <v-container>
  <v-row>
      <v-col>
        <v-btn color="primary" @click="addNewUser">Add New User</v-btn>
      </v-col>
  </v-row>
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
</v-container>

</template>

<style>
.fixed-height-table {
/*max-height: 60vh;*/ /* Imposta un'altezza massima */
overflow-y: auto;  /* Aggiungi uno scroll verticale se necessario */
}
</style>
