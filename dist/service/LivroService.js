"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.LivroService = void 0;
const Livro_1 = require("../model/Livro");
const LivroRepository_1 = require("../repository/LivroRepository");
class LivroService {
    livroRepository = LivroRepository_1.LivroRepository.getInstance();
    cadastrarLivro(livroData) {
        const { id, titulo, autor, editora, edicao, isbn, categoria_id } = livroData;
        if (!id || !titulo || !autor || !editora || !edicao || !isbn || !categoria_id) {
            throw new Error("Informações incompletas para o cadastro do livro");
        }
        const novoLivro = new Livro_1.Livro(parseInt(id), titulo, autor, editora, edicao, isbn, parseInt(categoria_id));
        if (!this.verificarSemelhantes(novoLivro.autor, novoLivro.editora, novoLivro.edicao)) {
            this.livroRepository.inserirLivro(novoLivro);
            return novoLivro;
        }
    }
    verificarSemelhantes(autor, editora, edicao) {
        const livros = this.livroRepository.buscarLivros();
        const semelhante = livros.findIndex(l => l.autor == autor && l.editora == editora && l.edicao == edicao);
        if (semelhante == -1) {
            return false;
        }
        else {
            throw new Error("Já existe um livro com a mesma combinação de autor, editora e edição no sistema");
        }
    }
    listarLivros() {
        const livros = this.livroRepository.buscarLivros();
        return livros;
    }
    filtrarPorISBN(isbn) {
        const livro = this.livroRepository.buscarLivroIsbn(isbn);
        return livro;
    }
    atualizarLivro(livroData, isbn) {
        const { titulo, autor, editora, edicao, categoria } = livroData;
        if (!this.verificarSemelhantes(autor, editora, edicao)) {
            const livroAtualizado = this.livroRepository.alterarLivro(titulo, autor, editora, edicao, categoria, isbn);
            return livroAtualizado;
        }
    }
    removerLivro(isbn) {
        this.livroRepository.excluirLivro(isbn);
    }
}
exports.LivroService = LivroService;
