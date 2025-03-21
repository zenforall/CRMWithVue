<template>
    <v-container>
      <v-row justify="center">
        <v-col cols="12" md="10">
          <v-card class="elevation-2" style="border-radius: 12px;">
            <v-card-title class="text-h6" style="font-weight: 600; color: #333;">
              Elegant User Table
            </v-card-title>
            <v-data-table
              :headers="headers"
              :items="items"
              item-value="id"
              class="elevation-0"
            >
              <!-- Name Column with Editing -->
              <template v-slot:item.name="{ item }">
                <div v-if="!editingCell || editingCell.rowId !== item.id || editingCell.field !== 'name'">
                  <div @click="enableEditing(item.id, 'name', item.name)" style="cursor: pointer;">
                    {{ item.name }}
                  </div>
                </div>
                <v-row v-else>
                  <v-col cols="8" style="border-radius: 8px;border: #333 1px solid; padding: 0;">

                    <input type="text" v-model="editingCell.value"/>


                  </v-col>
                  <v-col cols="4" class="d-flex" style="align-items: center;padding: 0;">
                    <v-btn icon density="compact" color="primary" @click="confirmEditing(item)">
                      <v-icon>mdi-check-circle</v-icon>
                    </v-btn>
                    <v-btn icon density="compact" color="grey" @click="cancelEditing">
                      <v-icon>mdi-close-circle</v-icon>
                    </v-btn>
                  </v-col>
                </v-row>
              </template>

              <!-- Age Column with Editing -->
              <template v-slot:item.age="{ item }">
                <div v-if="!editingCell || editingCell.rowId !== item.id || editingCell.field !== 'age'">
                  <v-chip
                    label
                    class="cursor-pointer"
                    @click="enableEditing(item.id, 'age', item.age)"
                    style="background-color: #f5f5f5; color: #333; border-radius: 25px; padding: 8px 16px; transition: background-color 0.2s ease;"
                  >
                    {{ item.age }}
                  </v-chip>
                </div>

                <v-row v-else>
                  <v-col cols="8">
                    <v-text-field
                      v-model="editingCell.value"
                      dense
                      outlined
                      density="compact"
                      type="number"
                      style="background-color: #fff; border-radius: 8px;"
                      @focus="focusField = 'age'"
                      @blur="focusField = null"
                    />
                  </v-col>
                  <v-col cols="4" class="d-flex justify-center align-center">
                    <v-btn icon density="compact" color="primary" @click="confirmEditing(item)">
                      <v-icon>mdi-check-circle</v-icon>
                    </v-btn>
                    <v-btn icon density="compact" color="grey" @click="cancelEditing">
                      <v-icon>mdi-close-circle</v-icon>
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
  name: 'CleanElegantEditableTable',
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

    const editingCell = ref<{ rowId: number; field: keyof Item; value: any } | null>(null);
    const focusField = ref<string | null>(null); // Store which field is being focused

    const enableEditing = (rowId: number, field: keyof Item, value: any) => {
      editingCell.value = { rowId, field, value };
    };

    const confirmEditing = (item: Item) => {
      if (editingCell.value) {
        const { rowId, field, value } = editingCell.value;
        const itemToUpdate = items.value.find((i) => i.id === rowId);
        if (itemToUpdate) {
          console.log(itemToUpdate);
          console.log(field);

          //(itemToUpdate[field] as any) = value; // altra soluzione
          if (field === 'name' && typeof value === 'string') {
            itemToUpdate.name = value;
          } else if (field === 'age' && typeof value === 'number') {
            itemToUpdate.age = value;
          }

        }
        editingCell.value = null;
      }
    };

    const cancelEditing = () => {
      editingCell.value = null;
    };

    return {
      headers,
      items,
      editingCell,
      enableEditing,
      confirmEditing,
      cancelEditing,
      focusField,
    };
  },
});
</script>

<style scoped>
.v-chip {
  cursor: pointer;
  transition: background-color 0.2s ease;
}

.v-chip:hover {
  background-color: #e0e0e0;
}

.v-btn.icon {
  width: 36px;
  height: 36px;
  border-radius: 50%;
  padding: 0;
}

.v-btn.icon:hover {
  background-color: #e0e0e0;
}

.v-text-field {
  background-color: #fff;
  border-radius: 8px;
}

.v-card {
  border-radius: 12px;
  padding: 16px;
}

.v-card-title {
  font-size: 1.25rem;
  font-weight: 600;
  color: #333;
}

.v-data-table {
  background-color: transparent;
}

.v-btn {
  padding: 0;
}

.v-row {
  margin-top: 10px;
}

.text-h6 {
  color: #333;
}
</style>
