
const mysql = require('../db/dbcon.js');

var  sql = "CREATE TABLE toto ( id varchar(36) NOT NULL, uid varchar(36) NOT NULL, todo_text text NOT NULL, comp_flag tinyint(1) NOT NULL, comp_date date NOT NULL, cdate datetime NOT NULL, udate datetime NOT NULL) ENGINE=InnoDB DEFAULT CHARSET=utf32;";


var runSqlQuery = function (){
    var promise = new Promise(function(resolve, reject){
        mysql.dbCon.query(sql, (err, rows, fields) => {

            if (!err){
                resolve({
                    data: 'Sql Done',
                    err: 0,
                    err_msg: ''
                });
            }else{
                
                reject({
                    err: 1,
                    err_msg: 'Sql not Done'
                });
            }
        });
    });
     return promise;
  };


  module.exports = {
    runSqlQuery
 };