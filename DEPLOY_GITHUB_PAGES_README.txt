URL del video che spiega il procedimento: https://youtu.be/i_XbW-FsLKk?si=FSGr2PjeoaduCRQ9

Creare il file vue.config.js
Per utenti Windows creare il file deploy.bat
Per utenti Linux creare il file deploy.sh
    Eseguire il comando chmod +x deploy.sh per rendere il file eseguibile

Modificare il file package.json ed includere lo script deploy.bat oppure deploy.sh


E' necessario creare una chiave privata/pubblica per poter eseguire il deploy su GitHub

ssh-keygen -t ed25519 -C "warxsg@gmail.com"

Le chiavi devono essere salvate in due file distinti, ma non devono mai essere commitate su GitHub per
motivi di sicurezza (GitHub non permette il commit a meno che l'utente non vada a settare un flag 
che forzi il commit)

La chiave pubblica deve essere inserita in GitHub nella sezione SSH and GPG keys dei Settings di GitHub

La chiave permette di eseguire l'upload del pacchetto compilato per il deploy (Approfondire meglio l'argomento)

Per utenti Windows:

"scripts": {
    "dev": "vite",
    "build": "run-p type-check \"build-only {@}\" --",
    "preview": "vite preview",
    "test:unit": "vitest",
    "test:e2e": "start-server-and-test preview http://localhost:4173 'cypress run --e2e'",
    "test:e2e:dev": "start-server-and-test 'vite dev --port 4173' http://localhost:4173 'cypress open --e2e'",
    "build-only": "vite build",
    "type-check": "vue-tsc --build --force",
    "lint": "eslint . --fix",
    "deploy": "deploy.bat",
    "format": "prettier --write src/"
  }

Per utenti Linux:

"scripts": {
    "dev": "vite",
    "build": "run-p type-check \"build-only {@}\" --",
    "preview": "vite preview",
    "test:unit": "vitest",
    "test:e2e": "start-server-and-test preview http://localhost:4173 'cypress run --e2e'",
    "test:e2e:dev": "start-server-and-test 'vite dev --port 4173' http://localhost:4173 'cypress open --e2e'",
    "build-only": "vite build",
    "type-check": "vue-tsc --build --force",
    "lint": "eslint . --fix",
    "deploy": "sh deploy.sh",
    "format": "prettier --write src/"
  }



