import express from "express";

import { createPool } from "mysql2/promise";

const pool = createPool({
  user: "root",

  password: "9dTsyCl5Ptc5pGENo79T",

  host: "containers-us-west-120.railway.app",

  port: 7928,

  database: "railway",
});

const app = express();

app.get("/", (req, res) => {
  res.send("Bienvenido a este servidor..");
});

app.get("/usuarios", async (req, res) => {
  const [result] = await pool.query("select * from usuario");

  res.json(result);
});

app.post("/agregarusuario", async (req, res) => {
  const { nombre, contrasena, correo, tienda } = req.body;

  const [result] = await pool.query(
    `INSERT INTO usuario (nombre, contrasena, correo, tienda) VALUES ('${nombre}', '${contrasena}', '${correo}','${tienda}')`
  );

  res.json(result);
});

app.listen(process.env.PORT || 3000);

console.log("Servidor corriendo en el puerto 3000");
