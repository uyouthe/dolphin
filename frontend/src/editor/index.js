'use strict';

// entry point
// todo errors

require('./css/style.css');
let api = require('./api');
import styles from './css/style.js';
import {draw} from './lib/classes';
import {moveController} from './lib/controllers';
import createStoreFromSavedDiagram from './model';
import {download} from './lib/download';
let fixtures = JSON.stringify(require('./fixtures'));

let diagram;
let store;

loadDiagram(fixtures);

function loadDiagram(diagram_string) {
	diagram = draw.classDiagram();
	store = createStoreFromSavedDiagram(diagram_string);
	rebuild(diagram);

	store.subscribe(function () {
		// rebuild diagram if something happens
		rebuild(diagram);
	});
}

function rebuild(diagram) {
	diagram.clear();
	diagram.fromModel(store.getState());
	bindControllers(diagram);
}

function bindControllers(diagram) {
	diagram.children().forEach(function (child) {
		
		child.on('dragmove', function () {
			diagram.fire('redraw');
			diagram.redrawConnections();
		})

		child.on('dragend', function () {
			// change model on dragend
			store.dispatch({
				type: 'MOVE',
				payload: this
			});
		});
	});
}

function exportDiagram() {
	let str = draw.svg();
	let place_for_style = str.search(/>/);

	let style = '<style>' + styles + '</style>';
	let new_str = str.slice(0, place_for_style + 1) + style + str.slice(place_for_style + 1);
	return download(new_str, 'Dolphin_Diagram', 'image/svg+xml');
}

function downloadDiagram() {
	return download(JSON.stringify(api.getModel()), 'Dolphin Diagram.dd', 'application/json');
}

module.exports = Object.assign({}, api, {
	exportDiagram,
	downloadDiagram,
	loadDiagram,
	fixtures
});
