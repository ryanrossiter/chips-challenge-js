import GUI from '~/gui/GUI';
import LevelSelectComponent from '~/gui/components/LevelSelectComponent';

const MenuGUIBuilder = {
    build: (levelList, onLevelSelected) => {
        let gui = new GUI(document.getElementById('canvas-container'));
        let lsComponent = new LevelSelectComponent(levelList, onLevelSelected);
        gui.addComponent(lsComponent);

        return gui;
    }
};

export default MenuGUIBuilder;
