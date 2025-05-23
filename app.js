const express = require('express');
const path = require('path');
const mysql = require('mysql2');
const session = require('express-session');
const rutas = require('./rutas/index');

const app = express();

app.set('view engine', 'ejs');
app.set('views', path.join(__dirname, 'views'));
app.use(express.static(path.join(__dirname, 'public')));
app.use('/images', express.static(path.join(__dirname, 'images')));

app.use(express.json());
app.use(express.urlencoded({ extended: true }));

app.use(session({
    secret: 'mi_secreto_seguro',
    resave: false,
    saveUninitialized: false,
    cookie: { secure: false }
}));

const db = mysql.createConnection({
    host: 'localhost',
    user: 'root',
    password: '',
    database: 'restaurante'
});

db.connect((err) => {
    if (err) throw err;
    console.log('Conectado a la base de datos MySQL');
});

app.use((req, res, next) => {
    req.db = db;
    next();
});

app.use('/', rutas);

const PORT = 3000;
app.listen(PORT, 'localhost', () => {
    console.log(`Servidor corriendo en http://localhost:${PORT}`);
});