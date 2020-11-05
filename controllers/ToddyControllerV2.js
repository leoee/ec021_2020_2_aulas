const Toddy = require("../models/Toddy");

module.exports = {
    create: async (req, res) => {
        console.log("Executando rota POST");
        let { lote, conteudo, validade } = req.body;

        try {
            let resposta = await Toddy.create({ lote, conteudo, validade });

            return res.json(201, resposta);
        } catch (error) {
            return res.json(400, { error: "Erro ao criar Toddy" });
        }
    },
    update: async (req, res) => {
        console.log("Executando rota PATCH");
        let { id } = req.params;
        let { lote, conteudo, validade } = req.body;

        try {
            const resposta = await Toddy.findByIdAndUpdate(
                id,
                {
                    lote,
                    conteudo,
                    validade,
                },
                { new: true }
            );

            if (!resposta) {
                return res.json(404, { error: "Toddy não encontrado" });
            }

            return res.json(200, resposta);
        } catch (error) {
            return res.json(500, { error: "Erro ao atualizar Toddy" });
        }
    },
    search: async (req, res) => {
        console.log("Executando rota GET");
        let { id } = req.query;

        let resposta;
        if (id) {
            // Buscar por id
            try {
                resposta = await Toddy.findById(id);

                if (!resposta) {
                return res.json(404, { error: "Toddy não encontrado" });
                }
            } catch (error) {
                return res.json(500, { error: error });
            }
        } else {
            // Buscar todos
            try {
                resposta = await Toddy.find({});

            } catch (error) {
                return res.json(500, { error: error });
            }
        }

        return res.json(200, resposta);
    },
    remove: async (req, res) => {
        console.log("Executando rota DELETE");
        let { id } = req.params;

        try {
            const resposta = await Toddy.findByIdAndRemove(id);

            if (!resposta) {
                return res.send(404, { error: "Toddy não encontrado" });
            }
            return res.send(200, resposta);
        } catch (error) {
            return res.json(500, { error: error });
        }
    },
};