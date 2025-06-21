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
        if(id == -1){
            this.estoqueList.push(exemplar);
        } else {
            throw new Error("Já existe um exemplar com o mesmo id");
        }
    }

    buscarExemplares() {
        return this.estoqueList;
    }

    filtrarPorId(id: number){
        const indice = this.estoqueList.findIndex(e => e.id == id);
        if (indice == -1) {
            throw new Error("Exemplar não encontrado");
        } else {
            return this.estoqueList[indice];
        }
    }

    alterarExemplar(qtd: number, qtd_emp: number, disponivel: boolean, id: number) {
        const exmp = this.filtrarPorId(id);

        qtd ? exmp.quantidade = qtd : exmp.quantidade = exmp.quantidade;
        qtd_emp ? exmp.quantidade_emprestada = qtd_emp : exmp.quantidade_emprestada = exmp.quantidade_emprestada;
        typeof disponivel != 'undefined' ? exmp.disponivel = disponivel : exmp.disponivel = exmp.disponivel;

        return exmp;
    }

    excluirExemplar(id: number){
        const indice = this.estoqueList.findIndex(e => e.id == e.id);
        this.estoqueList.splice(indice);
    }
}