export class EmprestimoDto {
    id: number;
    usuario_id: number;
    estoque_id: number;
    data_emprestimo: Date | undefined;
    data_devolucao: Date | undefined;
    data_entrega: Date | undefined;
    dias_atraso: number;
    suspensao_ate: Date | undefined;

    constructor(
        usuario_id?: number,
        estoque_id?: number,
        data_emprestimo?: Date,
        data_devolucao?: Date,
        id?: number,
        data_entrega?: Date,
        dias_atraso?: number,
        suspensao_ate?: Date
    ) {
        this.usuario_id = usuario_id || 0;
        this.estoque_id = estoque_id || 0;
        this.data_emprestimo = data_emprestimo || undefined;
        this.data_devolucao = data_devolucao || undefined;
        this.id = id || 0;
        this.data_entrega = data_entrega || undefined;
        this.dias_atraso = dias_atraso || 0;
        this.suspensao_ate = suspensao_ate || undefined;
    }
}