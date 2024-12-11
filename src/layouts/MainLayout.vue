<script setup lang="ts">
import Header from '../components/Header.vue'
import Footer from '../components/Footer.vue'
import Menu from '../components/Menu.vue'
import { RouterView } from 'vue-router'
</script>

<template>
  <v-row>
    <v-col cols="2">
      <Menu />
    </v-col>
    <v-col cols="10">
      <Header />
      <RouterView />
    </v-col>
  </v-row>
  <v-row>
    <v-col cols="12">
      <Footer />
    </v-col>
  </v-row>

  <!--
    <div class="row">
      <div class="col-2">
        <Menu />
      </div>
      <div class="col-10">
        <Header />
        <RouterView />
      </div>
    </div>
    <div class="row">
      <div class="col-12">
        <Footer />
      </div>
    </div>

    style css
    /* General Flexbox Layout */
    .row {
      display: flex;
      flex-wrap: wrap; /* Ensures elements wrap to the next line if needed */
      width: 100%;
    }

    .col-2 {
      flex: 0 0 16.6667%; /* 2 columns out of 12 */
      max-width: 16.6667%;
    }

    .col-10 {
      flex: 0 0 83.3333%; /* 10 columns out of 12 */
      max-width: 83.3333%;
    }

    .col-12 {
      flex: 0 0 100%; /* Full width for footer */
      max-width: 100%;
    }

    /* Optional Styling for Components */
    .row > div {
      padding: 8px; /* Add some spacing around elements */
    }

    .row {
      margin-bottom: 16px; /* Add spacing between rows */
    }

    Spiegazione
    display: flex: Gestisce il layout come contenitore flessibile.
    flex: 0 0 X%: Definisce la larghezza percentuale delle colonne in base alla griglia a 12 colonne di Vuetify (colonne di larghezza fissa).
    max-width: Garantisce che gli elementi non superino la larghezza desiderata.
    flex-wrap: wrap: Consente agli elementi di andare su una nuova riga quando lo spazio non è sufficiente.


    flex: [flex-grow] [flex-shrink] [flex-basis];

    Significato dei valori:
    flex-grow (0 nel tuo esempio):

    Determina quanto spazio aggiuntivo un elemento dovrebbe occupare rispetto agli altri nella stessa riga.
    Un valore di 0 significa che l'elemento non si espande oltre il suo valore base (flex-basis).
    flex-shrink (0 nel tuo esempio):

    Determina quanto un elemento può ridursi quando lo spazio è limitato.
    Un valore di 0 significa che l'elemento non si restringe, mantenendo sempre la larghezza definita da flex-basis.
    flex-basis (16.6667% nel tuo esempio):

    Specifica la dimensione di base dell'elemento prima che vengano applicati flex-grow e flex-shrink.
    In questo caso, il valore 16.6667% significa che la larghezza di base dell'elemento è 16.6667% della larghezza del contenitore padre, ovvero 2 colonne su una griglia di 12 colonne.
    Applicazione: flex: 0 0 16.6667%;
    flex-grow: 0: L'elemento non si espande per riempire lo spazio extra disponibile.
    flex-shrink: 0: L'elemento non si restringe anche se lo spazio è limitato.
    flex-basis: 16.6667%: L'elemento occupa esattamente il 16.6667% della larghezza del contenitore padre.
    In pratica, questa configurazione forza l'elemento ad avere una larghezza fissa pari al 16.6667% del contenitore senza espandersi o restringersi.

    Contesto della griglia:
    Una griglia a 12 colonne come quella di Vuetify suddivide il 100% in 12 parti uguali:
    1 colonna = 100% / 12 = 8.3333%
    2 colonne = 16.6667%
    10 colonne = 83.3333%
    12 colonne = 100%
    Quindi, flex: 0 0 16.6667% è usato per creare una colonna larga 2 unità su una griglia a 12 colonne

    -->
</template>
