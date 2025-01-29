<script setup lang="ts">
import { useMenuStore } from '@/stores/menu';
import { useRouter } from 'vue-router';
import { onMounted, ref } from "vue";

   const router = useRouter();
   let items = ref<TreeNode[]>([])

   const menuStore = useMenuStore();

    // Funzione per ottenere i figli di un nodo
    const hasChildren = (node: TreeNode) => {
      if (node.children === null || undefined)
        return false;

      if (node.children?.length === 0)
        return false;

      return true;
    };

    // Funzione di navigazione
    const navigate = (node: TreeNode) => {
      if (node.link) {
        router.push(node.link);
      }
    };

    onMounted(async () => {
      await menuStore.getMenu(); // costuisce il menu ed attende finchè il metodo è terminato
      items.value = menuStore.menu; // assegna il menù costruito alla variabile principali con i valori del menu visualizzato
    })

    const group1Open = ref(true); // Gruppo 1 chiuso di default
    const group2Open = ref(true); // Gruppo 2 chiuso di default

</script>

<template>
  <v-container>
    <v-list density="compact" nav>
          <!-- Prima lista espandibile -->
          <v-list-group value="Gestione utenti">
            <template v-slot:activator="{ props }">
              <v-list-item v-bind="props" title="Gestione utenti" prepend-icon="mdi-account-group" rounded="xl"></v-list-item>
            </template>

            <v-list-item link title="Visualizza utenti" prepend-icon="mdi-eye" rounded="xl"></v-list-item>
            <v-list-item link title="Aggiungi utente" prepend-icon="mdi-plus" rounded="xl"></v-list-item>
          </v-list-group>

          <!-- Seconda lista espandibile -->
          <v-list-group value="Impostazioni">
            <template v-slot:activator="{ props }">
              <v-list-item v-bind="props" title="Impostazioni" prepend-icon="mdi-cog" rounded="xl"></v-list-item>
            </template>

            <v-list-item link title="Profilo" prepend-icon="mdi-account" rounded="xl"></v-list-item>
            <v-list-item link title="Sicurezza" prepend-icon="mdi-lock" rounded="xl"></v-list-item>
          </v-list-group>
        </v-list>
  </v-container>
</template>


<style scoped>

.v-list-group {
    --prepend-width: 10px; /* Aumenta la larghezza della colonna icona */
}

/* Quando seleziono un elemento della lista tale elemento cambia di sfondo ed i suoi bordi
.v-list-item--active {
  border-radius: 20px;
  background-color: #1976d2;
  color: white;
}
*/
</style>
