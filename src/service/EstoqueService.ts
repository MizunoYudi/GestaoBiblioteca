import { Estoque } from "../model/Estoque";
import { EstoqueRepository } from "../repository/EstoqueRepository";

export class EstoqueService {
    estoqueRepository = EstoqueRepository.getInstance();

    cadastrarExemplar(estoqueData: any) {
        const { id, livro_id, quantidade, quantidade_emprestada } = estoqueData;

        if (!id || !livro_id || !quantidade || !quantidade_emprestada) {
            throw new Error("Informações incompletas para o cadastro do exemplar");
        }

        const novoExemplar = new Estoque(parseInt(id), parseInt(livro_id), parseInt(quantidade), parseInt(quantidade_emprestada), true);
        this.estoqueRepository.inserirExemplar(novoExemplar);
        return novoExemplar;
    }

    listarExemplares() {
        const exemplares = this.estoqueRepository.buscarExemplares();
        return exemplares.filter(e => e.disponivel == true);
    }

    filtrarPorId(id: number): Estoque {
        const exemplar = this.estoqueRepository.filtrarPorId(id);
        return exemplar;
    }

    atualizarDisponibilidade(disponivel: boolean, id: number) {
        const exemplar = this.estoqueRepository.alterarExemplar(disponivel, id);
        return exemplar;
    }

    removerExemplar(id: number) {
        this.estoqueRepository.excluirExemplar(id);
    }
}