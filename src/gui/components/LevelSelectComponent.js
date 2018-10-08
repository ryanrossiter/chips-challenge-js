import Component from '~/gui/Component';

export default class LevelSelectComponent extends Component {
    constructor() {
        super();
    }

    build() {
        let element = document.createElement('div');
        Object.assign(element.style, {
            position: 'absolute',
            left: 0,
            bottom: 0,
            width: "100%",
            maxWidth: "400px",
            height: "230px",
            border: '2px solid rgba(20, 20, 20, 0.5)',
        });


        this.textArea = document.createElement('textarea');
        this.textArea.readOnly = true;
        Object.assign(this.textArea.style, {
            boxSizing: 'border-box',
            resize: "none",
            width: '100%',
            height: "calc(100% - 25px)",
            borderWidth: 0,
            padding: '5px',
            margin: 0,
            backgroundColor: 'rgba(30, 30, 30, 0.4)',
            color: '#FFF',
            fontSize: '17px',
            fontFamily: "'Amaranth', sans-serif",
        });
        element.appendChild(this.textArea);

        this.typeArea = document.createElement('input');
        this.typeArea.type = 'text';
        this.typeArea.placeholder = 'Chat here';
        Object.assign(this.typeArea.style, {
            position: 'absolute',
            boxSizing: 'border-box',
            width: '100%',
            height: "25px",
            bottom: 0,
            left: 0,
            borderWidth: 0,
            borderTopWidth: '2px',
            padding: 0,
            paddingLeft: '5px',
            paddingRight: '5px',
            margin: 0,
            backgroundColor: 'rgba(30, 30, 30, 0.4)',
            color: '#FFF',
            fontSize: '17px',
            fontFamily: "'Amaranth', sans-serif",
        });
        this.typeArea.addEventListener('keydown', (evt) => {
            if (evt.code === 'Enter') {
                if (this.typeArea.value.length > 0) {
                    this.emit('submit', this.typeArea.value);
                    this.typeArea.value = "";
                }
            } else if (evt.code === 'Backspace') {
                this.typeArea.value = this.typeArea.value.slice(0, this.typeArea.value.length - 1);
            }
        });
        element.appendChild(this.typeArea);
        this.addMessage("Hello, sailor!");

        return element;
    }

    addMessage(message) {
        this.textArea.value += message + '\n';
        this.textArea.scrollTop = this.textArea.scrollHeight;
    }
}
