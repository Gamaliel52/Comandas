const bcrypt = require('bcrypt');

// Hash almacenado en la base de datos
const storedHash = '$2b$10$9A/w2e04poOFTmsvTd3kL.xmuCes4TS6ccGYf35CdFIHqp4VwN5a.';

// Contraseña ingresada por el usuario
const inputPassword = '123456';

// Comparar la contraseña ingresada con el hash
if (bcrypt.compareSync(inputPassword, storedHash)) {
    console.log('Contraseña correcta');
} else {
    console.log('Contraseña incorrecta');
}