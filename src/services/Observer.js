export default class Observer {
    constructor(callback, unbind) {
        this.isStopped = false;
        this.isDisposed = false;
        this.callback = callback;
        this.unbind = unbind;
    }

    dispose() {
        this.isDisposed = true;
    }

    start() {
        if (this.isDisposed) {
            return;
        }
        this.isStopped = false;
    }

    stop() {
        if (this.isDisposed) {
            return;
        }
        this.isStopped = true;
    }

    notify(event) {
        if (!this.isDisposed && !this.isStopped) {
            this.callback(event);
        }
    }
}