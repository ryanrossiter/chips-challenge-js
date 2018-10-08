import EventEmitter from 'events';

export default class Component extends EventEmitter {
    constructor() {
        super();
        
        this.controllers = [];
    }

    addController(controller) {
        this.controllers.push(controller);
    }

    init() {
        this.element = this.build();
        return this.element;
    }

    build() {
        throw Error("Component.build must be overridden");
    }

    destroy() {}

    update() {}
}
