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
  
  
  var insertTodoData = function(uuid, todo, uid) {
     var promise = new Promise(function(resolve, reject){
        var sql = 'insert into toto (id, uid, todo_text, comp_flag, cdate, udate) values (?, ?, ?, 0, NOW(), NOW())';
        mysql.dbCon.query(sql, [uuid, uid, todo.text], (err, rows, fields) => {
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

  var updateTodoData = function(textStr, id, uid){
      var promise = new Promise((resolve, reject) => {
        var sql = 'update toto set todo_text = ?, udate = NOW() where id = ? and uid = ?';
        mysql.dbCon.query(sql, [textStr, id, uid], (err, rows, fields) => {
            if(!err){
                resolve({
                    id: id,
                    err: 0,
                    err_msg: ''
                });
            }else{
                reject({
                    err: 1,
                    err_msg: err
                });
            }
        });
      });
      return promise;
  };

  var updateTodoCompletedData = function(id, uid){
    var promise = new Promise((resolve, reject) => {
        var sql = 'update toto set comp_flag = 1, comp_date = NOW() where id = ? and uid = ?';
        mysql.dbCon.query(sql, [id, uid], (err, rows, fields) => {
            if(!err){
                resolve({
                    id: id,
                    err: 0,
                    err_msg: ''
                });
            }else{
                reject({
                    err: 1,
                    err_msg: err
                });
            }
        });
      });
      return promise;
  };

var insertTodo = (todo, uid) => {

   return new Promise((resolve, reject) => {
        getUUID().then((data) => {
            insertTodoData(data.uuid, todo, uid).then((data1) => {
                resolve(data1);
            });
        });
    }); 
};

var updateTodo = (textStr, id, uid) => {
    return new Promise((resolve, reject) => {
        updateTodoData(textStr, id, uid).then((updateData) => {
            getTodoById(id, uid).then((data) => {
                resolve(data);
            });
        }).catch((err) => {
            reject(err);
        });
    });
};

var updateTodoCompleted = (id, uid) => {
    return new Promise((resolve, reject) => {
        updateTodoCompletedData(id, uid).then((updateData) => {
            getTodoById(id, uid).then((data) => {
                resolve(data);
            });
        }).catch((err) => {
            reject(err);
        });
    });
};

var getAllTodo = (uid) => {

    return new Promise((resolve, reject) => {
        var sql = 'SELECT id, todo_text, comp_flag, cdate as created_date, comp_date FROM toto where uid = ? and comp_flag = 0 Order by cdate';
        mysql.dbCon.query(sql, [uid], (err, rows, fields) => {

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

var getAllCompletedTodo = (uid) => {

    return new Promise((resolve, reject) => {
        var sql = 'SELECT id, todo_text, comp_flag, cdate as created_date, comp_date FROM toto where uid = ? and comp_flag = 1 Order by comp_date';
        mysql.dbCon.query(sql, [uid], (err, rows, fields) => {

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

var getTodoById = (id, uid) => {
    
    return new Promise((resolve, reject) => {
        
        var sql = 'SELECT id, todo_text, comp_flag, cdate as created_date, comp_date FROM toto where id = ? and uid = ?';
        mysql.dbCon.query(sql, [id, uid], (err, rows, fields) => {

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

var deleteTodo = (id, uid) => {
    return new Promise((resolve, reject) => {
        var sql = 'delete from toto where id = ? and uid = ?';
        mysql.dbCon.query(sql, [id, uid], (err, rows, fields) => {
            if(!err){
                resolve({
                    data: 'Todo deleted',
                    err: 0,
                    err_msg: ''
                });
            }else{
                reject({
                    err: 1,
                    err_msg: err
                });
            }
        });
    });
};

module.exports = {
    insertTodo,
    getAllTodo,
    getTodoById,
    updateTodo,
    updateTodoCompleted,
    getAllCompletedTodo,
    deleteTodo
};