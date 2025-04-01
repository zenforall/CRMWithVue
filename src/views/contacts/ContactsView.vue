<script setup lang="ts">
import { onMounted,onUnmounted, ref } from "vue";
import { useContactStore } from "@/stores/contact"
import { useIsMobile } from "@/composables/useIsMobile";
import type { BreadCrumbItem } from "@/models/BreadCrumbItem";
import { useTheme } from 'vuetify'

const headers = ref<TableHeader[]>([]);
const contacts = ref<Contact[]>([]);
const contactStore = useContactStore();
const { isMobile } = useIsMobile();

const theme = useTheme();

onUnmounted(async () => {
      //
})

onMounted(async () => {

  const breadCrumbItems :  BreadCrumbItem[] = [];
  breadCrumbItems.push(
    {
        title: "Admin",
        disabled : false,
        href : ""
    },
    {
        title: "Customers",
        disabled : false,
        href : ""
    }
  );
  emit("breadCrumbHandler",breadCrumbItems);

  headers.value.push({
            title : "Name",
            value: "name",
            sortable: true
        });
        headers.value.push({
            title : "Surname",
            value: "surname",
            sortable: true
        });
        headers.value.push({
            title : "Email",
            value: "email",
            sortable: true
        });

        headers.value.push({
            title : "Actions",
            value: "actions",
            sortable: true
        });

        await contactStore.getContacts("C");
        contacts.value = contactStore.contacts;
});

const emit =defineEmits<{
  (event: "breadCrumbHandler", message: BreadCrumbItem[]): void;
}>();

function editItem(item: Contact): void {

}

function askForDeletingItem(item: Contact): void {
}

function doDeleteItem() {
}

function addNewContact() : void {
}


</script>

<template>
  <v-card style="margin-right: 5px;">
    <v-row style="display: flex;align-items: center;background-color: white;">
          <v-col style="margin-top: 10px;">
            <v-btn color="primary" style="margin-left: 5px;" @click="addNewContact">Create</v-btn>
          </v-col>
          <v-col style="display: flex;justify-content: end;margin-right: 5px;margin-top: 10px;">
              <v-btn color="primary"><v-icon start>mdi-magnify</v-icon>Filters</v-btn>
          </v-col>
    </v-row>

    <!--
    <v-navigation-drawer color="surface" app v-model="drawerFilter" location="right" :temporary="true" :permanent="false">
      <UserFormFilterView @openCloseUserFilterDrawerHandler="openCloseUserFilterDrawerHandler"
                          @doFilterUsersHandler="doFilterUsersHandler"
                          @doResetFilterUsersHandler="doResetFilterUsersHandler"/>
    </v-navigation-drawer>
    -->

    <v-data-table
    :headers="headers"
    :items="contacts"
    items-per-page="5"
    item-key="id"
    density="compact"
    ref="vTablee"
    select-strategy="all"
    show-select
    :hide-default-header="isMobile"
    :items-per-page-options="[5,10]">

    <template v-slot:body="{ items }" v-if="isMobile">
      <div v-for="item in items" :key="item.id">
          <v-card class="mb-2">
            <v-card-title>Name: {{ item.name + " " + item.surname }}</v-card-title>
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

    <template v-slot:item.actions="{ item }" v-if="!isMobile">
      <div style="text-wrap: nowrap;">
          <v-icon color="secondary" class="me-2" size="large" @click="editItem(item)">mdi-pencil</v-icon>
          <v-icon color="secondary" class="me-2" size="large" @click="askForDeletingItem(item)">mdi-delete</v-icon>
      </div>
    </template>

  </v-data-table>
</v-card>
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
</style>
