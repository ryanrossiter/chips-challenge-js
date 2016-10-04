var Mouse = function() {
	var pos = {x: 0, y: 0};

	var clicked_b = false;
	var clickPos = {x: 0, y: 0};

	var onClick = function(evt, rect) {
		clicked_b = true;
		clickPos.x = evt.clientX - rect.left;
		clickPos.y = evt.clientY - rect.top;
	};

	var clicked = function() {
		return clicked_b;
	};

	var clickHandled = function() {
		clicked_b = false;
	};

	var mouseMove = function(evt, rect) {
		pos.x = evt.clientX - rect.left;
		pos.y = evt.clientY - rect.top;
	};

	return {
		pos: pos,
		clickPos: clickPos,
		clicked: clicked,
		clickHandled: clickHandled,
		onClick: onClick,
		mouseMove: mouseMove
	};
}