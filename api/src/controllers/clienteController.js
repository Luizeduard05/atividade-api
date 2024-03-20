const clienteModel = require('../models/ClienteModel')

const clienteController = {

    selecionarTodosClientes: async (req, res) => {
        try {
            const clientes = await clienteModel.selecionaTodosClientes();
            return res.json(clientes);

        } catch (error) {
            throw error
        }

    },

    selecionarUmCliente: async (req, res) => {
        try {
            console.log("teste")
            const { nome } = req.params;
            const cliente = await clienteModel.selectOneCliente(nome);
            return res.json(cliente)

        } catch (error) {
            throw error
        }
    },

    adicionarCliente: async (req, res) => {
        try {
            const { nome, tel_cel, tel_fixo, email } = req.body;
            console.log(nome, tel_cel, tel_fixo, email);
            const result = await clienteModel.insertCliente({ nome: nome, tel_cel: tel_cel, tel_fixo: tel_fixo, email: email });
            console.log(result);
            return res.json(result);

        } catch (error) {
            throw error
        }
    },

    alterarCliente: async (req, res) => {
        try {
            const { id } = req.params;
            const { nome, tel_cel, tel_fixo, email } = req.body;

            const result = await clienteModel.updateCliente(id, { nome: nome, tel_cel: tel_cel, tel_fixo: tel_fixo, email: email });
            console.log(result);
            return res.json(result);

        } catch (error) {
            return res.json(error);
        }
    },
    deletarCliente: async (req, res) => {
        try {
            const { id } = req.params;
            var result = await clienteModel.deleteCliente(id);
            console.log(result);
            return res.json(result)

        } catch (error) {
            throw error
        }
    }
};


module.exports = clienteController