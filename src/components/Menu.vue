<script setup lang="ts">
import { ref,computed } from "vue";
import { VTreeview } from 'vuetify/labs/VTreeview'
import { useRouter } from 'vue-router';
import type { forEachChild } from "typescript";

interface TreeNode {
  id: number;
  title: string;
  children?: TreeNode[] | null;
  link: string; // Proprietà opzionale per la navigazione
}

  const items = ref<TreeNode[]>([
      {
        id: 1,
        title: 'Home',
        children: null,
        link: '/dashboard' // Collegamento alla Home
      },
      {
        id: 2,
        title: 'Contacts',
        link : '',
        children: [
          { id: 3, title: 'Customers',link: '/customers' },
          { id: 4, title: 'Prospects',link: '/prospects' },
          { id: 5, title: 'Leads',link: '/leads' }
        ]
      },
      {
        id: 6,
        title: 'Sales',
        children: null,
        link: '/sales'
      }      
    ]);

const router = useRouter();

const selected = ref<number[]>([]);

// Funzione per gestire il click sui nodi e ottenere l'ID
const onNodeClick = (newSelected: unknown): void => {
  const selectedNodes = newSelected as number[];

  if (selectedNodes.length == 0) return; // Se clicco due volte sullo stesso nodo esco dalla funzione
  console.log('Nodi selezionati:', selectedNodes);
  selected.value = selectedNodes;

  console.log(items);

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
      min-height="100%"
      @update:activated="onNodeClick">
    </v-treeview>

</template>
