"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.Emprestimo = void 0;
class Emprestimo {
    id;
    usuario_id;
    estoque_id;
    data_emprestimo;
    data_devolucao;
    data_entrega;
    dias_atraso;
    suspensao_ate;
    constructor(usuario_id, estoque_id, data_emprestimo, data_devolucao, id, data_entrega, dias_atraso, suspensao_ate) {
        this.usuario_id = usuario_id;
        this.estoque_id = estoque_id;
        this.data_emprestimo = data_emprestimo;
        this.data_devolucao = data_devolucao;
        this.id = id || 0;
        this.data_entrega = data_entrega || undefined;
        this.dias_atraso = dias_atraso || 0;
        this.suspensao_ate = suspensao_ate || undefined;
    }
}
exports.Emprestimo = Emprestimo;
