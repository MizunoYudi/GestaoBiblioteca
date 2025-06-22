"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.EmprestimoService = void 0;
const Emprestimo_1 = require("../model/Emprestimo");
const EmprestimoRepository_1 = require("../repository/EmprestimoRepository");
const EstoqueRepository_1 = require("../repository/EstoqueRepository");
const LivroRepository_1 = require("../repository/LivroRepository");
const UsuarioRepository_1 = require("../repository/UsuarioRepository");
class EmprestimoService {
    emprestimoRepository = EmprestimoRepository_1.EmprestimoRepository.getInstance();
    usuarioRepository = UsuarioRepository_1.UsuarioRepository.getInstance();
    livroRepository = LivroRepository_1.LivroRepository.getInstance();
    estoqueRepository = EstoqueRepository_1.EstoqueRepository.getInstance();
    cadastrarEmprestimo(empData) {
        const { id, usuario_id, estoque_id, data_emprestimo } = empData;
        if (!id || !usuario_id || !estoque_id || !data_emprestimo) {
            throw new Error("Informações incompletas para o cadastro do emprestimo");
        }
        const usuario = this.usuarioRepository.buscarUsuarioId(parseInt(usuario_id));
        const devolucao = this.calcularDevolucao(usuario, estoque_id, new Date(data_emprestimo));
        const novoEmprestimo = new Emprestimo_1.Emprestimo(parseInt(id), parseInt(usuario_id), parseInt(estoque_id), data_emprestimo, devolucao, new Date(), 0, new Date());
        this.emprestimoRepository.inserirEmprestimo(novoEmprestimo);
        return novoEmprestimo;
    }
    listarEmprestimos() {
        const emprestimos = this.emprestimoRepository.buscarEmprestimos();
        return emprestimos;
    }
    atualizarEmprestimo(id) {
        const emp = this.emprestimoRepository.buscarEmprestimoId(id);
        const data = new Date();
        const atraso = this.calcularAtraso(emp);
        this.emprestimoRepository.registrarDevolucao(data, atraso.dias, atraso.data, id);
    }
    calcularDevolucao(usuario, estoque_id, data_emprestimo) {
        const data_devolucao = new Date(data_emprestimo);
        const permissoes = this.permissoesEmprestimo(usuario, estoque_id);
        data_devolucao.setDate(data_emprestimo.getDate() + permissoes.dias);
        console.log(data_devolucao);
        return data_devolucao;
    }
    calcularAtraso(emp) {
        const atraso = { dias: 0, data: new Date() };
        atraso.dias = this.diasAtrasoPorCategoria(emp);
        atraso.data.setDate(atraso.data.getDate() + atraso.dias);
        return atraso;
    }
    diasAtrasoPorCategoria(emp) {
        const usuario = this.usuarioRepository.buscarUsuarioId(emp.usuario_id);
        const permissoes = this.permissoesEmprestimo(usuario, emp.estoque_id);
        const data_atual = new Date();
        const dias_atraso = (data_atual.getDate() - emp.data_emprestimo.getDate()) / 1000 * 60 * 60 * 24;
        if (dias_atraso - permissoes.dias > 0) {
            return dias_atraso * 3;
        }
        return 0;
    }
    permissoesEmprestimo(usuario, estoque_id) {
        const estoque = this.estoqueRepository.buscarPorId(estoque_id);
        const livro = this.livroRepository.buscarLivroId(estoque.livro_id);
        const disponibilidade_emp = { dias: 0, livros: 0 };
        switch (usuario.categoria_id) {
            case 1:
                disponibilidade_emp.livros = 5;
                disponibilidade_emp.dias = 40;
                break;
            case 2:
                disponibilidade_emp.livros = 3;
                if (this.relacaoCategoriaCursoLivro(usuario.curso_id, livro.categoria_id)) {
                    disponibilidade_emp.dias = 30;
                }
                else {
                    disponibilidade_emp.dias = 15;
                }
                break;
            default:
        }
        return disponibilidade_emp;
    }
    relacaoCategoriaCursoLivro(curso, categoria_livro) {
        let relacao = false;
        switch (curso) {
            case 1:
                if (categoria_livro == 2) {
                    relacao = true;
                }
                break;
            case 2:
                if (categoria_livro == 3) {
                    relacao = true;
                }
            case 3:
                if (categoria_livro == 4) {
                    relacao = true;
                }
        }
        return relacao;
    }
}
exports.EmprestimoService = EmprestimoService;
