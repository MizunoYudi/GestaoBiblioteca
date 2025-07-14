import { EstoqueEntity } from "../model/entity/EstoqueEntity";
import { EstoqueRepository } from "../repository/EstoqueRepository";
import { EmprestimoService } from "./EmprestimoService";
import { LivroService } from "./LivroService";

export class EstoqueService {
    private estoqueRepository = EstoqueRepository.getInstance();
    private livroService = new LivroService();
    private emprestimoService = new EmprestimoService();

    async cadastrarExemplar(estoqueData: any) {
        const { livro_id, quantidade } = estoqueData;

        if (!livro_id|| quantidade == undefined) {
            throw new Error("Informações incompletas para o cadastro do exemplar");
        }

        const novoExemplar = new EstoqueEntity(parseInt(livro_id), parseInt(quantidade));
        try{
            if (await this.livroService.filtrarPorId(livro_id)) {
                await this.estoqueRepository.inserirExemplar(novoExemplar);
                return novoExemplar;
            }
        } catch(err: any){
            if(err instanceof Error){
                throw new Error("Livro não encontrado para cadastrar estoque");
            }
        }
    }

    async listarExemplares() {
        return await this.estoqueRepository.buscarExemplares();
    }

    async filtrarPorId(id: number): Promise<EstoqueEntity> {
        const exemplar = await this.estoqueRepository.buscarPorId(id);
        return exemplar;
    }

    async atualizarDisponibilidade(disponivel: boolean, id: number) {
        const exmp = await this.estoqueRepository.buscarPorId(id);
        if(exmp.quantidade == exmp.quantidade_emprestada){
            throw new Error(`Não é possível atualizar a disponibilidade do estoque: quantidade de exemplares emprestados exedidos. Quantidade total: ${exmp.quantidade}, Quantidade emprestada: ${exmp.quantidade_emprestada}`)
        }
        return await this.estoqueRepository.alterarExemplar(disponivel, id);;
    }

    async removerExemplar(id: number) {
        if (await this.estoqueRepository.existeEmprestimosAtivos(id)) {
            throw new Error("Possui emprestimos pendentes com tais exemplares");
        } else {
            await this.estoqueRepository.excluirExemplar(id);
        }
    }
}