const express = require('express');
const bodyParser = require('body-parser');
const cors = require('cors');
const app = express();
const mysql = require('mysql');

const db = mysql.createPool({
    host: "localhost",
    user: "root",
    password: "Password",
    database: "tododatabase",
});

app.use(cors());
app.use(express.json());
app.use(bodyParser.urlencoded({ extended: true }));

app.get('/api/get', (req, res) => {

    const sqlSelect = "SELECT * FROM todo_table";
    db.query(sqlSelect, (err, result) => {
        res.send(result);
    })
});

app.post('/api/insert', (req, res) => {
    const todoName = req.body.todoName;

    const sqlInsert = "INSERT INTO todo_table (todoName) VALUES (?)";
    db.query(sqlInsert, todoName, (err, result) => {
        console.log(result);
    })
});

app.delete("/api/delete/:todoName", (req, res) => {
    const name = req.params.todoName;
    const id = req.body.id;
    const sqlDelete =
        "DELETE FROM todo_table WHERE id = ?";
    db.query(sqlDelete, [name,id], (err, result) => {
        if (err) console.log(err);
    });
});

app.put("/api/update", (req, res) => {
    const name = req.body.newTodo;
    const id = req.body.id;
    const sqlUpdate =
        "UPDATE todo_table SET todoName = ? WHERE id = ?";
    db.query(sqlUpdate, [name,id], (err, result) => {
        if (err) console.log(err);
    });
});


app.listen(3001, () => {
    console.log("running the server on port 3001");
})