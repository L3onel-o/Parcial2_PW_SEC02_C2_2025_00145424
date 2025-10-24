const express = require("express");
const cuentasRoutes = require("./routes/cuentasRoutes");

const app = express();
app.use(express.json());
app.use("/", cuentasRoutes);

const PORT = 3130; // requerido por el examen
app.listen(PORT, () => {
  console.log(`Servidor corriendo en http://localhost:${PORT}`);
});
