"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.EmprestimoRepository = void 0;
class EmprestimoRepository {
    static instance;
    emprestimoList = [];
    cont = 1;
    constructor() { }
    ;
    static getInstance() {
        if (!this.instance) {
            this.instance = new EmprestimoRepository();
        }
        return this.instance;
    }
    inserirEmprestimo(emprestimo) {
        emprestimo.id = this.cont++;
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
    buscarUsuarioEmprestimo(usuario_id) {
        const usuario = this.emprestimoList.filter(e => e.usuario_id == usuario_id);
        if (usuario.length == 0) {
            return false;
        }
        else {
            return true;
        }
    }
    buscarEstoqueEmprestimo(estoque_id) {
        const estoque = this.emprestimoList.filter(e => e.estoque_id == estoque_id);
        if (estoque.length == 0) {
            return false;
        }
        else {
            return true;
        }
    }
    registrarDevolucao(entrega, atraso, suspensao, id) {
        const emp = this.buscarEmprestimoId(id);
        emp.data_entrega = entrega;
        emp.dias_atraso = atraso;
        emp.suspensao_ate = suspensao;
    }
}
exports.EmprestimoRepository = EmprestimoRepository;
