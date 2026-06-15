#language: fr

Fonctionnalité: Sélectionner et désélectionner tous les cours

  Scénario: sélectionner tous les cours

    Soit un parcours d'étudiant encore vide
    Quand je sélectionne tous les cours
    Alors "GL02" doit apparaître dans 3 blocs de compétence
    Et "LO12" doit apparaître dans 1 blocs de compétence
    Et "LO10" doit apparaître dans 2 blocs de compétence
    Et "IF05" doit apparaître dans 3 blocs de compétence
    Et "IF10" doit apparaître dans 1 blocs de compétence


  Scénario: désélectionner tous les cours

    Soit un parcours d'étudiant contenant "GL02"
    Quand je désélectionne tous les cours
    Alors "GL02" doit apparaître dans 0 blocs de compétence

