export class Usuario {
    id: number;
    nome: string;
    cpf: string;
    ativo: string;
    categoria_id: number;
    curso_id: number;

    constructor(
        id: number,
        nome: string,
        cpf: string,
        categoria_id: number,
        curso_id: number,
        ativo?: string
    ) {
        this.id = id;
        this.nome = nome;
        this.cpf = cpf;
        this.categoria_id = categoria_id;
        this.curso_id = curso_id;
        this.ativo = ativo || 'ativo';
    }
}