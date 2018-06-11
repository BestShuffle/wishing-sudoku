var wishingApp = new Framework7({
	id: "fr.wishing.sudoku",
	name: "Wishing Sudoku",
	theme: 'md',
	touch: {
		disableContextMenu: false,
		tapHold: true,
		tapHoldPreventClicks: false
	},
	routes: [
		{
			name: 'home',
			path: '/',
			url: './index.html'
		},
		{
			name: 'difficult',
			path: '/difficult/',
			url: './difficult.html'
		},
		{
			name: 'game',
			path: '/game/',
			url: './game.html'
		},
	]
});

var $$ = Dom7;

var mainView = wishingApp.views.create('.view-main', {
	dynamicNavbar: true
});