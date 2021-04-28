# La bataille navale

On va commencer par le début. Parce qu'on a essayé de commencer une fois par la fin, et, au final, ce fut le début de la fin :disappointed:

Et ce début, c'est le "plateau de jeu" avec les bateaux.  

On a vu qu'on allait stocker ces informations sous forme de tableau à 2 dimensions :

- La première dimension permet de stocker toutes les lignes
- La seconde dimension, dans chaque ligne, permet de stocker toutes les colonnes
- La valeur de chaque colonne va déterminer le contenu la cellule/case :
  - s'il y a un bateau : `'b'`
  - s'il n'y a rien : `''`
  - si un missile est tombé dans l'eau : `'p'` (plouf :grimacing:)
  - si un missile a touché un bateau : `'t'`

Ensuite, on va s'occuper d'afficher cette grille et d'envoyer des missiles :smiling_imp:

<details><summary>Et ensuite, nous allons pouvoir...</summary>

![conquérir le monde !](https://media.giphy.com/media/13tCsW5QkpRMXe/giphy.gif)

</details>

## Etapes

Afin de rendre cette grosse grille plus digeste, on va commencer par traiter le cas d'une grille très simple : une seule ligne.

### #1 Mettre en place le fichier JS

- Créer un répertoire `js` à la racine du dépôt
- Y ajouter un fichier `app.js`
- Lier le fichier `app.js` à notre page `index.html`
- Vérifier dans le navigateur le bon chargement du fichier `app.js`

### #2 Créer la première ligne :wavy_dash:

- Créer un tableau `grid` contenant 8 entrées vides. Chaque entrée représente une colonne sur une case.
- Ajouter un bateau en ajoutant 2 ou 3 `b` dans certaines entrées vides.

### #3 Afficher notre "grille" :page_facing_up:

- Créer une fonction `displayLine` qui permet d'afficher notre "grille" dans la console. On lui passe notre "grille" en argument
- On va utiliser `console.log()` pour ça. 
- Pour bien voir les entrées vides, on va les remplacer par des `~` (ça fait des vagues !).
- Cool ! (ou coule, au choix :smirk:), on peut maintenant passer à l'envoi des missiles !

<details><summary>résultat attendu</summary>

![une ligne](https://user-images.githubusercontent.com/43950280/106279639-05840f80-623d-11eb-87bd-39400a7b4e16.png)

</details>

### #4 Envoyer un missile :rocket:

- Créer une fonction `sendMissileAt`. Elle va recevoir en argument l'index de la colonne sur laquelle on tire.
- La fonction retournera `true` ou `false` selon qu'on ait touché un bateau ou pas.
- On en profite pour afficher un petit message dans la console si ça touche ou non !

### #5 Passer à une vraie grille

Une ligne c'est bien, mais on est vite limité. Si on passait à une véritable grille ?

D'ailleurs qu'est-ce qu'une grille ? Ce ne serait pas plusieurs fois la ligne qu'on vient de faire ?

Si on résume, on a : 
- Une ligne qui est un tableau de cases (les colonnes)
- Plusieurs lignes forment une grille
- Pour stocker ces lignes on pourrait avoir un tableau
- On aura donc un tableau (de plusieurs lignes) contenant des tableaux (le contenu de chaque ligne) :exploding_head:

On va donc modifier notre grille actuelle pour en faire un tableau à deux dimensions (un tableau contenant des tableaux) !

- Modifier la variable `grid` pour qu'elle soit maintenant un tableau contenant 8 tableaux de 8 entrées.
- Ajouter quelques bateaux !

### #6 Afficher la vraie grille

- On va cette fois afficher la grille complète dans la console. 
- Commencer par créer une nouvelle fonction `displayGrid`.
- Afficher les entêtes de colonnes dans la console. 
- On boucle ensuite sur toutes les lignes et on les affiche une par une.
- On a déjà une fonction qui permet d'afficher une ligne (`displayLine`) ! On peut l'appeler sur chacune des lignes de notre grille.

<details><summary>résultat attendu</summary>

![](https://user-images.githubusercontent.com/35060565/91989122-69f37f00-ed30-11ea-9ae4-29c60600fcc3.png)

</details>

### #7 Réparer le canon à missiles :rocket:

Notre fonction `sendMissileAt` n'attendait qu'un seul argument : l'index des colonnes. Elle ne fonctionne donc plus avec notre véritable grille. 
Il faut donc la modifier pour pouvoir lui passer l'index de la ligne et l'index de la colonne de la cellule qu'on vise !

- Ajouter un paramètre à `sendMissileAt` pour lui passer l'index de la ligne. Par exemple : `sendMissileAt(indexRow, indexColumn)`.
- Modifier la fonction en conséquence.
- Tout remarche !


### #8 Et les tirs réussis/manqués alors ? :boom:

- Et oui, on n'a pas gardé l'information après chaque tir de missile !
- On va modifier la fonction `sendMissileAt` pour mettre à jour la grille après un tir !

<details><summary>c'est génial</summary>

![](https://media.giphy.com/media/hfYnqeqVeO4pO/giphy.gif)

</details>

### #9 Améliorer notre code

Pour l'instant, on écrit nos en-têtes de colonne directement lors de l'affichage et on calcule l'en-tête de ligne pour l'afficher dans `displayGrid`. On pourrait stocker ces en-têtes dans un tableau afin d'avoir une source de données unique. 

- Créer un tableau associatif `gridHeaders` pour stocker les en-têtes.
- Modifier `displayGrid` afin de se baser sur `gridHeaders`.

## Et enfin

<details>

![](https://media.giphy.com/media/l4JySAWfMaY7w88sU/giphy.gif)

![](https://media.giphy.com/media/YGJBp5EgyVP9K/giphy.gif)

</details>

