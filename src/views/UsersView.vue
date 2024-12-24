<script setup lang="ts">
import { onMounted, ref } from "vue";

    const headers = ref<TableHeader[]>([]);
    const users = ref<User[]>([]);

    const formatDate = (date: Date): string => {
      return date.toLocaleDateString("it-IT", {
        year: "numeric",
        month: "2-digit",
        day: "2-digit",
      });
    };    

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

        for (var i=1;i<21;i++) {
                users.value.push({
                    id:i.toString(),
                    userName: "test"+i.toString()+"@test.com",
                    password:"testPassword"+i.toString(),
                    email:"test"+i.toString()+"@test.com",
                    company:"",
                    activationDate: new Date(),
                    enabled:true
            })
        }
    })
</script>

<template>
  <v-data-table
    :headers="headers"
    :items="users"
    item-key="username"
    density="compact"
    class="fixed-height-table"
    :items-per-page-options="[5, 10]">
    <template v-slot:item.activationDate="{ item }">
        <span>{{ formatDate(item.activationDate) }}</span>
    </template>    
  </v-data-table>
</template>

<style>
.fixed-height-table {
max-height: 55vh; /* Imposta un'altezza massima */
overflow-y: auto;  /* Aggiungi uno scroll verticale se necessario */
}
</style>
