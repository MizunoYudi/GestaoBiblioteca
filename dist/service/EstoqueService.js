"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.EstoqueService = void 0;
const Estoque_1 = require("../model/Estoque");
const EstoqueRepository_1 = require("../repository/EstoqueRepository");
const EmprestimoService_1 = require("./EmprestimoService");
const LivroService_1 = require("./LivroService");
class EstoqueService {
    estoqueRepository = EstoqueRepository_1.EstoqueRepository.getInstance();
    livroService = new LivroService_1.LivroService();
    emprestimoService = new EmprestimoService_1.EmprestimoService();
    cadastrarExemplar(estoqueData) {
        const { livro_id, quantidade } = estoqueData;
        if (!livro_id || quantidade == undefined) {
            throw new Error("Informações incompletas para o cadastro do exemplar");
        }
        const novoExemplar = new Estoque_1.Estoque(parseInt(livro_id), parseInt(quantidade));
        try {
            if (this.livroService.filtrarPorId(livro_id)) {
                this.estoqueRepository.inserirExemplar(novoExemplar);
                return novoExemplar;
            }
        }
        catch (err) {
            if (err instanceof Error) {
                throw new Error("Livro não encontrado para cadastrar estoque");
            }
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
        const exmp = this.estoqueRepository.buscarPorId(id);
        if (exmp.quantidade == exmp.quantidade_emprestada) {
            throw new Error(`Não é possível atualizar a disponibilidade do estoque: quantidade de exemplares emprestados exedidos. Quantidade total: ${exmp.quantidade}, Quantidade emprestada: ${exmp.quantidade_emprestada}`);
        }
        const exemplar_atualizado = this.estoqueRepository.alterarExemplar(disponivel, id);
        return exemplar_atualizado;
    }
    removerExemplar(id) {
        if (this.emprestimoService.existeEstoqueAtivo(id)) {
            throw new Error("Possui emprestimos pendentes com tais exemplares");
        }
        else {
            this.estoqueRepository.excluirExemplar(id);
        }
    }
}
exports.EstoqueService = EstoqueService;
