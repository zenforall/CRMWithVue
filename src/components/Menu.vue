<script setup lang="ts">
import { onMounted, ref } from "vue";
import { VTreeview } from 'vuetify/labs/VTreeview'
import { useRouter } from 'vue-router';
import { useMenuStore } from "../stores/menu"

const router = useRouter();
let items = ref<TreeNode[]>([])
const selected = ref<number[]>([]);

const menuStore = useMenuStore();

const emit =defineEmits<{
  (event: "breadCrumbHandler", message: BreaCrumbItem[]): void;
}>();

onMounted(async () => {
  await menuStore.getMenu(); // costuisce il menu ed attende finchè il metodo è terminato
  items.value = menuStore.menu; // assegna il menù costruito alla variabile principali con i valori del menu visualizzato
})

// Funzione per gestire il click sui nodi e ottenere l'ID
const onNodeClick = (newSelected: unknown): void => {

  const selectedNodes = newSelected as number[];

  if (selectedNodes.length == 0) return; // Se clicco due volte sullo stesso nodo esco dalla funzione
  selected.value = selectedNodes;

  let idToSearch : number;

  idToSearch = selected.value[0];

  let result : TreeNode | null;

  result  = findNodeById(items.value,idToSearch);

  if (result != null) {

    const breadCrumbItems :  BreaCrumbItem[] = [];
    if (idToSearch === 3) {
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
    }

    emit("breadCrumbHandler",breadCrumbItems);
    router.push(result.link);
  }
};


function findNodeById(data: TreeNode[], targetId: number): TreeNode | null {
  for (const node of data) {
    if (node.id === targetId) {
      return node; // Nodo trovato
    }
    if (node.children) {
      const found = findNodeById(node.children, targetId);
      if (found) {
        return found; // Nodo trovato nei figli
      }
    }
  }
  return null; // Nodo non trovato
}

</script>

<template>
    <v-treeview
      :items="items"
      item-value="id"
      item-text="title"
      item-children="children"
      density="compact"
      activatable
      open-on-click
      elevation="6"

      min-height="100%"
      @update:activated="onNodeClick"
      class="gmail-treeview">
      <template  #title="{ item }">
        <div class="tree-node">
          <v-icon v-if="item.icon" class="tree-icon">{{ item.icon }}</v-icon>
          <span class="tree-label">{{ item.title }}</span>
        </div>
      </template>
      <template v-slot:prepend ="{item,isOpen}">
        <v-icon v-if="item.children">
          <template v-if="item.id === 2">
            {{ isOpen ? 'mdi-folder-open' : 'mdi-folder' }}
          </template>
          <template v-if="item.id === 20">
            {{ isOpen ? 'mdi-archive-outline' : 'mdi-archive' }}
          </template>
        </v-icon>
      </template>
    </v-treeview>

  <!--
  <v-card elevation="0" style="margin-bottom: 0px;">
      <v-card-title style="padding: 16px 24px;font-size: .9375rem;font-weight: normal;">
        <v-icon icon="mdi-account-key-outline" style="margin-right: 10px;"></v-icon>Home
      </v-card-title>
    </v-card>
    <v-expansion-panels elevation="0">
      <v-expansion-panel style="margin-right: 10px;">
        <v-expansion-panel-title>
          <v-icon icon="mdi-account-key-outline" style="margin-right: 10px;"></v-icon>Admin
        </v-expansion-panel-title>
        <v-expansion-panel-text>
          Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat.
        </v-expansion-panel-text>
      </v-expansion-panel>
      <v-expansion-panel style="margin-right: 10px;">
        <v-expansion-panel-title>
          <v-icon icon="mdi-account-key-outline" style="margin-right: 10px;"></v-icon>Contacts
        </v-expansion-panel-title>
        <v-expansion-panel-text>
          Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat.
        </v-expansion-panel-text>
      </v-expansion-panel>
    </v-expansion-panels>
    <v-card elevation="0" style="margin-bottom: 0px;">
      <v-card-title style="padding: 16px 24px;font-size: .9375rem;font-weight: normal;">
        <v-icon icon="mdi-account-key-outline" style="margin-right: 10px;"></v-icon>Sales
      </v-card-title>
    </v-card>
    <v-card elevation="0" style="margin-bottom: 0px;">
      <v-card-title style="padding: 16px 24px;font-size: .9375rem;font-weight: normal;">
        <v-icon icon="mdi-account-key-outline" style="margin-right: 10px;"></v-icon>Reports
      </v-card-title>
    </v-card>

  -->
</template>

<style scoped>
.gmail-treeview {
  background-color: white;
  border: 1px solid #e0e0e0;
  border-radius: 4px;
  padding: 8px;
  max-width: 300px;
}

/* Nodo attivo */
.v-treeview-node__content--active {
  background-color: #e3f2fd;
  color: #1976d2;
  border-radius: 4px;
  font-weight: bold;
}

/* Nodo hover */
.v-treeview-node__content:hover {
  background-color: #f5f5f5;
}

/* Icona accanto al nodo */
.tree-icon {
  margin-right: 8px;
  color: #757575;
}

/* Label del nodo */
.tree-label {
  font-size: 14px;
  color: #424242;
}

/* Nodo espandibile (freccia) */
.v-treeview-node__toggle {
  color: #757575;
  transition: transform 0.3s ease;
}

/* Nodo espandibile attivo */
.v-treeview-node__toggle--open {
  transform: rotate(90deg);
}
</style>
