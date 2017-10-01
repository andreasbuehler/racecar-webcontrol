window.onload =  (function () {

    // This function connects to the rosbridge server running on the local computer on port 9090
    var rbServer = new ROSLIB.Ros({
        url: 'ws://192.168.64.2:9090'
    });

    // This function is called upon the rosbridge connection event
    rbServer.on('connection', function () {
        // Write appropriate message to #feedback div when successfully connected to rosbridge
        var fbDiv = document.getElementById('feedback');
        fbDiv.innerHTML += "<p>Connected to websocket server.</p>";
    });

    // This function is called when there is an error attempting to connect to rosbridge
    rbServer.on('error', function (error) {
        // Write appropriate message to #feedback div upon error when attempting to connect to rosbridge
        var fbDiv = document.getElementById('feedback');
        fbDiv.innerHTML += "<p>Error connecting to websocket server.</p>";
    });

    // This function is called when the connection to rosbridge is closed
    rbServer.on('close', function () {
        // Write appropriate message to #feedback div upon closing connection to rosbridge
        var fbDiv = document.getElementById('feedback');
        fbDiv.innerHTML += "<p>Connection to websocket server closed.</p>";
    });

    var racecarCmdVelTopic = new ROSLIB.Topic({
        ros: rbServer,
        name: '/vesc/high_level/ackermann_cmd_mux/input/nav_0',
        messageType : 'ackermann_msgs/AckermannDrive.msg'
    })

    var ackermann = new ROSLIB.Message({
        drive: {
            steering_angle: 0,
            steering_angle_velocity: 0,
            speed: 0,
            acceleration: 0,
            jerk: 0
        }
    })

    var mousedownID = -1;  //Global ID of mouse down interval
    function mousedown(event) {
        if (mousedownID == -1)  //Prevent multimple loops!
            ackermann.drive.speed = 100;
            ackermann.drive.acceleration = 5;
            mousedownID = setInterval(whileMouseDown, 100 /*execute every 100ms*/);
    }

    function mouseup(event) {
        if (mousedownID != -1) {  //Only stop if exists
            clearInterval(mousedownID);
            mousedownID = -1;
        }
    }

    function whileMouseDown() {
        racecarCmdVelTopic.publish(ackermann);
    }

    document.getElementById('myBtn').addEventListener('mousedown', mousedown);
    document.getElementById('myBtn').addEventListener("mouseup", mouseup);
    document.getElementById("myBtn").addEventListener("mouseout", mouseup);

})


