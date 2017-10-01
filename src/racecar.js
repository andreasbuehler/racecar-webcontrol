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
