<script setup lang="ts">
import { ref,computed } from "vue";
import { VTreeview } from 'vuetify/labs/VTreeview'
import { useRouter } from 'vue-router';

interface TreeNode {
  id: number;
  title: string;
  children?: TreeNode[] | null;
  link?: string; // Proprietà opzionale per la navigazione
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
  console.log('Nodi selezionati:', selectedNodes);
  selected.value = selectedNodes;
};

// Funzione per gestire il click su un nodo specifico e ottenere l'ID
const handleNodeClick = (item: TreeNode) => {
  console.log('ID del nodo cliccato:', item.id);
  // Puoi anche fare altre operazioni qui, come navigare verso una pagina o aggiornare uno stato
};

const handleToggle = (item: TreeNode) => {
      console.log('Nodo espanso/compresso:', item);
    };


</script>

<template>

    <v-treeview
      :items="items"
      item-value="id"
      item-text="title"
      item-children="children"
      selectable
      open-on-click
      elevation="6"
      min-height="100%"
      @update:model-value="onNodeClick">
    </v-treeview>

</template>
