import { Emprestimo } from "../model/Emprestimo";

export class EmprestimoRepository {
    private static instance: EmprestimoRepository;
    private emprestimoList: Emprestimo[] = [];

    private constructor() { };

    public static getInstance(): EmprestimoRepository {
        if (!this.instance) {
            this.instance = new EmprestimoRepository();
        }
        return this.instance;
    }

    inserirEmprestimo(emprestimo: Emprestimo) {
        const id = this.emprestimoList.findIndex(e => e.id == emprestimo.id);
        if(id == -1){
            this.emprestimoList.push(emprestimo);
        } else {
            throw new Error("Já existe um emprestimo com o mesmo id no sistema");
        }
    }

    buscarEmprestimos() {
        return this.emprestimoList;
    }

    buscarEmprestimoId(id: number){
        const indice = this.emprestimoList.findIndex(e => e.id == id);
        if(indice == -1){
            throw new Error("Emprestimo não encontrado");
        }
        return this.emprestimoList[indice];
    }

    registrarDevolucao(entrega: Date, atraso: number, suspensao: Date, id: number){
        const emp = this.buscarEmprestimoId(id);
        
        emp.data_entrega = entrega;
        emp.dias_atraso = atraso;
        emp.suspensao_ate = suspensao;
    }
}