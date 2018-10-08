import Core from '~/Core';
import Registry from '~/Registry';

import MenuGUIBuilder from '~/gui/MenuGUIBuilder';

window.onload = function() {
	var canvas = document.getElementById("main-canvas");
	Registry.loadResources();

	Core.init(canvas);

	var interval = setInterval(function() {
		if (Registry.loaded) {
			Core.start();
			clearInterval(interval);
			//MenuGUIBuilder.build();
		}
	}, 200);
}
