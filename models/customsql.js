
const mysql = require('../db/dbcon.js');

var  sql1 = "CREATE TABLE toto ( id varchar(36) NOT NULL, uid varchar(36) NOT NULL, todo_text text NOT NULL, comp_flag tinyint(1) NOT NULL, comp_date date NOT NULL, cdate datetime NOT NULL, udate datetime NOT NULL) ENGINE=InnoDB DEFAULT CHARSET=utf32;";

var  sql2 = "CREATE TABLE user (uid varchar(36) NOT NULL, name varchar(255) NOT NULL, email varchar(355) NOT NULL, password text NOT NULL, token text NOT NULL, cdate datetime NOT NULL, udate datetime NOT NULL ) ENGINE=InnoDB DEFAULT CHARSET=utf32;";


var runSqlQuery1 = function (){
    var promise = new Promise(function(resolve, reject){
        mysql.dbCon.query(sql1, (err, rows, fields) => {

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

  var runSqlQuery2 = function (){
    var promise = new Promise(function(resolve, reject){
        mysql.dbCon.query(sql2, (err, rows, fields) => {

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
    runSqlQuery1,
    runSqlQuery2
 };