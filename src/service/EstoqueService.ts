import { Estoque } from "../model/Estoque";
import { EstoqueRepository } from "../repository/EstoqueRepository";
import { EmprestimoService } from "./EmprestimoService";
import { LivroService } from "./LivroService";

export class EstoqueService {
    private estoqueRepository = EstoqueRepository.getInstance();
    private livroService = new LivroService();
    private emprestimoService = new EmprestimoService();

    cadastrarExemplar(estoqueData: any) {
        const { livro_id, quantidade } = estoqueData;

        if (!livro_id|| quantidade == undefined) {
            throw new Error("Informações incompletas para o cadastro do exemplar");
        }

        const novoExemplar = new Estoque(parseInt(livro_id), parseInt(quantidade));
        try{
            if (this.livroService.filtrarPorId(livro_id)) {
                this.estoqueRepository.inserirExemplar(novoExemplar);
                return novoExemplar;
            }
        } catch(err: any){
            if(err instanceof Error){
                throw new Error("Livro não encontrado para cadastrar estoque");
            }
        }
    }

    listarExemplares() {
        const exemplares = this.estoqueRepository.buscarExemplares();
        return exemplares.filter(e => e.disponivel == true);
    }

    filtrarPorId(id: number): Estoque {
        const exemplar = this.estoqueRepository.buscarPorId(id);
        return exemplar;
    }

    atualizarDisponibilidade(disponivel: boolean, id: number) {
        const exmp = this.estoqueRepository.buscarPorId(id);
        if(exmp.quantidade == exmp.quantidade_emprestada){
            throw new Error(`Não é possível atualizar a disponibilidade do estoque: quantidade de exemplares emprestados exedidos. Quantidade total: ${exmp.quantidade}, Quantidade emprestada: ${exmp.quantidade_emprestada}`)
        }
        const exemplar_atualizado = this.estoqueRepository.alterarExemplar(disponivel, id);
        return exemplar_atualizado;
    }

    removerExemplar(id: number) {
        if (this.emprestimoService.existeEstoqueAtivo(id)) {
            throw new Error("Possui emprestimos pendentes com tais exemplares");
        } else {
            this.estoqueRepository.excluirExemplar(id);
        }
    }
}