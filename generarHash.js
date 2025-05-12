const bcrypt = require('bcrypt');

// Contraseña que deseas hashear
const password = '123456';

// Generar el hash
const hashedPassword = bcrypt.hashSync(password, 10);

// Mostrar el hash en la consola
console.log(`Contraseña original: ${password}`);
console.log(`Contraseña hasheada: ${hashedPassword}`);