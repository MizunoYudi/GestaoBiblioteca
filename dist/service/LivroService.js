"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.LivroService = void 0;
const LivroEntity_1 = require("../model/entity/LivroEntity");
const EstoqueRepository_1 = require("../repository/EstoqueRepository");
const LivroRepository_1 = require("../repository/LivroRepository");
const CategoriaLivroService_1 = require("./CategoriaLivroService");
class LivroService {
    livroRepository = LivroRepository_1.LivroRepository.getInstance();
    categoriaLivroService = new CategoriaLivroService_1.CategoriaLivroService();
    estoqueRepository = EstoqueRepository_1.EstoqueRepository.getInstance();
    async cadastrarLivro(livroData) {
        const { titulo, autor, editora, edicao, isbn, categoria_id } = livroData;
        if (!titulo || !autor || !editora || !edicao || !isbn || !categoria_id) {
            throw new Error("Informações incompletas para o cadastro do livro");
        }
        const novoLivro = new LivroEntity_1.LivroEntity(titulo, autor, editora, edicao, isbn, parseInt(categoria_id));
        if (await this.validarLivro(autor, editora, edicao, categoria_id)) {
            return await this.livroRepository.inserirLivro(novoLivro);
        }
    }
    async validarLivro(autor, editora, edicao, categoria_id) {
        if (await this.categoriaLivroService.validarCategoriaLivro(categoria_id)) {
            if (await this.livroRepository.existeSemelhante(autor, editora, edicao)) {
                throw new Error("Já existe um livro com a mesma combinação de autor, editora e edição no sistema");
            }
            else {
                return true;
            }
        }
        else {
            throw new Error("Categoria inválida");
        }
    }
    async listarLivros() {
        return await this.livroRepository.buscarLivros();
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
    async filtrarPorISBN(isbn) {
        const livro = await this.livroRepository.buscarLivroIsbn(isbn);
        return livro;
    }
    async filtrarPorId(id) {
        const livro = await this.livroRepository.buscarLivroId(id);
        return livro;
    }
    async atualizarLivro(livroData, isbn) {
        const { titulo, autor, editora, edicao, categoria_id } = livroData;
        if (await this.validarLivro(autor, editora, edicao, categoria_id)) {
            const livroAtualizado = this.livroRepository.alterarLivro(titulo, autor, editora, edicao, categoria_id, isbn);
            return livroAtualizado;
        }
    }
    async removerLivro(isbn) {
        const livro = await this.filtrarPorISBN(isbn);
        if (await this.verificarEstoque(livro.id)) {
            throw new Error("Possui um estoque relacionado");
        }
        else {
            this.livroRepository.excluirLivro(isbn);
        }
    }
    async verificarEstoque(livro_id) {
        if (await this.livroRepository.buscarEstoqueLivro(livro_id)) {
            return true;
        }
        else {
            return false;
        }
    }
}
exports.LivroService = LivroService;
