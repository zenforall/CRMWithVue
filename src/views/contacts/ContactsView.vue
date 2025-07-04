<script setup lang="ts">
import { onMounted,onUnmounted, ref } from "vue";
import { useContactStore } from "@/stores/contact"
import { useIsMobile } from "@/composables/useIsMobile";
import type { BreadCrumbItem } from "@/models/BreadCrumbItem";
import { useTheme } from 'vuetify'
import { useRouter } from 'vue-router'

const headers = ref<TableHeader[]>([]);
const contacts = ref<Contact[]>([]);
const contactStore = useContactStore();
const { isMobile } = useIsMobile();
const router = useRouter();

const theme = useTheme();


onUnmounted(async () => {
      //
})

onMounted(async () => {

  const breadCrumbItems :  BreadCrumbItem[] = [];
  breadCrumbItems.push(
    {
        title: "Contacts",
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
            key: "name",
            title : "Name",
            value: "name",
            sortable: true
        });
        headers.value.push({
            key: "surname",
            title : "Surname",
            value: "surname",
            sortable: true
        });
        headers.value.push({
            key: "phone",
            title : "Mobile phone",
            value: "phone",
            sortable: true
        });
        headers.value.push({
            key: "email",
            title : "Email",
            value: "email",
            sortable: true
        });

        headers.value.push({
            key: "actions",
            title : "Actions",
            value: "actions",
            sortable: false
        });

        await contactStore.getContacts("C");
        contacts.value = contactStore.contacts;
});

const emit =defineEmits<{
  (event: "breadCrumbHandler", message: BreadCrumbItem[]): void;
}>();

function printItem(item: Contact) : void {

}

function editItem(item: Contact): void {


      contactStore.setContactId(item.id);
      contactStore.getContactDetail();
      if (contactStore.contactDetail === undefined || contactStore.contactDetail === null) {
        window.alert("No Contact Detail found --> Maybe has been deleted by another User");
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
            title: "Customers",
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

      //contactStore.setUserAction("U"); // Azione Update
      router.push({name:'contactDetail'});
    }

function askForDeletingItem(item: Contact): void {
}

function doDeleteItem() : void {
  ;
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

      <div>
        <v-menu>
        <template v-slot:activator="{ props }">
          <v-btn
            icon="mdi-dots-horizontal" size="x-small" color="secondary" v-bind="props">
          </v-btn>
        </template>
        <v-list style="background-color: white;">
          <v-list-item @click="printItem(item)">
            <div style="display: flex;">
              <v-icon color="secondary" size="large">mdi-file-pdf-box</v-icon>
              <v-list-item-title>Print</v-list-item-title>
            </div>
          </v-list-item>

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
