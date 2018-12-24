
const mysql = require('../db/dbcon.js');

var  sql1 = "";

var  sql2 = "";


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