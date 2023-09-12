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
app.post('/auth', (req, res) => {
    let username = req.body.username
    let password = req.body.password 

    if (username && password) {
        connection.query('SELECT * FROM accounts WHERE username = ? AND password = ?', [username, password], (error, results, fields) => {
            if (error) throw error;
            if (results.length > 0) {
                req.session.loggedin = true;
                req.session.username = username;

                res.redirect('/home');
            } else {
                res.send('Incorrect Username and/or Password');
            }
            res.end();
        })
    } else {
        res.send('please enter Username and password');
        res.end();
    }
});
app.get('/home', (req, res) => {

    if (req.session.loggedin) {
        res.send('welcome back, ' + req.session.username + ' ! ');
    } else {
        res.send('Please login to view this page!')
    }
    res.end()
})
app.listen(3000);