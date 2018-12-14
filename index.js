const express = require('express');
const bodyparser = require('body-parser');
const todo = require('./models/todo.js');

var app = express();
app.use(bodyparser.json());

app.post('/todo', (req, res) => {
    var body = req.body;
    todo.insertTodo(body)
    .then((result) => {
        res.send(result);
    }).catch((err) => {
        res.send(err);
    });
});

app.get('/todo', (req, res) => {
    todo.getAllTodo()
    .then((result) => {
        res.send(result);
    }).catch((err) => {
        res.send(err);
    }); 
});

app.get('/todo/:id', (req, res) => {
    todo.getTodoById(req.params.id)
    .then((result) => {
        res.send(result);
    }).catch((err) => {
        res.send(err);
    }); 
});

app.listen(3000, () => {
    console.log(`Server started on port 3000`);
});