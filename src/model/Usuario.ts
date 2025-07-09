export class Usuario {
    id: number;
    nome: string;
    cpf: string;
    ativo: string;
    categoria_id: number;
    curso_id: number;

    constructor(
        nome: string,
        cpf: string,
        categoria_id: number,
        curso_id: number,
        id?: number,
        ativo?: string
    ) {
        this.nome = nome;
        this.cpf = cpf;
        this.categoria_id = categoria_id;
        this.curso_id = curso_id;
        this.id = id || 0;
        this.ativo = ativo || 'ativo';
    }
}