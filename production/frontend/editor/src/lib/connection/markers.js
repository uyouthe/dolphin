'use strict';

import {invertDirection} from './tools';

export function defineMarker(type) {
	switch (type) {
		case 'association': return drawUnfilledArrow;
		case 'association-bidi': return blank;

		case 'inheritance': return drawFilledArrow;
		case 'implementation': return drawFilledArrow;
		case 'dependency': return drawUnfilledArrow;

		case 'aggregation': return function (line, direction, isReverse) {
			drawUnfilledArrow(line, direction, isReverse);
			drawUnfilledDiamond(line, invertDirection(direction), !isReverse);
			return line;
		}

		case 'composition': return function (line, direction, isReverse) {
			drawUnfilledArrow(line, direction, isReverse);
			drawFilledDiamond(line, invertDirection(direction), !isReverse);
			return line;
		}
	}
}

function getDegrees(isReverse) {
	return isReverse ? 180 : 0;
}

function blank(line) {
	return line;
}

function drawUnfilledArrow(line, direction, isReverse) {
	let marker = line.marker(isReverse ? 'start' : 'end', 26, 26, function (add) {
		add.path('M0,0 L4,2 L0,4').addClass('dolphin_line_marker dolphin_line_marker-arrow')
			.attr('transform-origin', '2 0').move(9, 11)
			.transform({'rotation': getDegrees(isReverse)})
	});

	return line;
}

function drawFilledArrow(line, direction, isReverse) {
	let marker = line.marker(isReverse ? 'start' : 'end', 26, 26, function (add) {
		add.path('M0,0 L4,2 L0,4 z').addClass('dolphin_line_marker dolphin_line_marker-arrow_filled')
			.attr('transform-origin', '2 0').move(9, 11)
			.transform({'rotation': getDegrees(isReverse)})
	});

	return line;
}

function drawUnfilledDiamond(line, direction, isReverse) {
	let marker = line.marker(isReverse ? 'start' : 'end', 26, 26, function (add) {
		add.path('M0,0 L4,3 L0,6 L-4,3 z').addClass('dolphin_line_marker dolphin_line_marker-diamond')
			.attr('transform-origin', '0 0').move(9, 10)
			.transform({'rotation': getDegrees(isReverse)})
	});

	return line;
}

function drawFilledDiamond(line, direction, isReverse) {
	let marker = line.marker(isReverse ? 'start' : 'end', 26, 26, function (add) {
		add.path('M0,0 L4,3 L0,6 L-4,3 z').addClass('dolphin_line_marker dolphin_line_marker-diamond_filled')
			.attr('transform-origin', '0 0').move(9, 10)
			.transform({'rotation': getDegrees(isReverse)})
	});

	return line;
}
