const mysql = require('mysql');
const express = require('express');
const session = require('express-session');
const path = require('path');

const connection = mysql.createConnection({
    host: 'localhost',
    usser: 'root',
    password: 'Cadeira12345',
    database: 'nodelogin'
});

const app = express(); //server-side-web

app.use(session({
    secret: 'secret',
    resave: true,
    saveUninitialized: true
}))
app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(express.static(path.join(__dirname, 'static')));

app.get('/', (req,res) => {
    //render login template
    res.sendFile(path.join(__dirname + '/login.html'))
})
app.listen(3000);