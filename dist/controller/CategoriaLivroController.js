"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.exibirCategoriaLivro = exibirCategoriaLivro;
const CategoriaLivroService_1 = require("../service/CategoriaLivroService");
const categoriaLivroService = new CategoriaLivroService_1.CategoriaLivroService();
function exibirCategoriaLivro(req, res) {
    try {
        const categoria_livros = categoriaLivroService.listarCategoriaLivro();
        res.status(200).json({
            categoria_livros
        });
    }
    catch (e) {
        res.status(400).json({ Status: "Error", mensagem: e.message });
    }
}
