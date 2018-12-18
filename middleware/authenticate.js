const user = require('./../models/user.js');


var authenticate = (req, res, next) => {
    var token = req.header('x-auth');

    user.getUserByToken(token).then((userData) => {

        req.uid = userData.data[0].uid;
        req.email = userData.data[0].email;
        next();
    }).catch((err) => {
        //res.status(401).send();
        res.send(err);
    });
};

module.exports = {
    authenticate
};