Ci sono vari modi per salvare in modo persistente le informazioni dell'applicazione.
Per informazioni si intende valori come :

- token per chiamare i web service rest
- User Name
- Formato della Data
- Flag per capire se l'utente è autenticato o meno.

Le informazioni possono essere salvate in :

- localStorage --> Le info restano permanenti anche quando si chiude il browser
- sessionStorage --> Le info vengono eliminate quando si chiude il browser
- IndexedDB (Database presente nel browser)

Le informazioni possono essere criptate tramite la libreria crypto.js

Nello store app.ts c'è un esempio di criptazione e decriptazione

Un'alternativa molto interessante sono i Cookie Http Only.
Questo tipo di Cookie sono salvati nel backend e ritornati al browser.
Il browser salva i dati però non li rende accessibili in nessuno dei suoi 
storage : local Storage, Session Storage e IndexedDB

Ogni qualvolta il browser esegue una richiesta al backend nella richiesta 
inserisce automaticamente i valori salvati nel Cookie Http Only

Un esempio di implementazione è il seguente:

Se usi Cookie HttpOnly, il token viene gestito automaticamente dal browser e non devi salvarlo manualmente nel frontend! 🚀

🔹 Come funzionano le chiamate successive con Cookie HttpOnly?
Il backend imposta un cookie HttpOnly con il token JWT o session ID dopo il login.
Il browser lo invia automaticamente in ogni richiesta HTTP al server.
Il frontend non deve salvarlo in localStorage, sessionStorage o altrove.
✅ Esempio di autenticazione con Cookie HttpOnly
🔹 1️⃣ Login: Il backend invia il cookie al client
Quando l'utente fa il login, il backend crea un JWT e lo invia come Cookie HttpOnly:

📌 Backend (Node.js + Express)

ts
Copy
Edit
app.post("/login", (req, res) => {
  const token = generateJWT(req.user);
  
  res.cookie("authToken", token, {
    httpOnly: true,    // 🔒 Blocca JavaScript dal leggerlo
    secure: true,      // 🔒 Solo HTTPS
    sameSite: "Strict", // 🔒 Protezione CSRF
    maxAge: 24 * 60 * 60 * 1000, // 1 giorno
  });

  res.json({ success: true, message: "Login riuscito" });
});
👉 Il token non è accessibile dal frontend, ma viene salvato nei cookie del browser.

🔹 2️⃣ Effettuare richieste protette
Dopo il login, il frontend non deve preoccuparsi del token!
Basta inviare richieste API con credentials: "include" e il browser invia automaticamente il cookie:

📌 Frontend (Vue 3 - Fetch API)

ts
Copy
Edit
fetch("https://api.miosito.com/profilo", {
  method: "GET",
  credentials: "include" // 🔥 Importante! Invia il cookie automaticamente
})
  .then(response => response.json())
  .then(data => console.log("Profilo utente:", data));
✅ Niente gestione manuale del token!
✅ Più sicuro perché il token non è esposto a JavaScript!

🔹 3️⃣ Verificare l'autenticazione nel backend
Ogni volta che il frontend chiama un'API protetta, il backend può verificare il token dal cookie:

📌 Backend (Express + Middleware per autenticazione)

ts
Copy
Edit
import jwt from "jsonwebtoken";

app.get("/profilo", (req, res) => {
  const token = req.cookies.authToken; // 🔥 Legge il token dal cookie
  
  if (!token) {
    return res.status(401).json({ message: "Non autenticato" });
  }

  try {
    const user = jwt.verify(token, "SECRET_KEY");
    res.json({ user });
  } catch (err) {
    res.status(403).json({ message: "Token non valido" });
  }
});
👉 Se il token è valido, il backend restituisce i dati dell'utente.
👉 Se il token è scaduto o errato, restituisce un errore 401 Unauthorized.

🔥 Conclusione
🔹 Con i Cookie HttpOnly, il token viene gestito automaticamente e non devi salvarlo da nessuna parte nel frontend!
🔹 Il browser lo invia in ogni richiesta HTTP senza bisogno di localStorage, sessionStorage o variabili globali.
🔹 Più sicurezza contro XSS e furto di token rispetto a salvarlo manualmente nel client.

🚀 Se stai usando un'API REST senza sessioni, potresti dover usare sessionStorage/localStorage, ma per sicurezza il metodo HttpOnly è il migliore!

Il processo corretto per eseguire la chiamata di autenticazione dell'utente è:

Quando l'utente effettua il login, invii le sue credenziali (login e password) al server, che autentica l'utente e risponde con due token:

Access Token (JWT): Questo token ha una durata breve (ad esempio 15 minuti) 
e viene utilizzato per autenticare le chiamate API.
Refresh Token: Questo token ha una durata più lunga (ad esempio, 7 giorni) 
e viene utilizzato per ottenere un nuovo Access Token quando quello corrente scade.
Questi due token vengono inviati al client come cookie HttpOnly per proteggere i dati da attacchi XSS.


- Per proteggere i dati sensibili come login e password durante il processo di autenticazione, è fondamentale utilizzare HTTPS (HyperText Transfer Protocol Secure) e applicare altre tecniche per proteggere le informazioni durante la trasmissione. Ecco i passi principali per assicurarti che la chiamata sia sicura:

🛡️ 1. Usa HTTPS per tutte le comunicazioni
La prima cosa che devi fare per proteggere i dati (inclusi il login e la password) durante la trasmissione è forzare l'uso di HTTPS (che significa SSL/TLS). HTTPS crittografa tutti i dati inviati tra il client (browser) e il server, impedendo che informazioni sensibili come la password siano intercettate da attacchi man-in-the-middle (MITM).

📌 Come fare:

Assicurati che il tuo server sia configurato per supportare HTTPS. Puoi ottenere un certificato SSL gratuito tramite Let's Encrypt oppure acquistare un certificato da un'autorità certificante.
Imposta il tuo server in modo che redirezioni automaticamente tutte le richieste HTTP a HTTPS.

2. Cripta i dati sensibili prima di inviarli (opzionale, ma consigliato)
Anche se HTTPS crittografa tutto il traffico, una misura aggiuntiva di sicurezza è crittografare i dati sensibili (come la password) nel frontend prima di inviarli al server. Questo impedisce a chiunque possa intercettare il traffico (nel caso in cui ci sia una vulnerabilità in HTTPS) di leggere le credenziali.

La libreria CryptoJS (o altre simili) può essere utilizzata per crittografare la password prima di inviarla al server. In pratica, la password viene trasformata in una versione crittografata che solo il server può decrittografare.























