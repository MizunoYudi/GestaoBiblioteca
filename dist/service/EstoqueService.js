"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.EstoqueService = void 0;
const Estoque_1 = require("../model/Estoque");
const EstoqueRepository_1 = require("../repository/EstoqueRepository");
class EstoqueService {
    estoqueRepository = EstoqueRepository_1.EstoqueRepository.getInstance();
    cadastrarExemplar(estoqueData) {
        const { id, livro_id, quantidade, quantidade_emprestada } = estoqueData;
        if (!id || !livro_id || !quantidade || !quantidade_emprestada) {
            throw new Error("Informações incompletas para o cadastro do exemplar");
        }
        const novoExemplar = new Estoque_1.Estoque(parseInt(id), parseInt(livro_id), parseInt(quantidade), parseInt(quantidade_emprestada), true);
        this.estoqueRepository.inserirExemplar(novoExemplar);
        return novoExemplar;
    }
    listarExemplares() {
        const exemplares = this.estoqueRepository.buscarExemplares();
        return exemplares.filter(e => e.disponivel == true);
    }
    filtrarPorId(id) {
        const exemplar = this.estoqueRepository.buscarPorId(id);
        return exemplar;
    }
    atualizarDisponibilidade(disponivel, id) {
        const exemplar = this.estoqueRepository.alterarExemplar(disponivel, id);
        return exemplar;
    }
    removerExemplar(id) {
        this.estoqueRepository.excluirExemplar(id);
    }
}
exports.EstoqueService = EstoqueService;
