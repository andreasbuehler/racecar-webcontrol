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
            this.racecar.drive.speed = 5;
            this.racecar.drive.acceleration = 2;
            this.log('accelerating');
            return;
        }
        this.racecar.drive.speed = 0;
        this.racecar.drive.acceleration = 0;
        this.log('braking');
    }

    slider(value) {
        this.racecar.drive.steering_angle = value * 3.141 / 180 * (-1);
    }

    mouseup() {

    }
}

window.onload =  (function () {
    const app = new App();
    const myBtn = document.getElementById('myBtn');
    var slider = document.getElementById("myRange");

    myBtn.addEventListener('mousedown', () => app.mousedown());
    myBtn.addEventListener('mouseup', () => app.mouseup());

    slider.oninput = function() {
        app.slider(this.value);
    }
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
            //url: 'ws://192.168.64.2:9090' // no port forwarding, works in MacOS Chrome, but not on other devices in Network
            url: 'ws://10.0.0.21:9000' // port forwarding in MacOS (10.0.0.21:9000 -> 192.168.64.2:9090), MacOS Chrome doesnt work anymore
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
