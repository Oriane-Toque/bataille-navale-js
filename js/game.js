// Un "module" est un tableau associatif
// => donc chaque élément associe une clé à une valeur
// => et cette valeur peut être de tous les types d'une variable JS
// => c'est à dire : Number, String, Array, Object ou ... FONCTION !!
// Comme ces variables/fonctions sont attachées au module dans lequel elles sont
//     => game.turn;
//     => game.newTurn();
const game = 
{
  // On définit les variables qui seront liées au module
  turn: 1,

  // On définit une fonction d'initialisation, init() par convention
  init: function()   
  {
    // Dans cette fonction, on s'assure que nos variables ont bien leur valeur initiale
    game.turn = 0;

    // On initialise le tableau de la grille (en passant par le module grid)
    grid.cells = [
      ['b', '', 'b', 'b', 'b', '', '', ''],
      ['b', '', '', '', '', '', '', ''],
      ['b', '', '', '', '', 'b', '', ''],
      ['', '', '', '', '', 'b', '', ''],
      ['', '', '', '', '', 'b', '', ''],
      ['', '', '', '', '', 'b', '', ''],
      ['b', 'b', 'b', 'b', '', '', '', ''],
      ['', '', '', '', '', '', '', '']
    ];

    // On génère le code HTML de la grille
    grid.create();

    // Enfin, on affiche la grille
    grid.display();

    // Je sélectionne toutes mes cases grace au DOM
    const cells = document.querySelectorAll( "div.cell" );
    // console.log( cells );

    // On parcours ce pseudo tableau (NodeList) 
    // avec une boucle for "simple"
    // car on a des trucs bizarres sinon
    for( let index = 0; index < cells.length ; index++ )
    {
      // Maintenant que j'ai une case, j'ajoute un écouteur dessus
      // Et ainsi de suite pour chaque itération de la boucle
      // et donc, pour chaque case de ma grille
      cells[index].addEventListener( "click", game.handleClickOnCell );
    }
  },

  handleClickOnCell : function( evt )
  {
    // Je récupère la case cliquée, grace aux infos de evt
    const clickedCell = evt.currentTarget;

    // J'accède au nom de la case grace à dataset
    const clickedCellName = clickedCell.dataset.cellName;

    // On a le nom de la cellule, y a plus qu'à envoyer le missile
    game.sendMissile( clickedCellName );
  },
  
  newTurn: function() 
  {
    // On ajoute 1 au compteur
    game.turn++;

    // On récupère le span du tour dans le DOM
    // const turnSpan = document.querySelector('h3');
    // On change son contenu text
    // turnSpan.textContent = turn;
    // Et on peut même le faire en une seule instruction (avec du chaînage)
    document.querySelector('h3').textContent = 'Tour ' + game.turn;

    // Après avoir incrémenté le nombre de tour passés
    // Je vais vérifier s'il reste des bateaux a couler
    game.checkGameOver();
  },

  // Créer une fonction sendMissileAt(rowIndex, columnIndex) qui retourne vrai ou faux si on a touché un vaisseau ou pas
  sendMissileAt: function(rowIndex, columnIndex) 
  {
    const targetCell = grid.cells[rowIndex][columnIndex]; // => pas de pb de portée de variable ici

    // On va stocker les coordonées "lisibles" sous forme de chaine pour plus tard
    const coords = grid.headers.rows[rowIndex] + "" + grid.headers.columns[columnIndex];

    // on prépare notre retour
    let retBattleHit = false;
    if( targetCell === 'b' )  // on recommande fortement les ===
    {
      // réponse de l'action dans la console
      console.log('touché');

      // Pour afficher les bons caractères, on oublie pas de changer la valeur de la cellule
      grid.cells[rowIndex][columnIndex] = 't';

      // retour à VRAI (seul cas)
      retBattleHit = true;

      stats.addAction( coords, "Touché !" );
    } 
    else if( targetCell === 't' ) 
    { 
      // Si on a déjà touché un bateau ici
      console.log('bateau déjà touché à cette case :/');
      stats.addAction( coords, "Bateau déjà touché !" );
    } 
    else if( targetCell === 'p' ) 
    { 
      // Si on a déjà tiré dans l'eau ici
      console.log('Missile déja envoyé sur cette case, sans toucher de bateau');
      stats.addAction( coords, "Missile déjà raté !" );
    } 
    else 
    {
      // réponse de l'action dans la console
      console.log('plouf');

      // Pour afficher les bons caractères, on oublie pas de changer la valeur de la cellule
      grid.cells[rowIndex][columnIndex] = 'p';

      stats.addAction( coords, "Raté !" );
    }

    // Afficher automatiquement la grille après chaque tir de missile
    grid.display();

    // Après chaque tir réussi, on affiche la liste des cases touchées
    if( targetCell === 'b' ) 
    {
      stats.displayHits();
    }

    // A chaque tir de missile (bateau ou plouf)
    if( targetCell === 'b' || targetCell === '' ) 
    {
      // on ajoute 1 au compteur de tour et on l'affiche
      game.newTurn();
    }

    // On oublie pas de retourner vrai/faux
    return retBattleHit;
  },

  // Créer une fonction sendMissile(cellName) qui retourne vrai ou faux si on a touché un vaisseau ou pas
  // mais à partir du nom de la cellule/case
  sendMissile: function(cellName) 
  {
    // On utilise désormais getGridIndexes()
    // const result = getGridIndexes(cellName);
    // const rowIndex = result[0];
    // const columnIndex = result[1];
    // ou alors, on déstructure !
    const [rowIndex, columnIndex] = grid.getIndexes(cellName); // "oué c cho"

    // On peut appeler la fonction sendMissileAt
    return game.sendMissileAt(rowIndex, columnIndex);
  },
  
  checkGameOver: function() 
  {
    let remainingBoatCell = 0;

    for( const row of grid.cells ) 
    {
      for( const cell of row )
      {
        if( cell === 'b' ) 
        {
          remainingBoatCell++;
        }
      }
    }

    if( remainingBoatCell === 0 ) 
    {
      alert('Game Over !');
      return true;
    } 
    else 
    {
      return false;
    }
  }
};