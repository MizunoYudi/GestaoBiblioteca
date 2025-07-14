"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.EstoqueDto = void 0;
class EstoqueDto {
    id;
    livro_id;
    quantidade;
    quantidade_emprestada;
    disponivel;
    constructor(livro_id, quantidade, id, disponivel, quantidade_emprestada) {
        this.livro_id = livro_id || 0;
        this.quantidade = quantidade || 0;
        this.quantidade_emprestada = quantidade_emprestada || 0;
        this.disponivel = disponivel || true;
        this.id = id || 0;
    }
}
exports.EstoqueDto = EstoqueDto;
