/**
 * 
 * EVENTS
 * 
 */

//Quand l"appareil est prêt
$$(document).on("deviceready", function() {

});

//Verouillage
$$(document).on("pause", function (e) {
});

//Retour sur l"appli
$$(document).on("resume", function (e) {
});

$$(document).on("page:init", ".page[data-name='home']", function (e) {
});

//Mode facile par défaut
var nbEmptyCells = 20,
	gameDifficult = "";
// Liste des difficultés
const difficults = [
		["Facile", "gray", 20],
		["Moyen", "blue", 30],
		["Difficile", "orange", 40],
		["Extrême", "red", 50]
];
$$(document).on("page:init", ".page[data-name='difficult']", function (e) {
	generateDifficults();
	
	$$(".difficult-button").on("click", function (e) {
		nbEmptyCells = e.target.dataset.difficult;
		gameDifficult = $$(this).text();
		mainView.router.navigate("/game/");
	});
});

//Cellule sélectionnée
const nbMaxErrors = 3;
var selectedCell = undefined;
var isPlaying = false,
nbErrors = 0,
gameTimer;
$$(document).on("page:init", ".page[data-name='game']", function (e) {
	// Démarrage de la partie
	generateNumbers();
	generateSudoku();
	startGame();
	// Affichage de la difficulté choisie
	$$(".difficult").text(gameDifficult);
	// Affichage de la valeur par défaut
	$$(".errors").html("Erreurs : " + nbErrors + "/" + nbMaxErrors);

	$$(".empty").on("click", function (e) {
		if (isPlaying) {
			if ($$(this).hasClass('empty')) {
				if (selectedCell !== undefined) {
					selectedCell.removeClass("selected");
				}
				selectedCell = $$(this);
				selectedCell.addClass("selected");
			}
		}
	});

	$$(".number").on("click", function (e) {
		if (isPlaying) {
			if (selectedCell !== undefined) {
				let selectedNumber = $$(e.target);
				let number = selectedNumber.html();

				selectedCell.html(number);
				// Sauvegarde du nombre entré par le joueur
				let cellNumber = selectedCell.text();
				// Suppression de la classe selected et suppression du nombre entré par le joueur
				// Vide du champ pour correspondre à la version de l'htmlToDo
				selectedCell.removeClass("selected");
				selectedCell.empty();
				let selectedCellWithEmpty = selectedCell[0].outerHTML;
				// Suppression de la classe empty pour avoir la version de la solution
				selectedCell.removeClass("empty");
				selectedCell.text(cellNumber);
				let selectedCellWithoutClass = selectedCell[0].outerHTML.replace(' class=""', '');

				// Si le nombre choisi est juste
				if (htmlSolution.includes(selectedCellWithoutClass)) {
					htmlToDo = htmlToDo.replace(selectedCellWithEmpty, selectedCellWithoutClass);
					selectedCell = undefined;
					checkIfPlayerWin();
				} else {
					// Resélection de la case
					selectedCell.addClass("empty");
					selectedCell.addClass("selected");
					// Mise à jour du nombre d'erreurs
					nbErrors++;
					$$(".errors").html("Erreurs : " + nbErrors + "/" + nbMaxErrors);
					if (nbErrors >= nbMaxErrors) {
						stopGame();
						alert("Perdu ! Vous avez fait trop d'erreurs !");
					}
				}
			}
		}
	});
});
