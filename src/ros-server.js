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
