"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.LivroService = void 0;
const Livro_1 = require("../model/Livro");
const CategoriaLivroRepository_1 = require("../repository/CategoriaLivroRepository");
const EstoqueRepository_1 = require("../repository/EstoqueRepository");
const LivroRepository_1 = require("../repository/LivroRepository");
class LivroService {
    livroRepository = LivroRepository_1.LivroRepository.getInstance();
    categoriaLivroRepository = CategoriaLivroRepository_1.CategoriaLivroRepository.getInstance();
    estoqueRepository = EstoqueRepository_1.EstoqueRepository.getInstance();
    cadastrarLivro(livroData) {
        const { titulo, autor, editora, edicao, isbn, categoria_id } = livroData;
        if (!titulo || !autor || !editora || !edicao || !isbn || !categoria_id) {
            throw new Error("Informações incompletas para o cadastro do livro");
        }
        const novoLivro = new Livro_1.Livro(titulo, autor, editora, edicao, isbn, parseInt(categoria_id));
        if (this.validarLivro(novoLivro)) {
            this.livroRepository.inserirLivro(novoLivro);
            return novoLivro;
        }
    }
    validarLivro(livro) {
        if (this.categoriaLivroRepository.verificarCategoria(livro.categoria_id)) {
            if (!this.verificarSemelhantes(livro.autor, livro.editora, livro.edicao)) {
                return true;
            }
            else {
                throw new Error("Já existe um livro com a mesma combinação de autor, editora e edição no sistema");
            }
        }
        else {
            throw new Error("Categoria inválida");
        }
    }
    verificarSemelhantes(autor, editora, edicao) {
        const livros = this.livroRepository.buscarLivros();
        const semelhante = livros.findIndex(l => l.autor == autor && l.editora == editora && l.edicao == edicao);
        if (semelhante == -1) {
            return false;
        }
        else {
            return true;
        }
    }
    listarLivros() {
        return this.livroRepository.buscarLivros();
    }
    filtrarLivros(livros, filtro, valor) {
        if (filtro !== undefined && valor !== undefined) {
            switch (filtro) {
                case 1:
                    const titulo = valor;
                    livros = livros.filter(l => l.titulo === titulo);
                    break;
                case 2:
                    const autor = valor;
                    livros = livros.filter(l => l.autor === autor);
                    break;
                case 3:
                    const editora = valor;
                    livros = livros.filter(l => l.editora === editora);
                    break;
                case 4:
                    const edicao = valor;
                    livros = livros.filter(l => l.edicao === edicao);
                    break;
            }
        }
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
        const livro = this.filtrarPorISBN(isbn);
        if (this.verificarEstoque(livro.id)) {
            throw new Error("Possui um estoque relacionado");
        }
        else {
            this.livroRepository.excluirLivro(isbn);
        }
    }
    verificarEstoque(livro_id) {
        if (this.estoqueRepository.buscarEstoqueLivro(livro_id)) {
            return true;
        }
        else {
            return false;
        }
    }
}
exports.LivroService = LivroService;
