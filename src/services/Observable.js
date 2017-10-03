import Observer from "./Observer";

export default class Observable {
    constructor() {
        this.observers = {};
    }

    _getObserversByType(type) {
        let observers = this.observers[type];

        if (observers == null) {
            observers = this.observers[type] = [];
        }

        return observers;
    }

    observe(type, callback) {
        let observers = this._getObserversByType(type);

        let observer = new Observer(callback, () => {
            let index = observers.indexOf(observer);
            if (index > -1) {
                observers.splice(index, 1);
            }
        });

        observers.push(observer);

        return observer;

    }

    notify(event) {
        if (typeof event.type !== "string") {
            throw new Error("Events need to have a 'type' property of type string.");
        }

        let type = event.type;
        let observers = this._getObserversByType(type);

        observers.forEach((observer) => {
            observer.notify(event);
        });

    }
}