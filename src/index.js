import Core from '~/Core';
import Registry from '~/Registry';

import MenuGUIBuilder from '~/gui/MenuGUIBuilder';

window.onload = function() {
	var canvas = document.getElementById("main-canvas");
	Registry.loadResources();

	Core.init(canvas);

	var interval = setInterval(function() {
		if (Registry.loaded) {
			// iterate to add onclick handlers, then call Core.start(mapName)
			// let lselect = document.getElementById("level-select");
			// for (let i = 0; i < lselect.children.length; i++) {
			// 	let e = lselect.children[i];
			// 	e.onclick = () => {
			// 		Core.start(e.dataset.levelname);
			// 	};
			// }

			clearInterval(interval);
			MenuGUIBuilder.build([{
				name: "test",
				label: "Test"
			}, {
				name: "icy",
				label: "Icy"
			}, {
				name: "og1",
				label: "Level 1"
			}, {
				name: "og3",
				label: "Level 3"
			}], (levelname) => {
				Core.start(levelname);
			});
		}
	}, 200);
}
