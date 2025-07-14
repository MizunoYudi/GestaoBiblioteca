"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.CategoriaUsuarioDto = void 0;
class CategoriaUsuarioDto {
    id;
    nome;
    constructor(id, nome) {
        this.id = id || 0;
        this.nome = nome || '';
    }
}
exports.CategoriaUsuarioDto = CategoriaUsuarioDto;
