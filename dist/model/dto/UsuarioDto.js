"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.UsuarioDto = void 0;
class UsuarioDto {
    id;
    nome;
    cpf;
    status;
    categoria_id;
    curso_id;
    constructor(nome, cpf, categoria_id, curso_id, id, status) {
        this.nome = nome || '';
        this.cpf = cpf || '';
        this.categoria_id = categoria_id || 0;
        this.curso_id = curso_id || 0;
        this.id = id || 0;
        this.status = status || 'status';
    }
}
exports.UsuarioDto = UsuarioDto;
