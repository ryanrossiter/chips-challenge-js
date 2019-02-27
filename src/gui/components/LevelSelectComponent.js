import Component from '~/gui/Component';

export default class LevelSelectComponent extends Component {
    constructor(levelList, onLevelSelected) {
        super();
        this.levelList = levelList;
        this.onLevelSelected = onLevelSelected;
    }

    build() {
        let element = document.createElement('div');
        Object.assign(element.style, {
            position: 'absolute',
            top: "20%",
            left: "20%",
            right: "20%",
            bottom: "20%",
            minWidth: "400px",
            minHeight: "230px",
            border: '2px solid rgba(20, 20, 20, 0.5)',
        });

        for (let level of this.levelList) {
            let button = document.createElement('button');
            button.innerHTML = level.label;
            button.onclick = () => {
                this.onLevelSelected(level.name);
                this.parent.element.style.display = "none";
            }
            button.type = "button";
            Object.assign(button.style, {
                width: "70px",
                height: "60px",
                borderRadius: "5px",
                margin: "5px",
            });
            element.appendChild(button);
        }

        return element;
    }
}
