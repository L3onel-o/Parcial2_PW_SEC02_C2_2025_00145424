const cuentas = require("../data/cuentas");

// GET cuentas  -> { count, data }
function getCuentas(req, res) {
  return res.json({ count: cuentas.length, data: cuentas });
}

// GET cuenta/:id -> { finded, account }
function getCuentaById(req, res) {
  const id = Number(req.params.id);
  const account = cuentas.find(c => c.id === id);
  if (!account) return res.json({ finded: false, account: null });
  return res.json({ finded: true, account });
}

// GET cuentas?
function searchCuentas(req, res) {
  const { queryParam } = req.query;
  if (!queryParam || String(queryParam).trim() === "") return getCuentas(req, res);

  const q = String(queryParam).trim().toLowerCase();

  // id exacto
  const idNum = Number(q);
  const isNumeric = !Number.isNaN(idNum) && /^[0-9]+$/.test(q);
  if (isNumeric) {
    const account = cuentas.find(c => c.id === idNum);
    return account ? res.json({ finded: true, account }) : res.json({ finded: false });
  }

  // nombre contiene q o género igual q
  const matches = cuentas.filter(c =>
    c.name.toLowerCase().includes(q) || c.gender.toLowerCase() === q
  );
  if (matches.length === 0) return res.json({ finded: false });
  if (matches.length === 1) return res.json({ finded: true, account: matches[0] });
  return res.json({ finded: true, data: matches });
}

// GET cuentasBalance 
function getCuentasBalance(req, res) {
  const activos = cuentas.filter(c => c.isActive === true);
  if (activos.length === 0) return res.json({ status: false, accountBalance: 0 });
  const total = activos.reduce((acc, c) => acc + Number(c.balance || 0), 0);
  return res.json({ status: true, accountBalance: Number(total.toFixed(2)) });
}

module.exports = {
  getCuentas,
  getCuentaById,
  searchCuentas,
  getCuentasBalance
};
