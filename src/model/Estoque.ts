export class Estoque {
    id: number;
    livro_id: number;
    quantidade: number;
    quantidade_emprestada: number;
    disponivel: boolean;

    constructor(
        livro_id: number,
        quantidade: number,
        quantidade_emprestada?: number,
        disponivel?: boolean,
        id?: number
    ) {
        this.livro_id = livro_id;
        this.quantidade = quantidade;
        this.quantidade_emprestada = quantidade_emprestada || 0;
        this.disponivel = disponivel || true;
        this.id = id || 0;
    }
}