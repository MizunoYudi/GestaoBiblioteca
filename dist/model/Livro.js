"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.Livro = void 0;
class Livro {
    id;
    titulo;
    autor;
    editora;
    edicao;
    isbn;
    categoria_id;
    constructor(titulo, autor, editora, edicao, isbn, categoria_id, id) {
        this.titulo = titulo;
        this.autor = autor;
        this.editora = editora;
        this.edicao = edicao;
        this.isbn = isbn;
        this.categoria_id = categoria_id;
        this.id = id || 0;
    }
}
exports.Livro = Livro;
