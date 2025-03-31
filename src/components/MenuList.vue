<script setup lang="ts">
import { useMenuStore } from '@/stores/menu'
import { useRouter } from 'vue-router'
import { onMounted, ref } from 'vue'
import type { BreadCrumbItem } from '../models/BreadCrumbItem';

const router = useRouter()
let items = ref<TreeNode[]>([])
const menuStore = useMenuStore()

const emit =defineEmits<{
  (event: "breadCrumbHandler", message: BreadCrumbItem[]): void;
}>();


// Funzione per ottenere i figli di un nodo
const hasChildren = (node: TreeNode) => {
  if (node.children === null || undefined) return false
  if (node.children?.length === 0) return false

  return true
}

const getNodeChildren = (node: TreeNode) => {
  return node.children
}

// Funzione di navigazione
const navigate = (node: TreeNode) => {
  if (node.link) {
    /* Qui si puà mettere della logic ain fase di navigazione */
    router.push(node.link)
  }
}

onMounted(async () => {
  await menuStore.getMenu() // costuisce il menu ed attende finchè il metodo è terminato
  items.value = menuStore.menu // assegna il menù costruito alla variabile principali con i valori del menu visualizzato
})
</script>

<template>
  <v-container class="bg-surface" style="height: 100%;">
    <v-list density="compact" nav open-strategy="single">
      <template v-for="(item, index) in items">
        <v-list-group v-if="hasChildren(item)">
          <template v-slot:activator="{ props }" :key="item.id">
            <v-list-item
              class="text-text"
              v-bind="props"
              :key="item.id"
              :title="item.title"
              :prepend-icon="item.icon"
              rounded="xl"
            ></v-list-item>
          </template>
          <div v-for="(child, index) in getNodeChildren(item)">
            <v-list-item
              class="text-text"
              link
              :key="child.id"
              :title="child.title"
              :prepend-icon="child.icon"
              @click="navigate(child)"
              rounded="xl"
            ></v-list-item>
          </div>
        </v-list-group>
        <v-list-item v-else
          class="text-text"
          link
          @click="navigate(item)"
          :title="item.title"
          :prepend-icon="item.icon"
          rounded="xl">
        </v-list-item>
      </template>
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

:deep(.v-list-item--nav .v-list-item-title) {
    font-size: .8125rem;
    font-weight: normal;
    letter-spacing: normal;
    line-height: 1rem;
}
</style>
