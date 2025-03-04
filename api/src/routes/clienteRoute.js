const express = require("express");
const router = express.Router();


const clienteController = require("../controllers/clienteController");

router.get("/clientes", clienteController.selecionarTodosClientes);
router.get("/clientes/:nome",  clienteController.selecionarUmCliente);
router.post('/clientes',  clienteController.adicionarCliente);
router.put('/clientes/:id',  clienteController.alterarCliente);
router.delete('/clientes/:id',  clienteController.deletarCliente);

module.exports = router;