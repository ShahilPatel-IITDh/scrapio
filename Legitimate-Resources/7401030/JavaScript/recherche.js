/** Script pour l'affichage des suggestions de recherche et l'auto-complétion de la barre de recherche. */

/**
 * Initialiser le stockage local au clic du bouton rechercher.
 *
 * 
 */
$("#btn_rechercher").on('click', function () {
    InitialiserLeStockageLocal()
}
)

/**
 * Afficher la liste de suggestions de recherche, au clic dans le champ de la valeur recherchee.
 *
 * 
 */
$('#champ_recherche').on('click', function (e) {
    ViderListeRecherche()
    if (localStorage.getItem("recherche") != null) {
        donnees = ObtenirAnciennesRecherches()

        for (i = donnees.length - 1; i >= 0; i--) {
            ligne = $('<li></li>')
            ligne.text(donnees[i])
            ligne.addClass("item_recherche")
            $('#suggestion_recherches').append(ligne)
        }

        $('#suggestion_recherches').removeClass('d-none')
        $('#suggestion_recherches').fadeIn(1500)

        AjouterClicListeResultats()
    }
})

/**
 * Cacher la liste de suggestions de recherche dès qu'une touche est poussée.
 *
 * 
 */
$('#champ_recherche').on('key', CacherListeRecherche)

/**
 * Recherche des pokémons contenant la valeur recherchée, dès qu'une touche est levée
 *  et ajustement de la liste des suggestions de recherche en conséquence des pokémons trouvés.
 *
 */
$("#champ_recherche").on("keyup", function () {
    valeurRecherchee = $("#champ_recherche").val()
    $.get({
        url: `/pokemons/tous_les_pokemons/${valeurRecherchee}`,
        contentType: "json",
        success: function (donnees) {
            ViderListeRecherche()

            for (i = 0; i <= donnees.length - 1; i++) {
                ligne = $('<li></li>')
                ligne.text(donnees[i])
                ligne.addClass("item_recherche")
                $('#suggestion_recherches').append(ligne)
            }

            $('#suggestion_recherches').removeClass('d-none')
            $('#suggestion_recherches').fadeIn(1500)

            AjouterClicListeResultats()
        },
        error: function (jqxhr, textstatus, errorThrown) {
            ViderListeRecherche()
        }
    })
})



/**
 * Permet de nettoyer une liste si celle-ci a plus de 10 valeurs,
 *  afin de conserver uniquement les 10 dernières valeurs.
 * 
 *  @param listeANettoyer (array) : Liste de valeurs qui doit être nettoyée. 
 *  @return listeANettoyer (array) : Liste contenant les 10 dernières valeurs de la liste initiale.
 * 
 */
function NettoyerListe(listeANettoyer) {
    listeRetour = []
    if (listeANettoyer.length > 10) {
        for (i = listeANettoyer.length - 10; i < listeANettoyer.length; i++) {
            listeRetour.push(listeANettoyer[i])
        }
    }

    if (listeRetour.length > 0) {
        return listeRetour
    }
    else {
        return listeANettoyer
    }
}

/**
 * Permet de transformer la chaîne de caractères contenue dans le stockage local ("recherche") et d'obtenir
 * une liste de tous les valeurs qui y sont inscrites.
 * 
 *  @return anciennesRecherches (array) : Liste contenant les dernières valeurs recherchées, 
 * qui sont conservées dans le stockage local.
 * 
 */
function ObtenirAnciennesRecherches() {
    anciennesRecherches = []
    anciennesRecherches = localStorage.getItem("recherche").split(',')
    return anciennesRecherches
}

/**
 * Permet de vider la liste de suggestions de recherche.
 *
 */
function ViderListeRecherche() {
    $('#suggestion_recherches').empty()
}

/**
 * Permet de cacher la liste de suggestions de recherche.
 *
 */
function CacherListeRecherche() {
    $('#suggestion_recherches').addClass('d-none')
}


/**
 * Permet d'ajouter un eventhandler au clic d'un element de la liste de suggestions de recherche.
 *
 */
function AjouterClicListeResultats() {
    $('header').on('click', 'li.item_recherche', function (e) {
        $('#champ_recherche').val(this.textContent)
        CacherListeRecherche()
    })
}


/**
 * Permet d'initialiser et de mettre à jour le stockage local associée à la clé "recherche".
 *
 */
function InitialiserLeStockageLocal() {
    if (localStorage.getItem("recherche") != null) {
        anciennesRecherches = ObtenirAnciennesRecherches()
        localStorage.removeItem("recherche")
    }
    else {
        anciennesRecherches = []
    }

    valeurRecherchee = $("#champ_recherche").val()
    if (valeurRecherchee != null && valeurRecherchee != "") {
        anciennesRecherches.push(valeurRecherchee)
    }

    anciennesRecherches = NettoyerListe(anciennesRecherches)
    chaineAnciennesRecherches = anciennesRecherches.toString()
    localStorage.setItem("recherche", chaineAnciennesRecherches)
}

