#language: fr

Fonctionnalité: Ajouter un cours à son parcours

  Scénario: aucun cours sélectionné au préalable

    Soit je consulte la liste des cours disponibles de "base" session "automne" en cliquant sur "Base (Automne)"
    Et que aucun cours n'est sélectionné dans mon parcours
    Quand j'ajoute le cours "GL02" de niveau "base" session "automne" à mon parcours
    Alors "GL02" doit apparaître dans 3 blocs de compétence

  Scénario: un cours sélectionné au préalable
    
    Soit je consulte la liste des cours disponibles de "base" session "automne" en cliquant sur "Base (Automne)"
    Et que le cours "GL02" est déjà sélectionné dans mon parcours
    Quand j'ajoute le cours "NF16" de niveau "base" session "automne" à mon parcours
    Alors "NF16" doit apparaître dans 2 blocs de compétence
    Et "GL02" doit apparaître dans 3 blocs de compétence

