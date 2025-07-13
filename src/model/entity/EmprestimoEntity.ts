export class EmprestimoEntity {
    id: number;
    usuario_id: number;
    estoque_id: number;
    data_emprestimo: Date;
    data_devolucao: Date;
    data_entrega: Date | undefined;
    dias_atraso: number;
    suspensao_ate: Date | undefined;

    constructor(
        usuario_id: number,
        estoque_id: number,
        data_emprestimo: Date,
        data_devolucao: Date,
        id?: number,
        data_entrega?: Date,
        dias_atraso?: number,
        suspensao_ate?: Date
    ) {
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