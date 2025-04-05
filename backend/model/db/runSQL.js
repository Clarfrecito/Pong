const fs = require("fs");
const path = require("path");
const connection = require("../config/db");
(async () => {
  try {
    // Leer el archivo SQL
    const sql = fs.readFileSync(
      path.join(__dirname, "createDatabase.sql"),
      "utf8"
    );
    // Dividir el archivo SQL en sentencias individuales
    const statements = sql
      .split(";")
      .map((stmt) => stmt.trim())
      .filter((stmt) => stmt);
    // Ejecutar cada sentencia SQL por separado
    for (const statement of statements) {
      await connection.query(statement);
    }
    console.log("Base de datos y tablas creadas exitosamente.");
  } catch (err) {
    console.error("Error al ejecutar el script SQL:", err);
  } finally {
    connection.end(); // Cerrar la conexión
  }
})();
