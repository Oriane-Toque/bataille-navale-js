// Un "module" est un tableau associatif
// => donc chaque élément associe une clé à une valeur
// => et cette valeur peut être de tous les types d'une variable JS
// => c'est à dire : Number, String, Array, Object ou ... FONCTION !!
// Comme ces variables/fonctions sont attachées au module dans lequel elles sont
//     => stats.displayHits();
const stats = 
{
  displayHits: function() 
  {
    // On sélectionne toutes les cellules ayant la classe "hit"
    // Attention, querySelector retourne 1 seul résultat
    // querySelectorAll retourne tous les résultats
    const hitElements = document.querySelectorAll('.hit');
    // console.log(hitElements);

    // On initialise le tableau des cases touchées
    let hits = [];
    // On parcourt tous les éléments trouvés
    for( const currentElement of hitElements ) 
    {
      // .push permet d'ajouter un élément dans un Array en JS
      // .id permet d'accéder à la propriété "id" sur l'élément currentElement
      // hits.push(currentElement.id);
      hits.push(currentElement.dataset.cellName);
    }
    // console.log(hits);

    // .join permet de concaténer chaque valeur du tableau,
    // avec ', ' comme séparateur entre chaque valeur
    console.log('Les cases touchées sont ' + hits.join(', '));
  },

  addAction: function( coord, result ) 
  {
    // Récupération de la div d'historique
    let actionsList = document.querySelector( "#actions" ); 

    // Création de l'élément div
    let action = document.createElement("div");

    // Modification du texte à l'intérieur
    // On peut même préfixer notre phrase par le numéro du tour 
    action.textContent = "Tour " + game.turn + " - Tir en " + coord + " : " + result;

    // On modifie un peu le style (on aurait pu faire tout ça en CSS, ca aurait été plus propre)
    action.style.textAlign = "left";
    action.style.backgroundColor = "#222222";
    action.style.padding = "5px";

    // Ajout de l'élément créé à la liste actionsList
    // Ici on veut ajouter l'élément AU DEBUT de notre liste
    actionsList.prepend( action );
  },

  displayStats: function() 
  {
    const shotsFired = game.turn;

    // On va récupérer TOUTES les cases avec la classe .hit
    // Pour ça, on utilise querySelectorAll
    const hits = document.querySelectorAll( ".hit" );
    // Ensuite, il suffit de compter le nombre de cases pour avoir le nombre de tirs réussis
    const hitsCount = hits.length;
    // A partir de là, on peut calculer le pourcentage de tirs réussis
    const hitsPercent = hitsCount / shotsFired * 100;

    // On fait tout pareil pour les tirs manqués, cette fois en comptant les cases .splash
    const splash = document.querySelectorAll( ".splash" );
    const splashCount = splash.length;
    const splashPercent = splashCount / shotsFired * 100;

    let message = "Tirs totaux : " + shotsFired + "\n";
    message += "Tirs réussis : " + hitsCount + " ( " + hitsPercent.toFixed(2) + "%)\n";
    message += "Tirs manqués : " + splashCount + " ( " + splashPercent.toFixed(2) + "% )\n";

    // On affiche dans une alerte
    alert( message );
  }
};