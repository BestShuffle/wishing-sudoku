function shuffle(array) {
	for (let j, x, i = array.length; i; j = parseInt(Math.random() * i), x = array[--i], array[i] = array[j], array[j] = x)
		;
	return array;
}

function generateDifficults() {
	let htmlDifficults = '';
	difficults.forEach(function(difficult) {
		let libelle = difficult[0],
			color = difficult[1],
			nbEmpty = difficult[2];
		htmlDifficults += '' +
		'<div class="row">' +
		'	<div class="col">' +
		'		<button class="difficult-button button button-fill color-' + color +
		'" data-difficult="' + nbEmpty +
		'">' + libelle + '</button>' +
		'	</div>' +
		'</div>';
	});
	$$(".difficults").html(htmlDifficults);
}

var htmlSolution, htmlToDo;
function generateSudoku() {
	let nbMaxLoop = 10000;

	let grid = new Array(); // Init grid
	let lines = new Array(); // Init lines
	let columns = new Array(); // Init columns
	let squares = new Array(); // Init cases
	let nbWhiles = 0; // Init nombre de while
	let isGridComplete = false; // Init isGridComplete

	outerwhile: // Point de référence
	while ((nbWhiles < nbMaxLoop) && !isGridComplete) // Boucle tant que la
	// grid n'est pas
	// complète et que l'on
	// n'a pas dépassé le
	// maximum
	{
		nbWhiles++; // On ajoute 1 à la boucle

		for (let line = 1; line <= 9; line++) {
			grid[line] = new Array(); // On crée chaque ligne de la grid
			lines[line] = new Array(); // On crée un array pour les lines
			columns[line] = new Array(); // On crée un array pour les columns

			for (let col = 1; col <= 9; col++) {
				grid[line][col] = 0; // On passe toutes les cases à 0
				lines[line][col] = col; // On complète toutes les possibilités
				// de la
				// ligne
				columns[line][col] = col; // On complète toutes les
				// possibilités de la
				// colonne
			}
		}
		for (let line = 1; line <= 3; line++) {
			squares[line] = new Array(); // On crée les trois lines de cases

			for (let col = 1; col <= 3; col++) {
				squares[line][col] = new Array(); // On crée les trois columns
				// de
				// cases dans chaque ligne
				for (let possib = 1; possib <= 9; possib++) {
					squares[line][col][possib] = possib; // Et on complète
					// toutes les
					// possibilités de la case
				}
			}
		}

		for (let line = 1; line <= 9; line++) {
			for (let col = 1; col <= 9; col++) {
				let possibilites = new Array();
				let index = 0;

				for (let k = 1; k <= 9; k++) {
					if (!lines[line][k])
						continue;
					if (!columns[col][k])
						continue;
					if (!squares[Math.ceil(line / 3)][Math.ceil(col / 3)][k])
						continue;

					possibilites[index] = k;
					index++;
				}

				if (possibilites.length == 0)
					continue outerwhile;

				let nb = possibilites[Math
						.floor((Math.random() * possibilites.length))];
				grid[line][col] = nb;
				lines[line][nb] = undefined;
				columns[col][nb] = undefined;
				squares[Math.ceil(line / 3)][Math.ceil(col / 3)][nb] = undefined;
			}
		}

		isGridComplete = true;
	}

	if (isGridComplete) {
		let cellsToClear = new Array();

		for (let i = 1; i <= 81; i++) {
			if (i <= nbEmptyCells)
				cellsToClear[i] = true;
			else
				cellsToClear[i] = false;
		}

		cellsToClear = shuffle(cellsToClear);

		let count = 0;

		htmlSolution = '<table cellpadding="0"><tbody>';
		htmlToDo = '<table cellpadding="0"><tbody>';

		for (let line = 1; line <= 9; line++) {
			htmlSolution += "<tr>";
			htmlToDo += "<tr>";

			for (let col = 1; col <= 9; col++) {
				// console.log("x : " + x + " | y : " + y);
				count++;

				htmlSolution += '<td data-col="' + col + '" data-line="' + line
						+ '">' + grid[line][col] + "</td>";
				htmlToDo += '<td data-col="'
						+ col
						+ '" data-line="'
						+ line
						+ '"'
						+ ((cellsToClear[count]) ? ' class="empty">' : ">"
								+ grid[line][col]) + "</td>";
			}

			htmlSolution += "</tr>";
			htmlToDo += "</tr>";
		}

		htmlSolution += "</tbody></table>";
		htmlToDo += "</tbody></table>";

		$$(".sudoku").html(htmlToDo);
	} else {
		generateSudoku();
	}
}

function generateNumbers() {
	let numbersHTML = "";

	for (let i = 1; i <= 9; i++) {
		numbersHTML += '<div class="col number">' + i + '</div>';
	}

	$$(".numbers").html(numbersHTML);
}

function startGame() {
	let gameTime = 0;
	isPlaying = true;
	gameTimer = setInterval(function() {
		// Calcul des minutes et secondes
		let hours = Math.floor(gameTime / Math.pow(60, 2)),
			minutes = Math.floor(gameTime / 60),
			seconds = Math.floor(gameTime % 60);

		let timerText = minutes + ":";
		
		if (minutes < 10) {
			timerText = "0" + timerText;
		}
		if (hours > 0) {
			timerText = hours + ":";
			if (hours < 10) {
				timerText = "0" + timerText;
			}
		}
		if (seconds < 10) {
			timerText += "0";
		}
		timerText += seconds;

		// Mise à jour de la valeur affichée
		$$(".timer").text(timerText);

		gameTime += 1;
	}, 1000);
}

function stopGame() {
	clearInterval(gameTimer);
	isPlaying = false;
}

function checkIfPlayerWin() {
//	console.log(htmlToDo);
//	console.log(htmlSolution);
	if (htmlToDo == htmlSolution) {
		stopTimer();
		alert("C'est gagné !");
	}
}

/*
 * Timer signant la fin de la partie
 */
// function startTimer() {
// let usedTime = 0;
// let gameTimer = setInterval(function() {
// // Distance entre les deux temps
// var distance = gameMaxTime - usedTime;
//
// // Calcul des minutes et secondes
// let minutes = Math.floor(distance / 60),
// seconds = Math.floor(distance % 60);
//
// // Mise à jour de la valeur affichée
// $$(".timer").text(minutes + ":" + seconds);
//
// // Si le temps est écoulé on stoppe le timer
// if (distance < 0) {
// clearInterval(gameTimer);
// alert("Fin de la partie ! Voici la solution :");
// $$(".sudoku").html(htmlSolution);
//		}
//		
//		usedTime += 1;
//	}, 1000);
//}