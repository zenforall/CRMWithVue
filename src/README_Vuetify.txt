Ecco la mia risposta molto semplificata, anch'io sono un principiante.

v-app è il punto di ingresso per la magia di Vuetify, aiuta a eseguire il codice in background, ecc... Deve essere utilizzato solo una volta in tutta l'app e avvolgere tutto il resto.

V-content è una dichiarazione di dove si trova il contenuto delle pagine, quindi dovrebbe avvolgere tutto tranne le cose che sono sempre presenti nella tua app, ad esempio la barra degli strumenti e forse il piè di pagina.

V-container è parte del sistema di griglia. Insieme a v-layout e v-flex ti permette di costruire il layout delle tue pagine. Le 2 proprietà principali di v-container sono grid-list (da xs a xl) che controlla il margine tra gli elementi e fluid che controlla il margine sinistro e destro, pensa al margine della stampante.
Se viene utilizzato fluid, il margine sarà più sottile.