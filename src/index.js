import Core from '~/Core';
import Registry from '~/Registry';

window.onload = function() {
	var canvas = document.getElementById("main-canvas");
	Registry.loadResources();

	Core.init(canvas);

	var interval = setInterval(function() {
		if (Registry.loaded) {
			Core.start();
			clearInterval(interval);
		}
	}, 200);
}
