In Vuetify, puoi utilizzare i breakpoint per visualizzare o nascondere elementi in base alla larghezza della finestra. Vuetify fornisce delle classi di visibilità che ti permettono di fare questo.

Per visualizzare un elemento solo su una particolare risoluzione (ad esempio, sulla risoluzione md), puoi utilizzare la classe d-none per nascondere un elemento su tutte le risoluzioni, e poi usare una classe come d-md-block per renderlo visibile solo a partire dalla risoluzione md (medium).

Ecco un esempio di codice:

<template>
  <v-container>
    <!-- Visibile solo per risoluzione md -->
    <v-row>
      <v-col class="d-none d-md-block">
        Questo elemento è visibile solo su dispositivi con risoluzione md o superiore.
      </v-col>
    </v-row>
  </v-container>
</template>
Spiegazione:
d-none: Nasconde l'elemento su tutte le risoluzioni.
d-md-block: Mostra l'elemento come un blocco (visibile) solo su dispositivi con larghezza minima di md (>= 960px).
Vuetify gestisce questi breakpoint predefiniti:

xs: (< 600px)
sm: (600px - 959px)
md: (960px - 1279px)
lg: (1280px - 1919px)
xl: (>= 1920px)
Puoi quindi modificare le classi di visibilità per adattarle alle tue necessità.

Se preferisci utilizzare il CSS per visualizzare un elemento solo su una determinata risoluzione (ad esempio, per la risoluzione md), puoi sfruttare le media queries.

Ecco un esempio di come farlo:

Edit
/* Nascondi l'elemento su tutte le risoluzioni */
.elemento {
  display: none;
}

/* Mostra l'elemento solo su dispositivi con risoluzione md o superiore */
@media (min-width: 960px) {
  .elemento {
    display: block;
  }
}

<template>
  <v-container>
    <v-row>
      <v-col class="elemento">
        Questo elemento è visibile solo su dispositivi con risoluzione md o superiore.
      </v-col>
    </v-row>
  </v-container>
</template>
Spiegazione:
.elemento { display: none; }: Nasconde l'elemento su tutte le risoluzioni.
La media query @media (min-width: 960px) applica lo stile display: block (o qualsiasi altro stile desiderato) solo quando la larghezza della finestra è pari o superiore a 960px (ovvero la risoluzione md in Vuetify).
Questo approccio ti dà maggiore flessibilità per applicare regole CSS personalizzate senza dipendere dalle classi predefinite di Vuetify.