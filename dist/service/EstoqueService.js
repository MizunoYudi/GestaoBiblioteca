"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.EstoqueService = void 0;
const EstoqueEntity_1 = require("../model/entity/EstoqueEntity");
const EstoqueRepository_1 = require("../repository/EstoqueRepository");
const EmprestimoService_1 = require("./EmprestimoService");
const LivroService_1 = require("./LivroService");
class EstoqueService {
    estoqueRepository = EstoqueRepository_1.EstoqueRepository.getInstance();
    livroService = new LivroService_1.LivroService();
    emprestimoService = new EmprestimoService_1.EmprestimoService();
    async cadastrarExemplar(estoqueData) {
        const { livro_id, quantidade } = estoqueData;
        if (!livro_id || quantidade == undefined) {
            throw new Error("Informações incompletas para o cadastro do exemplar");
        }
        const novoExemplar = new EstoqueEntity_1.EstoqueEntity(parseInt(livro_id), parseInt(quantidade));
        try {
            if (await this.livroService.filtrarPorId(livro_id)) {
                await this.estoqueRepository.inserirExemplar(novoExemplar);
                return novoExemplar;
            }
        }
        catch (err) {
            if (err instanceof Error) {
                throw new Error("Livro não encontrado para cadastrar estoque");
            }
        }
    }
    async listarExemplares() {
        return await this.estoqueRepository.buscarExemplares();
    }
    async filtrarPorId(id) {
        const exemplar = await this.estoqueRepository.buscarPorId(id);
        return exemplar;
    }
    async atualizarDisponibilidade(disponivel, id) {
        const exmp = await this.estoqueRepository.buscarPorId(id);
        if (exmp.quantidade == exmp.quantidade_emprestada) {
            throw new Error(`Não é possível atualizar a disponibilidade do estoque: quantidade de exemplares emprestados exedidos. Quantidade total: ${exmp.quantidade}, Quantidade emprestada: ${exmp.quantidade_emprestada}`);
        }
        return await this.estoqueRepository.alterarExemplar(disponivel, id);
        ;
    }
    async removerExemplar(id) {
        if (await this.estoqueRepository.existeEmprestimosAtivos(id)) {
            throw new Error("Possui emprestimos pendentes com tais exemplares");
        }
        else {
            await this.estoqueRepository.excluirExemplar(id);
        }
    }
}
exports.EstoqueService = EstoqueService;
