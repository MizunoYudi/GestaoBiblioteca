import { Estoque } from "../model/Estoque";
import { EmprestimoRepository } from "../repository/EmprestimoRepository";
import { EstoqueRepository } from "../repository/EstoqueRepository";
import { LivroRepository } from "../repository/LivroRepository";

export class EstoqueService {
    private estoqueRepository = EstoqueRepository.getInstance();
    private livroRepository = LivroRepository.getInstance();
    private emprestimoRepository = EmprestimoRepository.getInstance();

    cadastrarExemplar(estoqueData: any) {
        const { livro_id, quantidade } = estoqueData;

        if (!livro_id|| quantidade == undefined) {
            throw new Error("Informações incompletas para o cadastro do exemplar");
        }

        const novoExemplar = new Estoque(parseInt(livro_id), parseInt(quantidade));
        if (this.livroRepository.buscarLivroId(livro_id)) {
            this.estoqueRepository.inserirExemplar(novoExemplar);
            return novoExemplar;
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
        const exemplar = this.estoqueRepository.alterarExemplar(disponivel, id);
        return exemplar;
    }

    removerExemplar(id: number) {
        if (this.verificarEmprestimo(id)) {
            throw new Error("Possui emprestimos pendentes com tais exemplares");
        } else {
            this.estoqueRepository.excluirExemplar(id);
        }
    }

    verificarEmprestimo(estoque_id: number) {
        if (this.emprestimoRepository.buscarEstoqueEmprestimo(estoque_id)) {
            return true;
        } else {
            return false;
        }
    }
}