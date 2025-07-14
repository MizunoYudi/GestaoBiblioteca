import { EmprestimoEntity } from "../model/entity/EmprestimoEntity";
import { EmprestimoRepository } from "../repository/EmprestimoRepository";
import { UsuarioRepository } from "../repository/UsuarioRepository";
import { EstoqueService } from "./EstoqueService";
import { LivroService } from "./LivroService";

export class EmprestimoService {
    private emprestimoRepository = EmprestimoRepository.getInstance();
    private livroService = new LivroService();
    private estoqueService = new EstoqueService();

    async cadastrarEmprestimo(empData: any) {
        const { usuario_id, estoque_id } = empData;

        if (!usuario_id || !estoque_id) {
            throw new Error("Informações incompletas para o cadastro do emprestimo");
        }

        const devolucao = await this.calcularDevolucao(usuario_id, estoque_id, new Date());
        const novoEmprestimo = new EmprestimoEntity(parseInt(usuario_id), parseInt(estoque_id), new Date(), devolucao);

        if (this.validarEmprestimo(usuario_id, estoque_id)) {
            this.emprestimoRepository.emprestarEstoque(estoque_id);
            return await this.emprestimoRepository.inserirEmprestimo(novoEmprestimo);
        }
    }

    async listarEmprestimos() {
        const emprestimos = await this.emprestimoRepository.buscarEmprestimos();
        return emprestimos;
    }

    async obterEmprestimosUsuario(usuario_id: number) {
        const emprestimos = await this.emprestimoRepository.buscarEmprestimos();
        const emp_usuario = emprestimos.filter(e => e.usuario_id = usuario_id);
        return emp_usuario;
    }

    async atualizarEmprestimo(id: number) {
        const emp = await this.emprestimoRepository.buscarEmprestimoId(id);
        const data_entrega = new Date();
        const atraso = await this.calcularAtraso(emp);
        this.emprestimoRepository.devolverEstoque(emp.estoque_id);

        return this.emprestimoRepository.registrarDevolucao(data_entrega, atraso.dias, atraso.data, id);
    }

    atualizarStatusUsuarios(){
        setInterval(async ()=>{
            const emprestimos = await this.emprestimoRepository.buscarEmprestimosAtivos();
            for(const e of emprestimos){
                this.aplicarMultaUsuario(e);
                this.aplicarMultaEmprestimo(e);
            }
        }, 360000);
    }

    async aplicarMultaUsuario(emprestimo: EmprestimoEntity){
        const data_suspensao = await this.calcularAtraso(emprestimo);
        if(data_suspensao.dias_suspensao > 60){
            this.emprestimoRepository.atualizarUsuarioMulta("inativo", emprestimo.usuario_id);
        } else {
            this.emprestimoRepository.atualizarUsuarioMulta("suspenso", emprestimo.usuario_id);
        }
    }

    async aplicarMultaEmprestimo(emprestimo: EmprestimoEntity){
        const data_suspensao = await this.calcularAtraso(emprestimo);
        this.emprestimoRepository.atualizarEmprestimoMulta(data_suspensao.dias, data_suspensao.data);
    }

    async verificarEstoque(estoque_id: number) {
        const estoque = await this.estoqueService.filtrarPorId(estoque_id);
        if (!estoque.disponivel) {
            throw new Error(`Não há exemplares disponíveis para emprestimo. Quantidade total: ${estoque.quantidade}, Quantidade emprestada:${estoque.quantidade_emprestada}`);
        }
    }

    /*async verificarLivroEmprestimo(livro_id: number){
        const estoque = this.estoqueService.listarExemplares().findIndex(e => e.livro_id = livro_id)
        if(estoque != -1){
            return true;
        } else {
            return false;
        }
    }*/

    async verificarUsuarioAtivo(usuario_id: number) {
        const usuario = await this.emprestimoRepository.buscarUsuarioEmprestimo(usuario_id);
        if (usuario.status != 'ativo') {
            throw new Error(`O usuário não está permitido a realizar empréstimos. Status: ${usuario.status}`);
        }
    }

    async verificarLimiteLivros(usuario_id: number, estoque_id: number) {
        const usuario = await this.emprestimoRepository.buscarUsuarioEmprestimo(usuario_id)
        const emp_usuario = (await this.emprestimoRepository.buscarEmprestimos()).filter(e => e.usuario_id == usuario.id);
        const permissoes = await this.permissoesEmprestimo(usuario_id, estoque_id);
        const emp_ativo = emp_usuario.filter(e => e.data_entrega == undefined);
        if (emp_ativo.length + 1 > permissoes.livros) {
            throw new Error(`Usuário está no limite de livros emprestados. Quantidade permitida: ${permissoes.livros}. Quantidade emprestada: ${emp_usuario.length}`);
        }
    }

    async verificarLivrosSuspensos(usuario_id: number) {
        const emp_usuario = await this.obterEmprestimosUsuario(usuario_id);
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

    async calcularDevolucao(usuario_id: number, estoque_id: number, data_emprestimo: Date): Promise<Date> {
        const data_devolucao = new Date(data_emprestimo);
        const permissoes = await this.permissoesEmprestimo(usuario_id, estoque_id);
        data_devolucao.setDate(data_emprestimo.getDate() + permissoes.dias);
        return data_devolucao;
    }

    async calcularAtraso(emp: EmprestimoEntity) {
        const atraso = { dias: 0, data: new Date(), dias_suspensao: 0 };
        const data = new Date(emp.data_emprestimo);
        const permissoes = await this.permissoesEmprestimo(emp.usuario_id, emp.estoque_id);
        atraso.dias_suspensao = await this.diasAtrasoPorCategoria(emp);
        atraso.dias = Math.floor((atraso.data.getTime() - data.getTime()) / (1000 * 60 * 60 * 24));
        if(atraso.dias <= permissoes.dias){
            atraso.dias = 0; 
        }
        atraso.data.setDate(atraso.data.getDate() + atraso.dias_suspensao);

        return atraso;
    }

    async diasAtrasoPorCategoria(emp: EmprestimoEntity) {
        const permissoes = await this.permissoesEmprestimo(emp.usuario_id, emp.estoque_id);
        const data_atual = new Date();
        const data_emp = new Date(emp.data_emprestimo);
        const dias_atraso = Math.floor((data_atual.getTime() - data_emp.getTime()) / (1000 * 60 * 60 * 24));
        if (dias_atraso - permissoes.dias > 0) {
            return (dias_atraso - permissoes.dias) * 3;
        }
        return 0;
    }

    async permissoesEmprestimo(usuario_id: number, estoque_id: number) {
        const usuario = await this.emprestimoRepository.buscarUsuarioEmprestimo(usuario_id);
        const estoque = await this.emprestimoRepository.buscarEstoqueEmprestimo(estoque_id);
        const livro = await this.emprestimoRepository.buscarLivroEmprestimo(estoque.livro_id);
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