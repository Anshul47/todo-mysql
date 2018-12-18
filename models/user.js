const mysql = require('../db/dbcon.js');
const jwt = require('jsonwebtoken');
const bcrypt = require('bcryptjs');
const TOKEN_SALT = 'SANSAN';

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

  var insertUserData = function(uuid, name, email, password, token) {
     var promise = new Promise(function(resolve, reject){
        var sql = 'insert into user (uid, name, email, password, token, cdate, udate) values (?, ?, ?, ?, ?, NOW(), NOW())';
        mysql.dbCon.query(sql, [uuid, name, email, password, token], (err, rows, fields) => {
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


  var getUserByEmail = function (email){
    var promise = new Promise(function(resolve, reject){
        var sql = 'SELECT email, password, token FROM user where email = ?';
        mysql.dbCon.query(sql, [email], (err, rows, fields) => {

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
     return promise;
  };

  var getUserByToken = function (token){

    return new Promise((resolve, reject) => {
        var decoded = undefined;
        try{
            decoded = jwt.verify(token, TOKEN_SALT);
            getUserById(decoded.uid).then((userData) => {
                resolve(userData);
            }).catch((err) => {
                reject({
                    err: 1,
                    err_msg: 'Token Incorrect'
                });
            });
        }catch(e){
            reject({
                err: 1,
                err_msg: 'Token Incorrect'
            });
        }
    });
  };

  var getUserById = function (uid){
    var promise = new Promise(function(resolve, reject){
        var sql = 'SELECT uid, email FROM user where uid = ?';
        mysql.dbCon.query(sql, [uid], (err, rows, fields) => {

            if (!err){
                if(rows.length > 0){
                    resolve({
                        data: rows,
                        err: 0,
                        err_msg: ''
                    });
                }else{
                    reject({
                        err: 1,
                        err_msg: 'Token Incorrect'
                    });
                }
            }else{
                
                reject({
                    data: rows,
                    err: 0,
                    err_msg: ''
                });
            }
        });
    });
     return promise;
  };


  var insertUser = (user) => {

    return new Promise((resolve, reject) => {

        getUserByEmail(user.email).then((userData) => {
            
            if(userData.data.length > 0){
                bcrypt.compare(user.password, userData.data[0].password, (err, result) => {

                    if(result){
                        resolve({
                            data: [{
                                email: userData.data[0].email,
                                token: userData.data[0].token,
                                access: 'x-auth'
                            }],
                            err: 0,
                            err_msg: ''
                        });
                    }else{
                        reject({
                            err: 1,
                            err_msg: 'User Email and Password does not match'
                        });
                    }
                });
            }else{
                getUUID().then((data) => {
                    var hashPassword = '';
                    var token = '';
                    bcrypt.genSalt(10, (err, salt) => {
                        bcrypt.hash(user.password, salt, (err, hash) => {

                            hashPassword = hash;

                            token = jwt.sign(
                                {
                                    uid: data.uuid, 
                                    access: 'auth'
                                }, 
                                TOKEN_SALT
                            ).toString();

                            insertUserData(data.uuid, '', user.email, hashPassword, token).then((data1) => {
                                //resolve(data1);//access: 'x-auth'
                                resolve({
                                    data: [{
                                        email: user.email,
                                        token: token,
                                        access: 'x-auth'
                                    }],
                                    err: 0,
                                    err_msg: ''
                                });
                            }).catch((err) => {
                                reject(err);
                            });
                        });
                    });
                    
                });
            }
        });
     }); 
 };

 module.exports = {
    insertUser,
    getUserByToken
 };

