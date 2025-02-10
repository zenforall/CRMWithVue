<script setup lang="ts">
import { useMenuStore } from '@/stores/menu'
import { useRouter } from 'vue-router'
import { onMounted, ref } from 'vue'

const router = useRouter()
let items = ref<TreeNode[]>([])
const menuStore = useMenuStore()

const emit =defineEmits<{
  (event: "breadCrumbHandler", message: BreaCrumbItem[]): void;
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

    const breadCrumbItems :  BreaCrumbItem[] = [];
    if (node.id === 3) {
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
    } else if (node.id === 4) {
        breadCrumbItems.push(
          {
              title: "Admin",
              disabled : false,
              href : ""
          },
          {
              title: "Companies",
              disabled : false,
              href : ""
          }
        );
    }

    emit("breadCrumbHandler",breadCrumbItems);

    router.push(node.link)
  }
}

onMounted(async () => {
  await menuStore.getMenu() // costuisce il menu ed attende finchè il metodo è terminato
  items.value = menuStore.menu // assegna il menù costruito alla variabile principali con i valori del menu visualizzato
})
</script>

<template>
  <v-container>
    <v-list density="compact" nav open-strategy="single">
      <template v-for="(item, index) in items">
        <v-list-group v-if="hasChildren(item)">
          <template v-slot:activator="{ props }" :key="item.id">
            <v-list-item
              v-bind="props"
              :key="item.id"
              :title="item.title"
              :prepend-icon="item.icon"
              rounded="xl"
            ></v-list-item>
          </template>
          <div v-for="(child, index) in getNodeChildren(item)">
            <v-list-item
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
</style>
