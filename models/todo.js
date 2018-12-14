const mysql = require('../db/dbcon.js');



var getUUID = function() {
     var promise = new Promise(function(resolve, reject){
          var sql = 'select UUID() as id';
            mysql.dbCon.query(sql, (err, rows, fields) => {
                //console.log(rows[0].id);
                resolve({uuid: rows[0].id});
            });
     });
     return promise;
  };
  
  
  var insertTodoData = function(uuid, todo) {
     var promise = new Promise(function(resolve, reject){
        var sql = 'insert into toto (id, todo_text, comp_flag, cdate, udate) values (?, ?, 0, NOW(), NOW())';
        mysql.dbCon.query(sql, [uuid, todo.text], (err, rows, fields) => {
            if (!err){
                resolve({
                    data: uuid,
                    err: 0,
                    err_msg: ''
                });
            }else{
                reject({
                    data: rows,
                    err: 1,
                    err_msg: err
                });
            }
        });
     });
     return promise;
  };

var insertTodo = (todo) => {

   return new Promise((resolve, reject) => {
        getUUID().then((data) => {
            insertTodoData(data.uuid, todo).then((data1) => {
                resolve(data1);
            });
        });
    }); 
};

var getAllTodo = () => {

    return new Promise((resolve, reject) => {
        var sql = 'SELECT * FROM toto';
        mysql.dbCon.query(sql, (err, rows, fields) => {

            if (!err){
                resolve({
                    data: rows,
                    err: 0,
                    err_msg: ''
                });
            }else{
                reject({
                    data: rows,
                    err: 0,
                    err_msg: ''
                });
            }

        });
    });
};

var getTodoById = (id) => {
    
    return new Promise((resolve, reject) => {
        
        var sql = 'SELECT * FROM toto where id = ?';
        mysql.dbCon.query(sql, [id], (err, rows, fields) => {

            if (!err){
                resolve({
                    data: rows,
                    err: 0,
                    err_msg: ''
                });
            }else{
                reject({
                    data: rows,
                    err: 0,
                    err_msg: ''
                });
            }

        });
    });
};

module.exports = {
    insertTodo,
    getAllTodo,
    getTodoById
};