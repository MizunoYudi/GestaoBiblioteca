"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.CategoriaUsuarioService = void 0;
const CategoriaUsuarioRepository_1 = require("../repository/CategoriaUsuarioRepository");
class CategoriaUsuarioService {
    categoriaRepository = CategoriaUsuarioRepository_1.CategoriaUsuarioRepository.getInstance();
    listarCategoriaUsuario() {
        return this.categoriaRepository.buscarCategorias();
    }
    validarCategoriaUsuario(id_categoria) {
        return this.categoriaRepository.verificarCategoria(id_categoria);
    }
}
exports.CategoriaUsuarioService = CategoriaUsuarioService;
