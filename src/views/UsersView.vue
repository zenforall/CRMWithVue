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
      router.push({name:'userDetail'});
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
