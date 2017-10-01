class App {
    constructor() {
        this.rosServer = new RosServer(this.publish.bind(this), this.log);
        this.racecar = new Racecar(this.rosServer);
        this.rosServer.start();
    }

    log(msg) {
        const el = document.createElement('div');
        el.innerText = msg;
        document.body.appendChild(el);
    }

    publish() {
        this.racecar.publish();
    }

    mousedown() {
        const drive = this.racecar.drive;
        if (drive.speed === 0) {
            this.racecar.drive.speed = 50;
            this.racecar.drive.acceleration = 5;
            this.log('accelerating');
            return;
        }
        this.racecar.drive.speed = 0;
        this.racecar.drive.acceleration = 0;
        this.log('braking');
    }

    mouseup() {

    }
}
