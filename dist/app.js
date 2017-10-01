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

window.onload =  (function () {
    const app = new App();
    const myBtn = document.getElementById('myBtn');
    myBtn.addEventListener('mousedown', () => app.mousedown());
    myBtn.addEventListener('mouseup', () => app.mouseup());
});

class Racecar {
    constructor(rosServer) {
        this.topic = new ROSLIB.Topic({
            ros: rosServer.server,
            name: '/vesc/high_level/ackermann_cmd_mux/input/nav_0',
            messageType: 'ackermann_msgs/AckermannDrive.msg',
        });
        this.drive = {
            steering_angle: 0,
            steering_angle_velocity: 0,
            speed: 0,
            acceleration: 0,
            jerk: 0,
        };
        this.message = new ROSLIB.Message({ drive: this.drive });
    }

    publish() {
        this.topic.publish(this.message);
    }
}

class RosServer {
    constructor(publishCallback, log) {
        this.log = log;
        this.callback = publishCallback;        
        this.server = new ROSLIB.Ros({
            url: 'ws://192.168.64.2:9090'
        });
        this.server.on('connection', this.connection.bind(this));
        this.server.on('error', this.error.bind(this));
        this.server.on('close', this.close.bind(this));
    }
    start() {
        const fps = 20;                
        setInterval(this.callback, 1000 / fps);        
    }
    connection() {
        this.log('connection');        
    }
    error() {
        this.log('error');
    }
    close() {
        this.log('close');        
    }
}
