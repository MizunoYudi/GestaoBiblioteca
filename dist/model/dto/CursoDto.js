"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.CursoDto = void 0;
class CursoDto {
    id;
    nome;
    constructor(id, nome) {
        this.id = id || 0;
        this.nome = nome || '';
    }
}
exports.CursoDto = CursoDto;
