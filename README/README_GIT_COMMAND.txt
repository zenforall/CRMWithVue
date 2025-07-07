-- Inizializzare il repository locale git
git init

Questo comando è obbligatorio eseguirlo prima di scaricare il progetto; il comando
inizializza la directory che dovrà contenere i sorgenti del progetto : inizializza
il repository

-- Come eseguire il checkout del sorgente di un progetto

// Permette di eseguire il checkout del sorgente dal branch master di un progetto
git pull git@github.com:zenforall/CRMWithVue.git

// Permette di eseguire il checkout del sorgente di un particoalre branch
git pull git@github.com:zenforall/CRMWithVue.git master:test_branch

-- Come eseguire il commit

git add *
git commit -m "[Comment]"
git push --> Finalizza il commit 

Se invece voglio finalizzare il commit su un branch specifico e remoto uso il 
seguente comando:

git push -f git@github.com:zenforall/CRMWithVue.git master:test_branch

-- Gestione dei branch
E' buona norma creare un nuovo branch quando ci si appresta a sviluppare una funzionalità 

// Permette di avere la lista dei branch disponibili: master è il branch principale
git branch 

// Permette di creare un nuovo branch
git branch test_branch

// Permette di puntare al nuovo branch per eseguire i commit dei sorgenti modificati
git checkout test_branch

// Permette di eliminare un branch se è completamente "mergiato"
git branch -d [branch_name]

// Permette di eliminare un branch in maniera forzata sebbene non sia totalmente "mergiato"
git branch -D [branch_name]

// Permette di eseguire il merge del branch [branch_name] nel branch master
git merge master [branch_name]