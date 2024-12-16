<script setup lang="ts">
import { onMounted, ref } from "vue";
import { VTreeview } from 'vuetify/labs/VTreeview'
import { useRouter } from 'vue-router';
import { useMenuStore } from "../stores/menu"

const router = useRouter();
let items = ref<TreeNode[]>([])
const selected = ref<number[]>([]);

const menuStore = useMenuStore();

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
      selectable
      activatable
      open-on-click
      elevation="6"
      expand-icon="mdi-folder"
      collapse-icon="mdi-folder-open"
      min-height="100%"
      @update:activated="onNodeClick">
    </v-treeview>

</template>
