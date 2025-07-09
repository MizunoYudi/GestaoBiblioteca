import { Emprestimo } from "../model/Emprestimo";
import { EmprestimoRepository } from "../repository/EmprestimoRepository";
import { EstoqueRepository } from "../repository/EstoqueRepository";
import { LivroRepository } from "../repository/LivroRepository";
import { UsuarioRepository } from "../repository/UsuarioRepository";

export class EmprestimoService {
    private emprestimoRepository = EmprestimoRepository.getInstance();
    private usuarioRepository = UsuarioRepository.getInstance();
    private livroRepository = LivroRepository.getInstance();
    private estoqueRepository = EstoqueRepository.getInstance();

    cadastrarEmprestimo(empData: any) {
        const { usuario_id, estoque_id } = empData;

        if (!usuario_id || !estoque_id) {
            throw new Error("Informações incompletas para o cadastro do emprestimo");
        }

        const devolucao = this.calcularDevolucao(usuario_id, estoque_id, new Date());
        const novoEmprestimo = new Emprestimo(parseInt(usuario_id), parseInt(estoque_id), new Date(), devolucao);

        if (this.validarEmprestimo(usuario_id, estoque_id)) {
            this.emprestarEstoque(estoque_id);
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
        const data_entrega = new Date();
        const atraso = this.calcularAtraso(emp);
        this.devolverEstoque(emp.estoque_id);

        this.emprestimoRepository.registrarDevolucao(data_entrega, atraso.dias, atraso.data, id);
    }

    atualizarStatusUsuarios(){
        setInterval(()=>{
            const usuarios = this.usuarioRepository.buscarUsuarios();
            for(const u of usuarios){
                const emprestimos = this.obterEmprestimosUsuario(u.id).filter(e => new Date() > e.data_devolucao);
                for(const e of emprestimos){
                    const data_suspensao = this.calcularAtraso(e);
                    e.dias_atraso = data_suspensao.dias
                    e.suspensao_ate = data_suspensao.data;
                    if(data_suspensao.dias_suspensao > 60){
                        u.ativo = "inativo";
                    } else {
                        u.ativo = "suspenso";
                    }
                }
            }
        }, 500);
    }

    emprestarEstoque(estoque_id: number) {
        const estoque = this.estoqueRepository.buscarPorId(estoque_id);
        if (estoque.quantidade_emprestada != estoque.quantidade) {
            estoque.quantidade_emprestada += 1;
            if (estoque.quantidade_emprestada == estoque.quantidade) {
                estoque.disponivel = false;
            }
        }
    }

    devolverEstoque(estoque_id: number){
        const estoque = this.estoqueRepository.buscarPorId(estoque_id);
        estoque.quantidade_emprestada -= 1;
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
            throw new Error(`O usuário não está permitido a realizar empréstimos. Status: ${usuario.ativo}`);
        }
    }

    verificarLimiteLivros(usuario_id: number, estoque_id: number) {
        const usuario = this.usuarioRepository.buscarUsuarioId(usuario_id);
        const emp_usuario = this.emprestimoRepository.buscarEmprestimos().filter(e => e.usuario_id == usuario.id);
        const permissoes = this.permissoesEmprestimo(usuario_id, estoque_id);
        const emp_ativo = emp_usuario.filter(e => e.data_entrega == undefined);
        if (emp_ativo.length + 1 > permissoes.livros) {
            throw new Error(`Usuário está no limite de livros emprestados. Quantidade permitida: ${permissoes.livros}. Quantidade emprestada: ${emp_usuario.length}`);
        }
    }

    verificarLivrosSuspensos(usuario_id: number) {
        const emp_usuario = this.obterEmprestimosUsuario(usuario_id);
        const dias_atraso = emp_usuario.map(e => e.dias_atraso);
        const maior_atraso = Math.max(...dias_atraso);
        const data_suspensao = new Date();
        data_suspensao.setDate(data_suspensao.getDate() + maior_atraso)
        if (emp_usuario.filter(e => e.dias_atraso > 0).length > 0) {
            throw new Error(`Usuário está suspenso até ${data_suspensao}`);
        }
    }

    validarEmprestimo(usuario_id: number, estoque_id: number): boolean { 
        this.verificarUsuarioAtivo(usuario_id);
        this.verificarEstoque(estoque_id);
        this.verificarLimiteLivros(usuario_id, estoque_id);
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
        const permissoes = this.permissoesEmprestimo(emp.usuario_id, emp.estoque_id);
        atraso.dias_suspensao = this.diasAtrasoPorCategoria(emp);
        atraso.dias = Math.floor((atraso.data.getTime() - data.getTime()) / (1000 * 60 * 60 * 24));
        if(atraso.dias <= permissoes.dias){
            atraso.dias = 0; 
        }
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