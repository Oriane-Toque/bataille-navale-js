// On enregistre une grille :
// dans un array qui représente la grille, on enregistre 8 lignes
// chaque ligne contient 8 emplacements
let grid = [
    ['b', '', '', '', '', '', '', ''],
    ['b', '', '', '', 'b', 'b', 'b', ''],
    ['', '', '', '', '', '', '', ''],
    ['', 'b', '', '', '', '', '', ''],
    ['', 'b', '', 'b', 'b', 'b', 'b', 'b'],
    ['', 'b', '', '', '', '', '', ''],
    ['', '', '', '', '', '', '', ''],
    ['', '', '', '', 'b', 'b', '', '']
];

// afficher la grille de jeu
function displayGrid() {
    // on affiche l'entête des colonnes 
    console.log('  A B C D E F G H');
    // pour chaque ligne de la grille
    for (let rowIndex = 0; rowIndex < 8; rowIndex++) {
        // avant d'afficher le CONTENU de la ligne
        // on affiche son numéro
        // @TODO

        // afficher la ligne => utiliser displayLine()
        displayLine(grid[rowIndex]);
    }
}

// displayLine() va servir à afficher la ligne fournie en paramètre dans la console
// on veut afficher chaque ligne avec une largeur identique
// on va donc remplacer chaque emplacement vide par une ~ (=> seulement pour l'affichage, on ne modifie pas la ligne elle-même)
function displayLine(row) {
    // on déclare une string à afficher
    let lineToDisplay = "";
    // obtenir une string (notre ligne) dans laquelle les chaînes vides sont remplacées par des ~

    // pour chaque caractère dans la ligne
    for (let columnIndex = 0; columnIndex < 8; columnIndex++) {   
        // si le caractère est une chaîne vide
        // on ajoute un ~ à la ligne à afficher
        // si le caractère trouvé à l'index de grid qui correspond au tour de boucle courant est une chaîne vide
        if (row[columnIndex] === '') {
            // on ajoute ~ à la string à afficher
            lineToDisplay += '~ ';
        } else {
            // dans tous les autres cas, on ajoute le caractère lui même (si cette emplacement de la grille vaut b ou p ou t)
            lineToDisplay += row[columnIndex] + ' ';
        }
    }

    // finalité : 
    // afficher la ligne dans la console.
    console.log(lineToDisplay);
}

// Cette fonction détermine si on touche un bateau à l'index columnIndex lorsqu'on lance un missile
function sendMissileAt(rowIndex, columnIndex)
{
    // est-ce que l'index columnIndex 
    // du tableau contenu à l'index rowIndex
    // de grid contient un b ?
    if (grid[rowIndex][columnIndex] === 'b') {
        console.log("Touché !");
        // on a touché un b => on doit le transformer en t
        // on utilise les mêmes index de grid mais on utilise = pour affecter (changer) la valeur
        grid[rowIndex][columnIndex] = 't';
        return true;
    } else {
        // sinon
        console.log("Dans l'eau !");
        // on modifie la case touchée pour faire apparaître le "plouf"
        grid[rowIndex][columnIndex] = 'p';
        return false;
    }
}