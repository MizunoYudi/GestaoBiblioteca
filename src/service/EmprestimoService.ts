import { Emprestimo } from "../model/Emprestimo";
import { EmprestimoRepository } from "../repository/EmprestimoRepository";
import { EstoqueRepository } from "../repository/EstoqueRepository";
import { LivroRepository } from "../repository/LivroRepository";
import { UsuarioRepository } from "../repository/UsuarioRepository";

export class EmprestimoService {
    emprestimoRepository = EmprestimoRepository.getInstance();
    usuarioRepository = UsuarioRepository.getInstance();
    livroRepository = LivroRepository.getInstance();
    estoqueRepository = EstoqueRepository.getInstance();

    cadastrarEmprestimo(empData: any) {
        const { id, usuario_id, estoque_id, data_emprestimo, data_devolucao } = empData;

        if (!id || !usuario_id || !estoque_id || !data_emprestimo) {
            throw new Error("Informações incompletas para o cadastro do emprestimo");
        }

        const devolucao = this.calcularDevolucao(usuario_id, estoque_id, new Date(data_emprestimo));

        const novoEmprestimo = new Emprestimo(parseInt(id), parseInt(usuario_id), parseInt(estoque_id), data_emprestimo, devolucao, new Date(), 0, new Date());
        if (this.validarEmprestimo(usuario_id, estoque_id, novoEmprestimo)) {
            this.atualizarEstoque(estoque_id);
            this.emprestimoRepository.inserirEmprestimo(novoEmprestimo);
            return novoEmprestimo;
        }
    }

    listarEmprestimos() {
        const emprestimos = this.emprestimoRepository.buscarEmprestimos();
        return emprestimos;
    }

    obterEmprestimosUsuario(usuario_id: number) {
        const emprestimos = this.emprestimoRepository.buscarEmprestimos();
        const emp_usuario = emprestimos.filter(e => e.usuario_id = usuario_id);
        return emp_usuario;
    }

    atualizarEmprestimo(id: number) {
        const emp = this.emprestimoRepository.buscarEmprestimoId(id);
        const data = new Date();
        const atraso = this.calcularAtraso(emp);

        this.emprestimoRepository.registrarDevolucao(data, atraso.dias, atraso.data, id);
        this.atualizarStatusUsuario(emp);
    }

    atualizarStatusUsuario(emp: Emprestimo) {
        const emp_usuario = this.obterEmprestimosUsuario(emp.usuario_id);
        const usuario = this.usuarioRepository.buscarUsuarioId(emp.usuario_id);
        const dias_suspensao = this.calcularAtraso(emp).dias_suspensao;

        if (dias_suspensao > 60) {
            if (emp_usuario.filter(e => e.dias_atraso > 20).length > 2) {
                usuario.ativo = "inativo";
            } else {
                usuario.ativo = "suspenso";
            }
        }
    }

    atualizarEstoque(estoque_id: number) {
        const estoque = this.estoqueRepository.buscarPorId(estoque_id);
        if (estoque.quantidade_emprestada != estoque.quantidade) {
            if (estoque.quantidade_emprestada + 1 == estoque.quantidade) {
                estoque.disponivel = false;
            }
            estoque.quantidade_emprestada += 1;
        }
    }

    verificarEstoque(estoque_id: number) {
        const estoque = this.estoqueRepository.buscarPorId(estoque_id);
        if (!estoque.disponivel) {
            throw new Error(`Não há exemplares disponíveis para emprestimo. Quantidade total: ${estoque.quantidade}, Quantidade emprestada:${estoque.quantidade_emprestada}`);
        }
    }

    verificarUsuarioAtivo(usuario_id: number) {
        const usuario = this.usuarioRepository.buscarUsuarioId(usuario_id);
        if (usuario.ativo != 'ativo') {
            throw new Error(`O usuário não está permitido a realizar empréstimos: ${usuario.ativo}`);
        }
    }

    verificarLimiteLivros(usuario_id: number, estoque_id: number) {
        const usuario = this.usuarioRepository.buscarUsuarioId(usuario_id);
        const emprestimos = this.emprestimoRepository.buscarEmprestimos();
        const permissoes = this.permissoesEmprestimo(usuario_id, estoque_id);
        const emp_usuario = emprestimos.filter(e => e.usuario_id = usuario.id);

        if (emp_usuario.length + 1 > permissoes.livros) {
            throw new Error(`Usuário está no limite de livros emprestados. Quantidade permitida: ${permissoes.livros}. Quantidade emprestada: ${emp_usuario.length}`);
        }
    }

    verificarLivrosSuspensos(usuario_id: number) {
        const emp_usuario = this.obterEmprestimosUsuario(usuario_id);
        if (emp_usuario.filter(e => e.dias_atraso > 20).length > 0) {
            throw new Error("Usuário está de suspensão");
        }
    }

    validarEmprestimo(usuario_id: number, estoque_id: number, emp: Emprestimo): boolean {
        const estoque = this.estoqueRepository.buscarPorId(estoque_id);

        this.verificarUsuarioAtivo(usuario_id);
        this.verificarEstoque(estoque_id);
        this.verificarLimiteLivros(usuario_id, estoque_id);
        this.atualizarStatusUsuario(emp);
        this.verificarLivrosSuspensos(usuario_id);

        return true;
    }

    calcularDevolucao(usuario_id: number, estoque_id: number, data_emprestimo: Date): Date {
        const data_devolucao = new Date(data_emprestimo);
        const permissoes = this.permissoesEmprestimo(usuario_id, estoque_id);
        data_devolucao.setDate(data_emprestimo.getDate() + permissoes.dias);
        return data_devolucao;
    }

    calcularAtraso(emp: Emprestimo) {
        const atraso = { dias: 0, data: new Date(), dias_suspensao: 0 };
        const data = new Date(emp.data_emprestimo);
        atraso.dias_suspensao = this.diasAtrasoPorCategoria(emp);
        atraso.dias = Math.floor((atraso.data.getTime() - data.getTime()) / (1000 * 60 * 60 * 24));
        atraso.data.setDate(atraso.data.getDate() + atraso.dias_suspensao);

        return atraso;
    }

    diasAtrasoPorCategoria(emp: Emprestimo) {
        const permissoes = this.permissoesEmprestimo(emp.usuario_id, emp.estoque_id);
        const data_atual = new Date();
        const data_emp = new Date(emp.data_emprestimo);
        const dias_atraso = Math.floor((data_atual.getTime() - data_emp.getTime()) / (1000 * 60 * 60 * 24));
        if (dias_atraso - permissoes.dias > 0) {
            return (dias_atraso - permissoes.dias) * 3;
        }
        return 0;
    }

    permissoesEmprestimo(usuario_id: number, estoque_id: number) {
        const usuario = this.usuarioRepository.buscarUsuarioId(usuario_id);
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
                } else {
                    disponibilidade_emp.dias = 15;
                }
                break;
        }
        return disponibilidade_emp;
    }

    relacaoCategoriaCursoLivro(curso: number, categoria_livro: number): boolean {
        let relacao: boolean = false;

        switch (curso) {
            case 1:
                if (categoria_livro == 2) {
                    relacao = true
                }
                break;
            case 2:
                if (categoria_livro == 3) {
                    relacao = true
                }
            case 3:
                if (categoria_livro == 4) {
                    relacao = true;
                }
        }
        return relacao;
    }
}