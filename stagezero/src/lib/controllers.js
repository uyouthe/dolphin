'use strict';

import {getRawId} from './tools';

export function dragController(node, model) {
	let new_model = [].concat(model);
	let node_id = getRawId(node.attr('id'));
	let new_coords = {
		x: node.x(),
		y: node.y()
	}
	
	new_model.forEach(function (elem) {
		if (elem.id === node_id) {
			elem.position = new_coords;
		}
	});

	return new_model;
}