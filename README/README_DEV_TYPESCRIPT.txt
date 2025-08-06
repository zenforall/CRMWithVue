Utilizzo della private key "export"

export interface User {

}

Se non si specifica la chiave private "export" l'interface è visibile a livello globale del progetto.

Questa pratica è sconsigliata perchè all'interno del codice dove è utilizzata l'interface User non è presente l'import specifico e quindi 
non si capisce da dove è importato il file User.
Inoltre è possibile gestire interface che hanno lo stesso nome ma che stanno in directory diverse, utilizzando la private key "export".



