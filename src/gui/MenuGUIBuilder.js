import GUI from '~/gui/GUI';
import LevelSelectComponent from '~/gui/components/LevelSelectComponent';

const MenuGUIBuilder = {
    build: () => {
        let gui = new GUI(document.getElementById('canvas-container'));
        let lsComponent = new LevelSelectComponent();
        gui.addComponent(lsComponent);

        return gui;
    }
};

export default MenuGUIBuilder;
