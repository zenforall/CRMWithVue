<template>
    <v-container>
      <v-row justify="center">
        <v-col cols="12" md="8">
          <v-card>
            <v-card-title>
              <span class="headline">User Table</span>
            </v-card-title>
            <v-data-table
              :headers="headers"
              :items="items"
              item-value="id"
              class="elevation-1"
            >
              <template v-slot:item.name="{ item }">
                <div v-if="!editingCell || editingCell.rowId !== item.id || editingCell.field !== 'name'">
                  <v-chip label @click="enableEditing(item.id, 'name', item.name)" class="cursor-pointer">
                    {{ item.name }}
                  </v-chip>
                </div>
                <v-row v-else>
                  <v-col cols="8">
                    <v-text-field
                      v-model="editingCell.value"
                      dense
                      outlined
                      label="Edit Name"
                      :error-messages="nameError"
                    />
                  </v-col>
                  <v-col cols="4" class="d-flex justify-center align-center">
                    <v-btn icon color="green" @click="confirmEditing(item)">
                      <v-icon>mdi-check</v-icon>
                    </v-btn>
                    <v-btn icon color="red" @click="cancelEditing">
                      <v-icon>mdi-close</v-icon>
                    </v-btn>
                  </v-col>
                </v-row>
              </template>

              <template v-slot:item.age="{ item }">
                <div v-if="!editingCell || editingCell.rowId !== item.id || editingCell.field !== 'age'">
                  <v-chip label @click="enableEditing(item.id, 'age', item.age)" class="cursor-pointer">
                    {{ item.age }}
                  </v-chip>
                </div>
                <v-row v-else>
                  <v-col cols="8">
                    <v-text-field
                      v-model="editingCell.value"
                      dense
                      outlined
                      label="Edit Age"
                      type="number"
                      :error-messages="ageError"
                    />
                  </v-col>
                  <v-col cols="4" class="d-flex justify-center align-center">
                    <v-btn icon color="green" @click="confirmEditing(item)">
                      <v-icon>mdi-check</v-icon>
                    </v-btn>
                    <v-btn icon color="red" @click="cancelEditing">
                      <v-icon>mdi-close</v-icon>
                    </v-btn>
                  </v-col>
                </v-row>
              </template>
            </v-data-table>
          </v-card>
        </v-col>
      </v-row>
    </v-container>
</template>

<script lang="ts">
import { defineComponent, ref } from 'vue';

interface Item {
  id: number;
  name: string;
  age: number;
}

export default defineComponent({
  name: 'EditableTable',
  setup() {
    const headers = ref([
      { text: 'Name', value: 'name' },
      { text: 'Age', value: 'age' },
    ]);

    const items = ref<Item[]>([
      { id: 1, name: 'John Doe', age: 25 },
      { id: 2, name: 'Jane Smith', age: 30 },
      { id: 3, name: 'Alice Johnson', age: 22 },
    ]);

    // Stato per la cella in modifica
    const editingCell = ref<{ rowId: number; field: keyof Item; value: any } | null>(null);

    // Errori di validazione
    const nameError = ref<string | null>(null);
    const ageError = ref<string | null>(null);

    // Funzione per abilitare la modifica della cella
    const enableEditing = (rowId: number, field: keyof Item, value: any) => {
      editingCell.value = { rowId, field, value };
      // Reset degli errori quando si entra in modalità modifica
      if (field === 'name') nameError.value = null;
      if (field === 'age') ageError.value = null;
    };

    // Funzione per confermare la modifica
    const confirmEditing = (item: Item) => {
      if (validateInput()) {
        if (editingCell.value) {
          const { rowId, field, value } = editingCell.value;
          let itemToUpdate : Item | undefined;

          itemToUpdate = items.value.find((i) => i.id === rowId);
          if (itemToUpdate) {
            itemToUpdate[field] = value;
          }
          editingCell.value = null;
        }
      }
    };

    // Funzione per annullare la modifica
    const cancelEditing = () => {
      editingCell.value = null;
    };

    // Funzione di validazione
    const validateInput = (): boolean => {
      if (editingCell.value) {
        const { field, value } = editingCell.value;
        if (field === 'name' && (!value || value.length < 3)) {
          nameError.value = 'Name must be at least 3 characters.';
          return false;
        }
        if (field === 'age' && (isNaN(value) || value < 18 || value > 100)) {
          ageError.value = 'Age must be a number between 18 and 100.';
          return false;
        }
      }
      return true;
    };

    return {
      headers,
      items,
      editingCell,
      enableEditing,
      confirmEditing,
      cancelEditing,
      nameError,
      ageError,
    };
  },
});
</script>

<style scoped>
.v-chip {
  cursor: pointer;
}

.v-btn {
  margin-left: 10px;
}

.v-row {
  margin-top: 10px;
}

.v-card {
  background-color: #f9f9f9;
}

.v-card-title {
  background-color: #6200ea;
  color: white;
  font-weight: 600;
  padding: 10px;
}

.v-btn.icon {
  width: 36px;
  height: 36px;
  border-radius: 50%;
}

.v-btn.icon:hover {
  background-color: #6200ea;
  color: white;
}

.v-text-field {
  max-width: 100%;
}
</style>
