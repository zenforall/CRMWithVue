<template>
  <v-app>
    <v-container>
      <v-row justify="center">
        <v-col cols="12" md="10">
          <v-card class="elevation-15" style="background: linear-gradient(135deg, #5e5e5e, #2e2e2e); border-radius: 20px;">
            <v-card-title class="white--text">
              <span class="headline" style="font-family: 'Roboto', sans-serif;">Elegant User Table</span>
            </v-card-title>
            <v-data-table
              :headers="headers"
              :items="items"
              item-value="id"
              class="elevation-1"
            >
              <!-- Name Column with Editing -->
              <template v-slot:item.name="{ item }">
                <div v-if="!editingCell || editingCell.rowId !== item.id || editingCell.field !== 'name'">
                  <v-chip
                    label
                    class="cursor-pointer text-subtitle-1 white--text"
                    @click="enableEditing(item.id, 'name', item.name)"
                    style="background-color: #6200ea; border-radius: 25px; padding: 10px 20px; margin-bottom: 10px; box-shadow: 0px 4px 12px rgba(0, 0, 0, 0.3); transition: 0.3s;"
                  >
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
                      class="text-h6"
                      :error-messages="nameError"
                      style="background-color: #3e3e3e; border-radius: 15px; transition: 0.3s;"
                      @focus="focusField = 'name'"
                      @blur="focusField = null"
                    />
                  </v-col>
                  <v-col cols="4" class="d-flex justify-center align-center">
                    <v-btn icon color="green" @click="confirmEditing(item)" :style="btnStyle('confirm')">
                      <v-icon>mdi-check-circle</v-icon>
                    </v-btn>
                    <v-btn icon color="red" @click="cancelEditing" :style="btnStyle('cancel')">
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
                    class="cursor-pointer text-subtitle-1 white--text"
                    @click="enableEditing(item.id, 'age', item.age)"
                    style="background-color: #6200ea; border-radius: 25px; padding: 10px 20px; margin-bottom: 10px; box-shadow: 0px 4px 12px rgba(0, 0, 0, 0.3); transition: 0.3s;"
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
                      label="Edit Age"
                      type="number"
                      class="text-h6"
                      :error-messages="ageError"
                      style="background-color: #3e3e3e; border-radius: 15px; transition: 0.3s;"
                      @focus="focusField = 'age'"
                      @blur="focusField = null"
                    />
                  </v-col>
                  <v-col cols="4" class="d-flex justify-center align-center">
                    <v-btn icon color="green" @click="confirmEditing(item)" :style="btnStyle('confirm')">
                      <v-icon>mdi-check-circle</v-icon>
                    </v-btn>
                    <v-btn icon color="red" @click="cancelEditing" :style="btnStyle('cancel')">
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
  </v-app>
</template>

<script lang="ts">
import { defineComponent, ref } from 'vue';

interface Item {
  id: number;
  name: string;
  age: number;
}

export default defineComponent({
  name: 'SophisticatedEditableTable',
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

    const nameError = ref<string | null>(null);
    const ageError = ref<string | null>(null);

    const enableEditing = (rowId: number, field: keyof Item, value: any) => {
      editingCell.value = { rowId, field, value };
      if (field === 'name') nameError.value = null;
      if (field === 'age') ageError.value = null;
    };

    const confirmEditing = (item: Item) => {
      if (validateInput()) {
        if (editingCell.value) {
          const { rowId, field, value } = editingCell.value;
          const itemToUpdate = items.value.find((i) => i.id === rowId);
          if (itemToUpdate) {
            itemToUpdate[field] = value;
          }
          editingCell.value = null;
        }
      }
    };

    const cancelEditing = () => {
      editingCell.value = null;
    };

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

    // Style dynamically based on the button action (confirm/cancel)
    const btnStyle = (type: string) => {
      if (type === 'confirm') {
        return {
          backgroundColor: '#4caf50',
          borderRadius: '50%',
          transition: '0.3s',
          boxShadow: '0px 4px 12px rgba(0, 0, 0, 0.2)',
        };
      } else {
        return {
          backgroundColor: '#f44336',
          borderRadius: '50%',
          transition: '0.3s',
          boxShadow: '0px 4px 12px rgba(0, 0, 0, 0.2)',
        };
      }
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
      focusField,
      btnStyle,
    };
  },
});
</script>

<style scoped>
.v-chip {
  cursor: pointer;
  box-shadow: 0px 4px 12px rgba(0, 0, 0, 0.3);
  transition: transform 0.3s ease-in-out;
}

.v-chip:hover {
  transform: scale(1.1);
}

.v-btn.icon {
  width: 40px;
  height: 40px;
  border-radius: 50%;
}

.v-btn.icon:hover {
  transform: scale(1.1);
  background-color: #6200ea;
}

.v-text-field {
  background-color: #3e3e3e;
  border-radius: 15px;
  box-shadow: 0px 4px 12px rgba(0, 0, 0, 0.3);
}

.v-text-field:focus {
  box-shadow: 0px 0px 15px rgba(98, 0, 234, 0.7);
}

.v-card {
  border-radius: 20px;
  box-shadow: 0px 6px 20px rgba(0, 0, 0, 0.3);
}

.v-card-title {
  background-color: #6200ea;
  color: white;
  font-weight: 600;
  padding: 20px;
  font-size: 1.8rem;
  border-radius: 20px 20px 0 0;
}

.v-data-table {
  background-color: #2e2e2e;
  color: white;
}

.v-btn.icon:hover {
  background-color: #bb86fc;
}

.v-btn {
  padding: 0;
}

.v-row {
  margin-top: 10px;
}

.text-h6 {
  color: #bb86fc;
}
</style>
