var mysql = require('mysql');
let config = require('./config.js')
var connection = mysql.createConnection(config);

connection.connect(function(err){
    if (err) {
        console.error('连接失败: ' + err.stack);
        return;
      }
      console.log('连接成功: id ' + connection.threadId);
});

module.exports = connection
