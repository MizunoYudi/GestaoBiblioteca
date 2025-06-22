"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.EmprestimoController = void 0;
const EmprestimoService_1 = require("../service/EmprestimoService");
const emprestimoService = new EmprestimoService_1.EmprestimoService();
class EmprestimoController {
    novoEmprestimo(req, res) {
        try {
            const novoEmprestimo = emprestimoService.cadastrarEmprestimo(req.body);
            res.status(201).json({
                mensagem: "Emprestimo cadastrado com sucesso!",
                emprestimo: novoEmprestimo
            });
        }
        catch (e) {
            res.status(400).json({ Status: "Error", mensagem: e.message });
        }
    }
    exibirEmprestimos(req, res) {
        try {
            const emprestimos = emprestimoService.listarEmprestimos();
            res.status(200).json({
                emprestimos
            });
        }
        catch (e) {
            res.status(400).json({ Status: "Error", mensagem: e.message });
        }
    }
    atualizarEmprestimo(req, res) {
        try {
            const id = parseInt(req.params.id);
            emprestimoService.atualizarEmprestimo(id);
            res.status(200).json({
                mensagem: "Emprestimo retornado!"
            });
        }
        catch (e) {
            res.status(400).json({ Status: "Error", mensagem: e.message });
        }
    }
}
exports.EmprestimoController = EmprestimoController;
