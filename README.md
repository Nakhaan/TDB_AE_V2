# TDB_AE_V2

Git pour le projet AppliWeb : Réalisation d'un TDB pour l'Association des Elèves

Fait par Adrien, Antoine et Léane !

## IMPORTANT !

Organisation du git
Le git est organisé de façon suivante :

## IMPORTER LES MAJ DE GIT DANS ECLIPSE AU FUR ET A MESURE

La solution qui cause le moins de soucis est de :

1. Créer un nouveau projet Dynamic Web Project en suivant ces instructions
  1.1. L'appeler par exemple "TDB_AE_V2", "TDB_AE_V21", "TDB_AE_V22" ... (ne pas mettre de point du style "TDB_AE_V2.1" on sait jamais si ca nique tout)
  1.2. Les options a choisir : Target runtime = <None> ; Dynamic web module version = 4.0
  1.3. Faire 2 foix "NEXT" et arriver sur la page "Web Module". Il faut que le "Content directory" soit égale à "src/main/webapp" (inutile de générer le web.xml de toute façon on va tout copier
2. Une fois le projet créer, il suffit simplement de cliquer sur le dossier 'src' (et non pas 'src/main/java') puis le supprimer.
3. Il faut ensuite coller le dossier src en cliquant sur 'TDB_AE_V21' puis un simple CTRL-V suffit.
4. Notez qu'il faudra à chaque fois réimporter dans le buildpath toute les bibliothèques.
  4.1 Le plus rapide est de centraliser dans un même dossier ('library' sur le git) toute les bibliothèque puis de les selectionner tous d'un coup (au lieu de se faire chier à aller les chercher dans les javax/etc
  
  
> **Pour l'importation du Filter**
> Il faut importer la bibliothèque servlet la plus récente, elle est dans le dossier *library* du git.
