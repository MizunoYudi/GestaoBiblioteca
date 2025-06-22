"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.EmprestimoRepository = void 0;
class EmprestimoRepository {
    static instance;
    emprestimoList = [];
    constructor() { }
    ;
    static getInstance() {
        if (!this.instance) {
            this.instance = new EmprestimoRepository();
        }
        return this.instance;
    }
    inserirEmprestimo(emprestimo) {
        const id = this.emprestimoList.findIndex(e => e.id == emprestimo.id);
        if (id == -1) {
            this.emprestimoList.push(emprestimo);
        }
        else {
            throw new Error("Já existe um emprestimo com o mesmo id no sistema");
        }
    }
    buscarEmprestimos() {
        return this.emprestimoList;
    }
    buscarEmprestimoId(id) {
        const indice = this.emprestimoList.findIndex(e => e.id == id);
        if (indice == -1) {
            throw new Error("Emprestimo não encontrado");
        }
        return this.emprestimoList[indice];
    }
    registrarDevolucao(entrega, atraso, suspensao, id) {
        const emp = this.buscarEmprestimoId(id);
        emp.data_entrega = entrega;
        emp.dias_atraso = atraso;
        emp.suspensao_ate = suspensao;
    }
}
exports.EmprestimoRepository = EmprestimoRepository;
