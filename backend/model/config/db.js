const mysql = require("mysql2/promise"); // Usa el módulo de Promesas
// Crear la conexión a la base de datos
const connection = mysql.createPool({
  host: "localhost", // Dirección del servidor
  user: "root", // Usuario de MySQL
  password: "", // Contraseña de MySQL
  waitForConnections: true,
  connectionLimit: 10,
  queueLimit: 0,
});
// Exportar la conexión para usarla en otras partes del proyecto
module.exports = connection;
