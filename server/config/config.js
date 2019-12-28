
const Settings = {
    development: {
        port: 7777,
        connectionString: "mongodb://localhost:27017/taskmgr",
        emailserver: {
            host: "localhost",
            port: 25,
            from: "\"Task Manager\" <info@taskmgr.com>",
            error_recipient: "youremail@gmail.com"
        }
    },  
    test: {
        port: 7776,
        connectionString: "mongodb://localhost:27017/taskmgr_test",
        emailserver: {
            host: "localhost",
            port: 25,
            from: "\"Task Manager\" <info@taskmgr.com>",
            error_recipient: "youremail@gmail.com"
        }
    },
    production: {
        port: 7778,
        connectionString: "mongodb://localhost:27017/taskmgr",
        emailserver: {
            host: "localhost",
            port: 25,
            from: "\"Task Manager\" <info@taskmgr.com>",
            error_recipient: "kufreokon24@gmail.com"
        }
    }
}

module.exports = function (app) {
    return Settings[app.get('env')];
}