"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.LivroController = void 0;
const LivroService_1 = require("../service/LivroService");
const livroService = new LivroService_1.LivroService();
class LivroController {
    novoLivro(req, res) {
        try {
            const novoLivro = livroService.cadastrarLivro(req.body);
            res.status(201).json({
                mensagem: "Livro cadastrado com sucesso!",
                livro: novoLivro
            });
        }
        catch (e) {
            res.status(400).json({ Status: "Error", mensagem: e.message });
        }
    }
    exibirLivros(req, res) {
        try {
            let livros = livroService.listarLivros();
            if (req.query["titutlo"]) {
                livros = livroService.filtrarLivros(livros, 1, req.query.titulo);
            }
            if (req.query["autor"]) {
                livros = livroService.filtrarLivros(livros, 2, req.query.autor);
            }
            if (req.query["editora"]) {
                livros = livroService.filtrarLivros(livros, 3, req.query.editora);
            }
            if (req.query["edicao"]) {
                livros = livroService.filtrarLivros(livros, 4, req.query.edicao);
            }
            res.status(200).json({
                livros
            });
        }
        catch (e) {
            res.status(400).json({ Status: "Error", mensagem: e.message });
        }
    }
    filtrarLivroPorIsbn(req, res) {
        try {
            const livro = livroService.filtrarPorISBN(req.params.isbn);
            res.status(200).json({
                mensagem: "Livro encontrado!",
                livro: livro
            });
        }
        catch (e) {
            res.status(400).json({ Status: "Error", mensagem: e.message });
        }
    }
    atualizarLivro(req, res) {
        try {
            const livro = livroService.atualizarLivro(req.body, req.params.isbn);
            res.status(200).json({
                mensagem: "Livro atualizado com sucesso!",
                livro_atualizado: livro
            });
        }
        catch (e) {
            res.status(400).json({ Status: "Error", mensagem: e.message });
        }
    }
    apagarLivro(req, res) {
        try {
            livroService.removerLivro(req.params.isbn);
            res.status(200).json({
                mensagem: "Livro removido com sucesso!"
            });
        }
        catch (e) {
            res.status(400).json({ Status: "Error", mensagem: e.message });
        }
    }
}
exports.LivroController = LivroController;
