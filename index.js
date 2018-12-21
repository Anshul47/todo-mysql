const express = require('express');
const bodyparser = require('body-parser');


const todo = require('./models/todo.js');
const user = require('./models/user.js');
const {authenticate} = require('./middleware/authenticate');


var app = express();
const PORT = process.env.PORT || 3000;

app.use(bodyparser.json());

//Add new todo
app.post('/todo', authenticate, (req, res) => {
    var body = req.body;
    todo.insertTodo(body, req.uid)
    .then((result) => {
        res.send(result);
    }).catch((err) => {
        res.send(err);
    });
});

//Get all todo's that are not completed
app.get('/todo', authenticate, (req, res) => {
    todo.getAllTodo(req.uid)
    .then((result) => {
        res.send(result);
    }).catch((err) => {
        res.send(err);
    }); 
});

//Get All Completed Todo
app.get('/todo/completed', authenticate, (req, res) => {
    todo.getAllCompletedTodo(req.uid)
    .then((result) => {
        res.send(result);
    }).catch((err) => {
        res.send(err);
    }); 
});

//Get todo by ID
app.get('/todo/:id', authenticate, (req, res) => {
    todo.getTodoById(req.params.id, req.uid)
    .then((result) => {
        res.send(result);
    }).catch((err) => {
        res.send(err);
    }); 
});

//Update Todo Text
app.post('/todo/text/:id', authenticate, (req, res) => {
    var body = req.body;
    todo.updateTodo(body.text, req.params.id, req.uid)
    .then((result) => {
        res.send(result);
    }).catch((err) => {
        res.send(err);
    });
});

//Mark Todo as Completed
app.get('/todo/completed/:id', authenticate, (req, res) => {
    todo.updateTodoCompleted(req.params.id, req.uid)
    .then((result) => {
        res.send(result);
    }).catch((err) => {
        res.send(err);
    });
});

//Delete Todo
app.delete('/todo/:id', authenticate, (req, res) => {
    todo.deleteTodo(req.params.id, req.uid)
    .then((result) => {
        res.send(result);
    }).catch((err) => {
        res.send(err);
    });
});


//Insert and Login User
app.post('/user', (req, res) => {
    var body = req.body;
    user.insertUser(body)
    .then((result) => {
        res.header('x-auth', result.data[0].token).send(result);
    }).catch((err) => {
        res.send(err);
    });
});

app.get('/user/me', authenticate, (req, res) => {
    
    res.send({
        data: {
            uid: req.uid,
            email: req.email
        },
        err: 0,
        err_msg: ''
    });
});

app.delete('/user/me/token', authenticate, (req, res) => {
    user.logoutUser(req.uid).then((result) => {
        res.send(result);
    }).catch((err) => {
        res.send(err);
    });
});

app.listen(PORT, () => {
    console.log(`Server started on port ${PORT}`);
});