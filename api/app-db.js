const express = require("express");

const clienteRoute = require('./src/routes/clienteRoute')

const app = express();

app.use(express.json());

app.use('/', clienteRoute);


app.listen(3000, () => {
    console.log("Servidor respondendo na porta 3000");
});