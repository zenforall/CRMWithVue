Per avviare il server vite su un particolare IP e porta (utile per fare i test sul cellulare)
Ovviamente il cellulare deve essere collegato alla stessa Wi-FI

npx vite --host 192.168.1.164  --port 5155

npm run dev -- --host  --> https://stackoverflow.com/questions/71939532/npm-run-dev-host-network-not-exposed/71941435#71941435


---- Questa alla soluzione relativa al problema riscontrato quando eseguivo il deploy dell'applicazione ----

Dopo aver eseguito il deploy era sempre visualizzata una pagina bianca.
Il motivo, e questo lo aveva segnalato anche chatGPT, era nella scorretta configurazione
nel file di routing


I was having the same problem. My local build was working fine, but after building for production and deploying to my server, I was getting a similar error.

My console error was

Uncaught (in promise) TypeError: i.then is not a function"
The stacktrace pointed to vue-router. I tried many things until I saw your comment. In my routes, I had functions for the components like:

  {
    path: '/profile',
    name: 'Profile',
    component: () => Profile, //this was the problem
  },
I changed it to:

  {
    path: '/profile',
    name: 'Profile',
    component: Profile, //this was the fix
  },