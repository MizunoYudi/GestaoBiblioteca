"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.Usuario = void 0;
class Usuario {
    id;
    nome;
    cpf;
    ativo;
    categoria_id;
    curso_id;
    constructor(nome, cpf, categoria_id, curso_id, id, ativo) {
        this.nome = nome;
        this.cpf = cpf;
        this.categoria_id = categoria_id;
        this.curso_id = curso_id;
        this.id = id || 0;
        this.ativo = ativo || 'ativo';
    }
}
exports.Usuario = Usuario;
