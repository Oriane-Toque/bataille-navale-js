/*

Le module principal "app" de notre application

Pour l'instant, en JS, on ne peut pas charger d'autres fichiers JS nativement
Donc, on ajoute une balise <script> pour chaque fichier dans le code HTML
(plus tard, avec RequireJS ou Browserify, vous pourrait faire des "require" en JS ;) )

Dans ce module "app", on va placer tous les écouteurs d'évènements (dans init)
Puis, on peut (et on a choisi de le faire ici) placer toutes les fonctions "handler" de ces évènements
! Attention, les fonctiosns ont attachées à leur module => app.laFonction();

*/

const app = 
{
  themes: ['f0f', 'black-and-white', 'terminal', 'dark'],

  init: function() 
  {
    
    // On ajoute les écouteurs d'évènement
    // pour écouter l'évènement "le formulaire est soumis"
    // on récupère l'élément <form id="attackForm">
    const formElement = document.querySelector('#attackForm');
    // je sélectionne mon select grace au DOM
    const options = document.getElementById('theme');
    const newGame = document.getElementById('new-game');
    // Puis, sur cet élément, on écoute l'event "submit"
    // et si l'évènement survient, la fonction "handleSubmitAttackForm" sera automatiquement appelée par JS
    
    formElement.addEventListener( 'submit', app.handleSubmitAttackForm );

    // On écoute l'event "click" sur le bouton des stats
    document.querySelector('#stats').addEventListener( 'click', app.handleStatsClick );

    // On écoute l'event "click" sur le bouton des actions à afficher/cacher
    document.querySelector('#toggle-actions').addEventListener( 'click', app.handleActionsToggle );

    // je récupère chacune de mes options
    // et je leur ajoute un écouteur d'évènement
    options.addEventListener('change', app.handleGetTemplate);

    newGame.addEventListener('click', app.handleReloadGame);

    // Et enfin, on affiche la grille
    // grid.display();

    // Désormais, on affiche un form, puis on lance le jeu
    // document.querySelector('#beforegame .form').addEventListener('submit', app.handleNewGame);
    app.handleNewGame();
  },

  handleReloadGame : function()
  {
    document.location.reload();
  },

  handleLoadTemplate : function()
  {
    const themeCookie = document.cookie.split('=');
    const isCookie = document.cookie.indexOf( "Theme=" );
    if( isCookie >= 0){
      document.body.className = themeCookie[1];
    }
  },

  handleGetTemplate : function()
  {
    // assignation value du select à la class de body
    const theme = document.querySelector('#theme').value;

    // réinitialisation
    for (const currentTheme of app.themes)
    {
      document.body.classList.remove(currentTheme);
    }

    document.body.classList.add(theme);

    // création d'un cookie
    document.cookie = 'Theme=' + theme;
  },

  // La fonction "handler" qui sera exécutée à la soumission du formulaire
  // evt contient toujours les données de l'évènement dans une fonction "handler"
  handleSubmitAttackForm: function(evt) 
  {
    console.log('form submitted');

    // On bloque l'envoi du formulaire (fonctionnement par défaut)
    evt.preventDefault();

    // On récupère le formulaire qui vient d'être soumis (l'élément sur lequel l'event a eu lieu)
    const formElement = evt.currentTarget; // .currentTarget contient toujours l'élément sur lequel on a attaché l'event/handler (dans init)

    // On récupère l'élément 'l'input
    const inputElement = formElement.querySelector('input');

    // On récupère la valeur saisie dans l'input
    const inputValue = inputElement.value; // attribut "value" de l'élément

    // On vérifie la saisie avant d'envoyer le missile
    if (grid.checkCellName(inputValue)) {
      // On envoie un missile à la case saisie
      game.sendMissile(inputValue);
    } else {
      // Grosse alerte moche à l'écran
      alert('Case incorrecte');
    }
    // On vide l'input
    inputElement.value = ''; // on accède aussi en écriture aux attributs d'un élément
  },

  handleStatsClick: function(evt) 
  {
    stats.displayStats();
  },

  handleActionsToggle: function(evt) 
  {
    // On récupère la div actions
    const actionsHistoryElement = document.querySelector('#actions');

    // Si la div est cachée (none ou vide au départ, car uniquement en CSS)
    if (actionsHistoryElement.style.display === 'none' || actionsHistoryElement.style.display === '') {
      // alors on affiche
      actionsHistoryElement.style.display = 'block';
    } else {
      console.log(actionsHistoryElement.style.display);
      // Sinon, on cache
      actionsHistoryElement.style.display = 'none';
    }
  },

  handleNewGame: function() 
  {
    // On initialise le jeu
    // - tour n°1
    // - création de la grille
    // - affichage de la grille
    game.init();
  }
};

// On lance la fonction app.init une fois la page chargée
// Cela évite de bloquer l'affichage de la page
document.addEventListener('DOMContentLoaded', app.init);
document.addEventListener('DOMContentLoaded', app.handleLoadTemplate);
