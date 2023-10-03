const express = require('express');
const server = express();
const port = 3000;
const mysql = require('mysql');
const cors = require('cors');

server.use(express.json());
server.use(express.urlencoded({extended: true}));
server.use(cors({ origin: true, credentials: true}));

server.get('/', (req, res) => res.send('Hello world!'));

var database = mysql.createConnection({
    host: 'localhost',
    user: 'root',
    password: 'we$%^789',
    database: 'mydb'
});
database.connect(err => {
    if (err) throw err;
    console.log('MySQL Connected');
    server.listen(3001, 'localhost'); 
    console.log('mySql Connected'); 
    server.on('listening', function() {
        console.log('Express server started on port %s at %s', server.address().port, server.address().address);
    })
});

server.get('/get-movies', (req, res) => {
    //this can change for the search function bar
    sql = 'SELECT * FROM movies';
    
    connection.query(sql, (err, result) => {
        if(err) throw err;
        console.log(result);
        res.send('movie received.');
    });
});