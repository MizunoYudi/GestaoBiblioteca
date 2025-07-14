"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.CategoriaLivroDto = void 0;
class CategoriaLivroDto {
    id;
    nome;
    constructor(id, nome) {
        this.id = id || 0;
        this.nome = nome || '';
    }
}
exports.CategoriaLivroDto = CategoriaLivroDto;
