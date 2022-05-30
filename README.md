# TDB_AE_V2

Git pour le projet AppliWeb : Réalisation d'un TDB pour l'Association des Elèves

Fait par Adrien, Antoine et Léane !

## IMPORTANT !

Organisation du git
Le git est organisé de façon suivante :

.
├── src
│   ├── entities
│   ├── servlets
│   └── META-INF
└── WebContent
    ├── login
    ├── style
    ├── tdb
    ├── META-INF
    └── WEB-INF
    

src
  |-- entities
  |-- servlets
  |-- META-INF
WebContent
  |-- login
  |-- style
  |-- tdb
  |-- META-INF
  |-- WEB-INF
  
ET c'EST TOUT ! Pas de dossier 'build', pas de .classpath, . .project, .setting, etc.

## IMPORTER LES MAJ DE GIT DANS ECLIPSE AU FUR ET A MESURE

La solution qui cause le moins de soucis est de :

1. Créer un nouveau projet Dynamic Web Project en suivant ces instructions
  1.1. L'appeler par exemple "TDB_AE_V2", "TDB_AE_V21", "TDB_AE_V22" etc.
  1.2. Les options a choisir : Target runtime = <None> ; Dynamic web module version = 4.0
  1.3. Faire 1 fois "NEXT" et s'assurer que le dossier soit bien 'src'
  1.4. Faire une 2ème fois "NEXT" et s'assurer que le ContentDirectory soit bien "WebContent"
  

2. Une fois le projet créer, il suffit de supprimer le dossier "WebContent" et de le remplacer par celui provenant de git
3. Il faut ensuite copier le **contenu** du dossier src provenant du git et le coller dans celui de Eclipse
4. Importer les bibliothèques, tous les .jar nécessaire sont sur le git, plus facile pour les importer toute d'un coup de souris
  
  
> **Pour l'importation du Filter**
> Il faut importer la bibliothèque servlet la plus récente, elle est dans le dossier *library* du git.
