const express = require("express");
const {
  getCuentas,
  getCuentaById,
  searchCuentas,
  getCuentasBalance
} = require("../controllers/cuentasController");

const router = express.Router();

router.get("/cuentas", searchCuentas);            
router.get("/cuenta/:id", getCuentaById);         
router.get("/cuentasBalance", getCuentasBalance); 

module.exports = router;
