const express = require('express');
const bodyparser = require('body-parser');
const todo = require('./models/todo.js');

var app = express();
app.use(bodyparser.json());

//Add new todo
app.post('/todo', (req, res) => {
    var body = req.body;
    todo.insertTodo(body)
    .then((result) => {
        res.send(result);
    }).catch((err) => {
        res.send(err);
    });
});

//Get all todo's that are not completed
app.get('/todo', (req, res) => {
    todo.getAllTodo()
    .then((result) => {
        res.send(result);
    }).catch((err) => {
        res.send(err);
    }); 
});

//Get All Completed Todo
app.get('/todo/completed', (req, res) => {
    todo.getAllCompletedTodo()
    .then((result) => {
        res.send(result);
    }).catch((err) => {
        res.send(err);
    }); 
});

//Get todo by ID
app.get('/todo/:id', (req, res) => {
    todo.getTodoById(req.params.id)
    .then((result) => {
        res.send(result);
    }).catch((err) => {
        res.send(err);
    }); 
});

//Update Todo Text
app.post('/todo/text/:id', (req, res) => {
    var body = req.body;
    todo.updateTodo(body.text, req.params.id)
    .then((result) => {
        res.send(result);
    }).catch((err) => {
        res.send(err);
    });
});

//Mark Todo as Completed
app.get('/todo/completed/:id', (req, res) => {
    todo.updateTodoCompleted(req.params.id)
    .then((result) => {
        res.send(result);
    }).catch((err) => {
        res.send(err);
    });
});

//Delete Todo
app.delete('/todo/:id', (req, res) => {
    todo.deleteTodo(req.params.id)
    .then((result) => {
        res.send(result);
    }).catch((err) => {
        res.send(err);
    });
});

app.listen(3000, () => {
    console.log(`Server started on port 3000`);
});