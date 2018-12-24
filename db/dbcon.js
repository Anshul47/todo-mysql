const mysql = require('mysql');

var dbCon = '';
if(process.env.JAWSDB_URL){
    dbCon = mysql.createConnection(process.env.JAWSDB_URL);
}else{
    dbCon = mysql.createConnection({
        host: 'localhost',
        user: 'root',
        password: '',
        database: 'todo_db',
        multipleStatements: true
    });
}


dbCon.connect((err) => {
    if (!err)
        console.log('DB connection succeded.');
    else
        console.log('DB connection failed \n Error : ' + JSON.stringify(err, undefined, 2));
});

module.exports = {dbCon};