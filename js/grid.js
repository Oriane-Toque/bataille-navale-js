// Un "module" est un tableau associatif
// => donc chaque élément associe une clé à une valeur
// => et cette valeur peut être de tous les types d'une variable JS
// => c'est à dire : Number, String, Array, Object ou ... FONCTION !!
// Comme ces variables/fonctions sont attachées au module dans lequel elles sont
//     => grid.cells;
//     => grid.display();
const grid = 
{

  // La grille
  cells: [
    ['', 'b', 'b', 'b', '', '', '', ''],
    ['', '', '', '', '', '', '', ''],
    ['', '', '', '', '', 'b', '', ''],
    ['', '', '', '', '', 'b', '', ''],
    ['', '', '', '', '', 'b', '', ''],
    ['', '', '', '', '', 'b', '', ''],
    ['b', 'b', 'b', 'b', 'b', '', '', ''],
    ['', '', '', '', '', '', '', '']
  ],

  // Les entêtes (lignes et colonnes)
  headers: {
    rows: [1, 2, 3, 4, 5, 6, 7, 8],
    columns: ['A', 'B', 'C', 'D', 'E', 'F', 'G', 'H']
  },

  // Par convention, on va toujours créer une fonction init dans nos modules
  init: function() 
  {

  },

  display: function() 
  {
    // On commence par afficher les 8 colonnes, plus 2 espaces au début
    // console.log('  A B C D E F G H'); // pas top si demain on a + ou - de 8 colonnes...
    // alors on va se fier au tableau grid.headers
    console.log('  ' + grid.headers.columns.join(' '));
    // Euh... quoi ?
    // => "join" permet de mettre côte à côte toutes les valeurs du tableau
    // le paramètre est le séparateur qui sera ajouté entre chaque valeur
    // document.querySelector('#grid').innerHTML = '&nbsp;&nbsp;' + grid.headers.columns.join(' ') + '<br>';

    // Boucle comme en PHP => for car on sait qu'on va de 0 à 8
    for( let rowIndex = 0; rowIndex < 8; rowIndex++ ) 
    {
      // On veut afficher ----bbb-- pour chaque ligne
      // on doit parcourir les colonnes

      // On commence la ligne par le chiffre correspondant
      let stringLine = grid.headers.rows[rowIndex]; // izi
      // On ajoute un espace
      stringLine += ' ';

      // ok, c'est pour les lignes, et pour les 8 colonnes ?
      // encore une boucle
      for( let columnIndex = 0; columnIndex < 8; columnIndex++ ) 
      {
        // On veut afficher
        // On récupère le caractère
        const currentChar = grid.cells[rowIndex][columnIndex];
        // si vide => -
        if( currentChar === '' ) 
        {
          stringLine += '~';
        } 
        else 
        {
          stringLine += currentChar;
          
          // On ajoute le caractère dans la cell dans le code HTML
          let currentCell = document.querySelector('#cell' + rowIndex + columnIndex);

          // Exo S03E05 - Etape 1 : Masquer les bateaux
          // Il suffit de ne pas afficher de caractère dans la case
          // correspondant à un bateau
          // currentCell.textContent = currentChar;

          // On ajoute la classe sur la cellule
          if( currentChar === 't' ) 
          {
            currentCell.classList.add('hit');
          } 
          else if( currentChar === 'p' ) 
          {
            currentCell.classList.add('splash');
          }
        }
        // On aère un peu l'affichage de la grille
        stringLine += ' ';
        // sinon si vaisseau/bateau => b
        // rien à faire
        // sinon si touché => t
        // rien à faire
        // sinon si plouf => p
        // rien à faire
      }

      // On affiche la ligne avant de passer à la suivante
      console.info(stringLine);
      // On affiche aussi dans la page HTML
      // document.querySelector('#grid').innerHTML += stringLine + '<br>';
    }
  },

  getIndexes: function(cell) 
  {
    // Et alors, on décode les données de rowIndex (B5)
    const letter = cell.substring(0, 1); // "B"
    let rowIndex = cell.substring(1, 2); // "5"

    // Console.log pour debuger
    console.log(letter);
    console.log(rowIndex);
    // On a bien réussi à décomposer la lettre (ligne) et la colonne

    // Attention, le tableau commence à l'index 0 pour '1', donc on doit soustraire 1
    // Mais quel est le type de rowIndex ? => string
    // On commence par convertir en int
    rowIndex = parseInt(rowIndex);
    // Puis on soustrait 1
    rowIndex = rowIndex - 1;
    // rowIndex -= 1;
    // rowIndex--;

    // On peut se baser sur le tableau grid.headers pour récupérer l'index de la lettre demandée
    // Pour cela :
    // 1 - on initialise la variable contenant l'index de la colonne
    let columnIndex;
    // 2 - on parcourt le tableau
    for( const currentIndex in grid.headers.columns ) 
    {
      // On récupère la lettre courante du tableau
      const currentLetter = grid.headers.columns[currentIndex];
      // 3 - si la lettre est la lettre courante du tableau
      if( currentLetter === letter )
      {
        // on récupère l'index
        columnIndex = currentIndex;
      }
    }

    return [rowIndex, columnIndex];
  },

  addCellNames: function() 
  {
    // On récupère toutes les lignes d'abord
    const rowElements = document.querySelectorAll('.row');

    // On parcourt toutes les lignes
    for( let rowIndex = 0; rowIndex < rowElements.length; rowIndex++ ) 
    {
      // On récupère l'élément "row" courant
      const rowElement = rowElements[rowIndex];

      // On récupère toutes les cellules de la ligne
      // mais attention, pas les balises <header> !
      const cellElements = rowElement.querySelectorAll('div.cell');

      // On parcourt tous les éléments trouvés
      for( let columnIndex = 0; columnIndex < cellElements.length; columnIndex++ ) 
      {
        // console.log('' + rowIndex + columnIndex);
        // On fait l'inverse de
        // let columnIndex = letterIndex.codePointAt(0) - 65;
        let letter = String.fromCodePoint(columnIndex + 65); // ouai, c'est chaud là

        // On récupère la cellule courante
        let cellElement = cellElements[columnIndex];

        // console.log(' => ' + letter + rowIndex);

        // On peut désormais ajouter le dataset sur la cellule
        cellElement.dataset.cellName = letter + rowIndex;
      }
    }
  },

  // Fonction permettant de vérifier si la case demandée par l'utilisateur est correcte/existe
  checkCellName: function(cellName) 
  {
    // Astuce, on peut chercher dans le DOM la cellule avec le dataset correspondant
    // en CSS, https://developer.mozilla.org/fr/docs/Web/CSS/S%C3%A9lecteurs_d_attribut
    const cellElement = document.querySelector('.cell[data-cell-name="' + cellName + '"]');

    // On analyse pour connaitre la valeur si trouvé/pas trouvé
    console.log(cellElement);

    // si on trouve un élément => correcte
    if( cellElement !== null ) 
    {
      return true;
    } 
    else 
    {
      // sinon, incorrect
      return false;
    }
  },

  create: function() 
  {
    // On utilise createElement & appendChild pour générer la grille
    // PLAN
    // 1 - récupérer l'élément <div id="grid">
    // 2 - créer la première ligne d'entete
    //     * une ligne <section class="row">
    //     * 1 colonne vide pour la colonne des numéros de ligne
    //     * tester
    //     * 8 colonnes <header class="cell">Lettre</header>
    // 3 - ajouter cette ligne d'entête à la grille
    // 4 - tester
    // 5 - pour chaque ligne
    //     * une ligne <section class="row">
    //     * 1 colonne avec le numéro de ligne
    //     * 8 colonnes <div class="cell" id="cell00">b/t/p/~</div>
    // 6 - ajouter cette ligne à la grille

    /* Chaque ligne devra ressemblait à ceci
    <section class="row">
        <header class="cell">8</header>
        <div class="cell" id="cell70"></div>
        <div class="cell" id="cell71"></div>
        <div class="cell" id="cell72"></div>
        <div class="cell" id="cell73"></div>
        <div class="cell" id="cell74"></div>
        <div class="cell" id="cell75"></div>
        <div class="cell" id="cell76"></div>
        <div class="cell" id="cell77"></div>
    </section> */

    // 1 - récupérer l'élément <div id="grid">
    const gridElement = document.querySelector('#grid');

    // 2 - créer la première ligne d'entete
    const headerRow = document.createElement('section'); // <section>
    headerRow.classList.add('row'); // <section class="row">

    const firstColumn = document.createElement('header'); // <header>
    firstColumn.classList.add('cell'); // <header class="cell">

    // On ajoute dans la ligne
    headerRow.appendChild(firstColumn);
    // tester
    // console.log(headerRow);

    // Les 8 colonnes
    for( let i = 0; i < 8; i++ ) 
    {
      const currentColumn = document.createElement('header'); // <header>
      currentColumn.classList.add('cell'); // <header class="cell">
      currentColumn.textContent = grid.headers.columns[i]; // <header class="cell">Lettre</header>
      // On ajoute dans la ligne
      headerRow.appendChild(currentColumn);
    }

    // 3 - ajouter cette ligne d'entête à la grille
    gridElement.appendChild(headerRow);

    // 5 - pour chaque ligne
    for( let rowIndex = 0; rowIndex < 8; rowIndex++ ) 
    {
      // créer une balise <section class="row">
      const currentRow = document.createElement('section'); // <section>
      currentRow.classList.add('row'); // <section class="row">

      // Créer 1 colonne avec le numéro de ligne
      const currentFirstColumn = document.createElement('header'); // <header>
      currentFirstColumn.classList.add('cell'); // <header class="cell">
      currentFirstColumn.textContent = grid.headers.rows[rowIndex]; // <header class="cell">2</header>
      
      // On ajoute dans la ligne
      currentRow.appendChild(currentFirstColumn);

      // Créer 8 colonnes <div class="cell" id="cell00"></div>
      for (let columnIndex = 0; columnIndex < 8; columnIndex++) {
        const currentColumn = document.createElement('div'); // <div>
        currentColumn.classList.add('cell'); // <div class="cell">
        currentColumn.id = 'cell' + rowIndex + columnIndex; // <div class="cell" id="cell00"></div>

        // On ajoute dans la ligne
        currentRow.appendChild(currentColumn);
      }

      // 6 - ajouter cette ligne à la grille
      gridElement.appendChild(currentRow);
    }

    // On ajoute les data-cell-name une fois la grille créé
    grid.addCellNames();
  }
};
