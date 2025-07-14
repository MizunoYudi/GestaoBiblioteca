"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.EstoqueEntity = void 0;
class EstoqueEntity {
    id;
    livro_id;
    quantidade;
    quantidade_emprestada;
    disponivel;
    constructor(livro_id, quantidade, id, disponivel, quantidade_emprestada) {
        this.livro_id = livro_id;
        this.quantidade = quantidade;
        this.quantidade_emprestada = quantidade_emprestada || 0;
        this.disponivel = disponivel || true;
        this.id = id || 0;
    }
}
exports.EstoqueEntity = EstoqueEntity;
