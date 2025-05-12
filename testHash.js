const bcrypt = require('bcrypt');

const storedHash = '$2b$10$9A/w2e04poOFTmsvTd3kL.xmuCes4TS6ccGYf35CdFIHqp4VwN5a.';

const inputPassword = '123456';

if (bcrypt.compareSync(inputPassword, storedHash)) {
    console.log('Contraseña correcta');
} else {
    console.log('Contraseña incorrecta');
}