"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.CategoriaUsuarioController = void 0;
const CategoriaUsuarioService_1 = require("../service/CategoriaUsuarioService");
const categoriaUsuarioService = new CategoriaUsuarioService_1.CategoriaUsuarioService();
class CategoriaUsuarioController {
    exibirCategoriaUsuario(req, res) {
        try {
            const categoria_usuarios = categoriaUsuarioService.listarCategoriaUsuario();
            res.status(200).json({
                categoria_usuarios
            });
        }
        catch (e) {
            res.status(400).json({ Status: "Error", mensagem: e.message });
        }
    }
}
exports.CategoriaUsuarioController = CategoriaUsuarioController;
