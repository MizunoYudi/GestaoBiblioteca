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
        const { id, usuario_id, estoque_id, data_emprestimo } = empData;

        if (!id || !usuario_id || !estoque_id || !data_emprestimo) {
            throw new Error("Informações incompletas para o cadastro do emprestimo");
        }

        const usuario = this.usuarioRepository.buscarUsuarioId(usuario_id.id);
        const devolucao = this.calcularDevolucao(usuario.categoria_id, estoque_id);

        const novoEmprestimo = new Emprestimo(parseInt(id), parseInt(usuario_id), parseInt(estoque_id), data_emprestimo, devolucao, new Date(), 0, new Date());
        this.emprestimoRepository.inserirEmprestimo(novoEmprestimo);
        return novoEmprestimo;
    }

    listarEmprestimos() {
        const emprestimos = this.emprestimoRepository.buscarEmprestimos();
        return emprestimos;
    }

    atualizarEmprestimo(id: number) {
        const emp = this.emprestimoRepository.buscarEmprestimoId(id);
        const data = new Date();
        const atraso = this.calcularAtraso(emp);

        this.emprestimoRepository.registrarDevolucao(data, atraso.dias, atraso.data, id);
    }

    calcularDevolucao(categoria_usuario: number, estoque_id: number): Date{
        const data_devolucao = new Date();
        const permissoes = this.permissoesEmprestimo(categoria_usuario, estoque_id);
        data_devolucao.setDate(data_devolucao.getDate() + permissoes.dias);
        return data_devolucao;
    }

    calcularAtraso(emp: Emprestimo) {
        const atraso = { dias: 0, data: new Date() };
        atraso.dias = this.diasAtrasoPorCategoria(emp);
        atraso.data.setDate(atraso.data.getDate() + atraso.dias);
        return atraso;
    }

    diasAtrasoPorCategoria(emp: Emprestimo) {
        const usuario = this.usuarioRepository.buscarUsuarioId(emp.usuario_id);
        const permissoes = this.permissoesEmprestimo(usuario.categoria_id, emp.estoque_id);
        const data_atual = new Date();
        const dias_atraso = (data_atual.getDate() - emp.data_emprestimo.getDate()) / 1000 * 60 * 60 * 24;
        if(dias_atraso - permissoes.dias > 0){
            return dias_atraso * 3;
        }
        return 0;
    }

    permissoesEmprestimo(categoria_usuario: number, estoque_id: number) {
        const estoque = this.estoqueRepository.buscarPorId(estoque_id);
        const livro = this.livroRepository.buscarLivroId(estoque.livro_id);
        const disponibilidade_emp = { dias: 0, livros: 0 };

        switch (categoria_usuario) {
            case 1:
                disponibilidade_emp.livros = 5;
                disponibilidade_emp.dias = 40;
                break;
            case 2:
                disponibilidade_emp.livros = 3;
                if (this.relacaoCategoriaCursoLivro(categoria_usuario, livro.categoria_id)) {
                    disponibilidade_emp.dias = 30;
                } else {
                    disponibilidade_emp.dias = 15;
                }
                break;
            default:
                // COLOCAR DFEPOIS
        }
        return disponibilidade_emp;
    }

    relacaoCategoriaCursoLivro(categoria_usuario: number, categoria_livro: number): boolean {
        let relacao: boolean = false;

        switch (categoria_usuario) {
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