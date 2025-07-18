"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.CategoriaLivroService = void 0;
const CategoriaLivroRepository_1 = require("../repository/CategoriaLivroRepository");
class CategoriaLivroService {
    categoriaRepository = CategoriaLivroRepository_1.CategoriaLivroRepository.getInstance();
    listarCategoriaLivro() {
        return this.categoriaRepository.buscarCategorias();
    }
    validarCategoriaLivro(id_categoria) {
        return this.categoriaRepository.verificarCategoria(id_categoria);
    }
}
exports.CategoriaLivroService = CategoriaLivroService;
