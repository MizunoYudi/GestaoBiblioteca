"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.LivroRepository = void 0;
class LivroRepository {
    static instance;
    livroList = [];
    cont = 0;
    constructor() { }
    ;
    static getInstance() {
        if (!this.instance) {
            this.instance = new LivroRepository();
        }
        return this.instance;
    }
    inserirLivro(livro) {
        const isbn = this.livroList.map(l => l.isbn).indexOf(livro.isbn);
        const id = this.livroList.map(l => l.id).indexOf(livro.id);
        if (isbn == -1 && id == -1) {
            this.livroList.push(livro);
        }
        else {
            throw new Error("Já existe um livro com o mesmo isbn ou id no sistema");
        }
    }
    buscarLivros() {
        return this.livroList;
    }
    buscarLivroIsbn(isbn) {
        const indice = this.livroList.findIndex(l => l.isbn == isbn);
        if (indice == -1) {
            throw new Error("Livro não encontrado");
        }
        else {
            return this.livroList[indice];
        }
    }
    alterarLivro(titulo, autor, editora, edicao, categoria_id, isbn) {
        const livro = this.buscarLivroIsbn(isbn);
        titulo ? livro.titulo = titulo : livro.titulo = livro.titulo;
        autor ? livro.autor = autor : livro.autor = livro.autor;
        editora ? livro.editora = editora : livro.editora = livro.editora;
        edicao ? livro.edicao = edicao : livro.edicao = livro.edicao;
        categoria_id ? livro.categoria_id = categoria_id : livro.categoria_id = livro.categoria_id;
        return livro;
    }
    excluirLivro(isbn) {
        const indice = this.livroList.findIndex(l => l.isbn == isbn);
        this.livroList.splice(indice);
    }
}
exports.LivroRepository = LivroRepository;
