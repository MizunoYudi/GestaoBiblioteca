"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.EstoqueService = void 0;
const Estoque_1 = require("../model/Estoque");
const EmprestimoRepository_1 = require("../repository/EmprestimoRepository");
const EstoqueRepository_1 = require("../repository/EstoqueRepository");
const LivroRepository_1 = require("../repository/LivroRepository");
class EstoqueService {
    estoqueRepository = EstoqueRepository_1.EstoqueRepository.getInstance();
    livroRepository = LivroRepository_1.LivroRepository.getInstance();
    emprestimoRepository = EmprestimoRepository_1.EmprestimoRepository.getInstance();
    cadastrarExemplar(estoqueData) {
        const { id, livro_id, quantidade, quantidade_emprestada } = estoqueData;
        if (!id || !livro_id || !quantidade) {
            throw new Error("Informações incompletas para o cadastro do exemplar");
        }
        const novoExemplar = new Estoque_1.Estoque(parseInt(id), parseInt(livro_id), parseInt(quantidade), parseInt(quantidade_emprestada), true);
        if (this.livroRepository.buscarLivroId(livro_id)) {
            this.estoqueRepository.inserirExemplar(novoExemplar);
            return novoExemplar;
        }
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
        if (this.verificarEmprestimo(id)) {
            throw new Error("Possui emprestimos pendentes com tais exemplares");
        }
        else {
            this.estoqueRepository.excluirExemplar(id);
        }
    }
    verificarEmprestimo(estoque_id) {
        if (this.emprestimoRepository.buscarEstoqueEmprestimo(estoque_id)) {
            return true;
        }
        else {
            return false;
        }
    }
}
exports.EstoqueService = EstoqueService;
