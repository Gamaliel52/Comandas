const bcrypt = require('bcrypt');

const password = '123456';

const hashedPassword = bcrypt.hashSync(password, 10);

console.log(`Contraseña original: ${password}`);
console.log(`Contraseña hasheada: ${hashedPassword}`);