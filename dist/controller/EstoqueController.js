"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.EstoqueController = void 0;
const EstoqueService_1 = require("../service/EstoqueService");
const estoqueService = new EstoqueService_1.EstoqueService();
class EstoqueController {
    novoExemplar(req, res) {
        try {
            const novoExemplar = estoqueService.cadastrarExemplar(req.body);
            res.status(201).json({
                mensagem: "Exemplar cadastrado!",
                Exemplar: novoExemplar
            });
        }
        catch (e) {
            res.status(400).json({ Status: "Error", mensagem: e.message });
        }
    }
    exibirExemplares(req, res) {
        try {
            const exemplares = estoqueService.listarExemplares();
            res.status(200).json({
                exemplares
            });
        }
        catch (e) {
            res.status(400).json({ Status: "Error", mensagem: e.message });
        }
    }
    filtrarExemplarPorId(req, res) {
        try {
            const id = parseInt(req.params.id);
            const exemplar = estoqueService.filtrarPorId(id);
            res.status(200).json({
                mensagem: "Exemplar encontrado!",
                exemplar: exemplar
            });
        }
        catch (e) {
            res.status(400).json({ Status: "Error", mensagem: e.message });
        }
    }
    atualizarDiponibilidade(req, res) {
        try {
            const id = parseInt(req.params.id);
            const exemplar = estoqueService.atualizarDisponibilidade(req.body.disponivel, id);
            if (typeof req.body.disponivel == 'undefined') {
                res.status(401).json({
                    Status: "Error",
                    mensagem: "Insira a disponibilidade para poder altera-la"
                });
            }
            res.status(200).json({
                mensagem: "Disponivilidade do exemplar atualizada com sucesso!",
                exemplar: exemplar
            });
        }
        catch (e) {
            res.status(400).json({ Status: "Error", mensagem: e.message });
        }
    }
    apagarExemplar(req, res) {
        try {
            const id = parseInt(req.params.id);
            estoqueService.removerExemplar(id);
            res.status(200).json({
                mensagem: "Exemplar removido com sucesso!"
            });
        }
        catch (e) {
            res.status(400).json({ Status: "Error", mensagem: e.message });
        }
    }
}
exports.EstoqueController = EstoqueController;
