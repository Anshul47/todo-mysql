const mysql = require('mysql');

var dbCon = mysql.createConnection({
    host: 'localhost',
    user: 'root',
    password: '',
    database: 'todo_db',
    multipleStatements: true
});

dbCon.connect((err) => {
    if (!err)
        console.log('DB connection succeded.');
    else
        console.log('DB connection failed \n Error : ' + JSON.stringify(err, undefined, 2));
});

module.exports = {dbCon};