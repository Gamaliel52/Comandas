const express = require('express');
const bcrypt = require('bcrypt');
const { verificarRol, verificarAutenticacion, accesoPublico } = require('../middlewares/auth');
const router = express.Router();

router.get('/', (req, res) => {
    res.render('inicio');
});

router.get('/pedidos', verificarAutenticacion, (req, res) => {
    const sqlMesas = 'SELECT DISTINCT mesa FROM comandas';
    const sqlMeseros = 'SELECT DISTINCT mesero FROM comandas';
    const sqlComandas = 'SELECT * FROM comandas ORDER BY hora DESC';

    req.db.query(sqlMesas, (err, mesasResults) => {
        if (err) throw err;

        req.db.query(sqlMeseros, (err, meserosResults) => {
            if (err) throw err;

            req.db.query(sqlComandas, (err, comandasResults) => {
                if (err) throw err;

                comandasResults.forEach(comanda => {
                    comanda.platillos = JSON.parse(comanda.platillos)
                        .map(item => `${item.nombre} x${item.cantidad}`)
                        .join(', ');

                    const fecha = new Date(comanda.hora);
                    comanda.hora = fecha.toLocaleString('es-MX', {
                        dateStyle: 'short',
                        timeStyle: 'short',
                        hour12: true
                    });
                });

                res.render('pedidos', {
                    mesas: mesasResults,
                    meseros: meserosResults,
                    comandas: comandasResults,
                    user: req.session.user
                });
            });
        });
    });
});

router.get('/pedidos/buscar', verificarAutenticacion, (req, res) => {
    const { mesa, mesero } = req.query;
    let sql = 'SELECT * FROM comandas WHERE 1=1';
    const params = [];

    if (mesa) {
        sql += ' AND mesa = ?';
        params.push(mesa);
    }

    if (mesero) {
        sql += ' AND mesero = ?';
        params.push(mesero);
    }

    req.db.query(sql, params, (err, results) => {
        if (err) throw err;

        const sqlMesas = 'SELECT DISTINCT mesa FROM comandas';
        const sqlMeseros = 'SELECT DISTINCT mesero FROM comandas';

        req.db.query(sqlMesas, (err, mesasResults) => {
            if (err) throw err;

            req.db.query(sqlMeseros, (err, meserosResults) => {
                if (err) throw err;

                results.forEach(comanda => {
                    comanda.platillos = JSON.parse(comanda.platillos)
                        .map(item => `${item.nombre} x${item.cantidad}`)
                        .join(', ');

                    const fecha = new Date(comanda.hora);
                    comanda.hora = fecha.toLocaleString('es-MX', {
                        dateStyle: 'short',
                        timeStyle: 'short',
                        hour12: true
                    });
                });

                res.render('pedidos', {
                    mesas: mesasResults,
                    meseros: meserosResults,
                    comandas: results,
                    user: req.session.user
                });
            });
        });
    });
});

router.get('/menu', verificarAutenticacion, (req, res) => {
    const sql = 'SELECT * FROM menu';
    req.db.query(sql, (err, results) => {
        if (err) throw err;
        res.render('menu', { menu: results, user: req.session.user });
    });
});

router.post('/menu/agregar', (req, res) => {
    const { nombre, descripcion, precio, categoria } = req.body;
    const sql = 'INSERT INTO menu (nombre, descripcion, precio, categoria) VALUES (?, ?, ?, ?)';
    req.db.query(sql, [nombre, descripcion, precio, categoria], (err) => {
        if (err) throw err;
        res.redirect('/menu');
    });
});

router.get('/menu/eliminar/:id', (req, res) => {
    const { id } = req.params;
    const sql = 'DELETE FROM menu WHERE id = ?';
    req.db.query(sql, [id], (err) => {
        if (err) throw err;
        res.redirect('/menu');
    });
});

router.get('/menu/editar/:id', (req, res) => {
    const { id } = req.params;
    const sql = 'SELECT * FROM menu WHERE id = ?';
    req.db.query(sql, [id], (err, results) => {
        if (err) throw err;
        if (results.length === 0) {
            return res.status(404).send('Elemento no encontrado');
        }
        res.render('editarMenu', { item: results[0] });
    });
});

router.post('/menu/editar/:id', (req, res) => {
    const { id } = req.params;
    const { nombre, descripcion, precio, categoria } = req.body;
    const sql = 'UPDATE menu SET nombre = ?, descripcion = ?, precio = ?, categoria = ? WHERE id = ?';
    req.db.query(sql, [nombre, descripcion, precio, categoria, id], (err) => {
        if (err) throw err;
        res.redirect('/menu');
    });
});

router.post('/pedidos', (req, res) => {
    const { mesa, mesero, platillos, bebidas, observaciones } = req.body;

    const items = [
        ...platillos.map(id => ({ id, tipo: 'Platillo' })),
        ...bebidas.map(id => ({ id, tipo: 'Bebida' }))
    ];

    const sql = 'INSERT INTO comandas (mesa, mesero, platillos, observaciones) VALUES (?, ?, ?, ?)';
    req.db.query(sql, [mesa, mesero, JSON.stringify(items), observaciones], (err) => {
        if (err) throw err;
        res.redirect('/pedidos');
    });
});

router.get('/ordenar', accesoPublico, (req, res) => {
    const sqlMesas = 'SELECT DISTINCT mesa FROM comandas';
    const sqlMeseros = 'SELECT DISTINCT mesero FROM comandas';
    const sqlMenu = 'SELECT * FROM menu';

    req.db.query(sqlMesas, (err, mesasResults) => {
        if (err) throw err;

        req.db.query(sqlMeseros, (err, meserosResults) => {
            if (err) throw err;

            const meseroAleatorio = meserosResults.length > 0
                ? meserosResults[Math.floor(Math.random() * meserosResults.length)].mesero
                : 'Sin mesero disponible';

            req.db.query(sqlMenu, (err, menuResults) => {
                if (err) throw err;

                res.render('ordenar', {
                    mesas: mesasResults,
                    meseroAleatorio,
                    menu: menuResults
                });
            });
        });
    });
});

router.post('/ordenar/enviar', (req, res) => {
    const { mesa, mesero, orden, observaciones } = req.body;

    if (!mesa || !mesero || !orden) {
        return res.status(400).json({ message: 'Faltan datos obligatorios' });
    }

    const sql = 'INSERT INTO comandas (mesa, mesero, platillos, observaciones, hora) VALUES (?, ?, ?, ?, NOW())';

    req.db.query(sql, [mesa, mesero, JSON.stringify(orden), observaciones], (err) => {
        if (err) {
            console.error('Error al guardar la orden:', err);
            return res.status(500).json({ message: 'Error al guardar la orden' });
        }
        res.json({ message: 'Orden tomada con éxito' });
    });
});

router.get('/login', (req, res) => {
    res.render('login');
});

router.post('/login', (req, res) => {
    const { username, password } = req.body;
    const sql = 'SELECT * FROM usuarios WHERE username = ?';
    req.db.query(sql, [username], (err, results) => {
        if (err) throw err;
        if (results.length > 0) {
            const user = results[0];
            if (bcrypt.compareSync(password, user.password)) {
                req.session.user = { id: user.id, rol: user.rol };
                res.redirect('/pedidos');
            } else {
                res.render('login', { error: 'Contraseña incorrecta' });
            }
        } else {
            res.render('login', { error: 'Usuario no encontrado' });
        }
    });
});

router.get('/logout', (req, res) => {
    req.session.destroy();
    res.redirect('/');
});

module.exports = router;