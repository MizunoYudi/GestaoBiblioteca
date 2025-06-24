import { Estoque } from "../model/Estoque";

export class EstoqueRepository {
    private static instance: EstoqueRepository;
    private estoqueList: Estoque[] = [];

    private constructor() { }

    public static getInstance(): EstoqueRepository {
        if (!this.instance) {
            this.instance = new EstoqueRepository();
        }
        return this.instance
    }

    inserirExemplar(exemplar: Estoque) {
        const id = this.estoqueList.map(e => e.id).indexOf(exemplar.id);
        if (id == -1) {
            this.estoqueList.push(exemplar);
        } else {
            throw new Error("Já existe um exemplar com o mesmo id");
        }
    }

    buscarExemplares() {
        return this.estoqueList;
    }

    buscarEstoqueLivro(livro_id: number) {
        const livros = this.estoqueList.filter(e => e.livro_id == livro_id);
        if (livros.length == 0) {
            return false;
        } else {
            return true;
        }
    }

    buscarPorId(id: number) {
        const indice = this.estoqueList.findIndex(e => e.id == id);
        if (indice == -1) {
            throw new Error("Exemplar não encontrado");
        } else {
            return this.estoqueList[indice];
        }
    }

    alterarExemplar(disponivel: boolean, id: number) {
        const exmp = this.buscarPorId(id);
        if (disponivel) {
            exmp.disponivel = true
        } else {
            exmp.disponivel = false
        }
        return exmp;
    }

    excluirExemplar(id: number) {
        const indice = this.estoqueList.findIndex(e => e.id == id);
        this.estoqueList.splice(indice);
    }
}