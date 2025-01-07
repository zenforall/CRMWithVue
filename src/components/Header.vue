<template>
 <div class="toolbar-container">
    <!-- Toolbar personalizzata -->
    <div class="custom-toolbar">
      <!-- Titolo a sinistra -->
      <div class="toolbar-title">
        CRM With Vue
      </div>

      <!-- Campo di ricerca -->
      <div class="toolbar-search">
        <v-text-field
          placeholder="Cerca..."
          variant="outlined"
          hide-details
          dense
          clearable
          prepend-inner-icon="mdi-magnify"
        ></v-text-field>
      </div>

      <!-- Avatar utente con menu -->
      <div class="toolbar-user">
        <v-menu>
          <template #activator="{ props }">
            <v-btn icon v-bind="props">
              <v-avatar>
                <img src="https://via.placeholder.com/150" alt="User Avatar" />
              </v-avatar>
            </v-btn>
          </template>
          <v-list>
            <v-list-item @click="">
              <v-list-item-title>Logout</v-list-item-title>
            </v-list-item>
          </v-list>
        </v-menu>
      </div>
    </div>
  </div>
</template>

<style>
/* Contenitore padre */
.toolbar-container {
  display: flex;
  flex-direction: column;
  width: 100%;
  height: 100%;
  margin: 0;
  padding: 0;
  box-sizing: border-box;
}

/* Toolbar */
.custom-toolbar {
  display: flex;
  align-items: center;
  justify-content: space-between;
  width: 100%; /* La toolbar si estende per tutta la larghezza */
  /*height: 64px;*/ /* Altezza standard */
  padding: 0 16px;
  background-color: #1976d2; /* Colore primario */
  color: white;
  box-shadow: 0px 2px 4px rgba(0, 0, 0, 0.2); /* Ombra */
  box-sizing: border-box;
}

/* Titolo a sinistra */
.toolbar-title {
  font-size: 20px;
  font-weight: bold;
  white-space: nowrap;
}

/* Campo di ricerca */
.toolbar-search {
  flex: 1; /* Occupa lo spazio disponibile */
  margin: 0 16px;
}

/* Avatar utente */
.toolbar-user {
  display: flex;
  align-items: center;
}
</style>
