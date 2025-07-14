"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.LivroDto = void 0;
class LivroDto {
    id;
    titulo;
    autor;
    editora;
    edicao;
    isbn;
    categoria_id;
    constructor(titulo, autor, editora, edicao, isbn, categoria_id, id) {
        this.titulo = titulo || '';
        this.autor = autor || '';
        this.editora = editora || '';
        this.edicao = edicao || '';
        this.isbn = isbn || '';
        this.categoria_id = categoria_id || 0;
        this.id = id || 0;
    }
}
exports.LivroDto = LivroDto;
