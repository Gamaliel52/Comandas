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

// Middleware para procesar JSON
app.use(express.json());

// Middleware para procesar datos codificados en URL (si usas formularios tradicionales)
app.use(express.urlencoded({ extended: true }));

// Configuración de sesiones
app.use(session({
    secret: 'mi_secreto_seguro', // Cambia esto por una cadena segura
    resave: false,
    saveUninitialized: false,
    cookie: { secure: false } // Cambia a true si usas HTTPS
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
app.listen(PORT, '0.0.0.0', () => {
    console.log(`Servidor corriendo en http://0.0.0.0:${PORT}`);
});