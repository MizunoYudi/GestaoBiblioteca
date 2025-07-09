"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.UsuarioController = void 0;
const UsuarioService_1 = require("../service/UsuarioService");
const usuarioService = new UsuarioService_1.UsuarioService();
class UsuarioController {
    novoUsuario(req, res) {
        try {
            const novoUsuario = usuarioService.cadastrarUsuario(req.body);
            res.status(201).json({
                mensagem: "Usuário cadastrado com sucesso!",
                usuario: novoUsuario
            });
        }
        catch (e) {
            res.status(400).json({ Status: "Error", mensagem: e.message });
        }
    }
    exibirUsuarios(req, res) {
        try {
            let usuarios = usuarioService.listarUsuarios();
            if (req.query["categoria_id"]) {
                usuarios = usuarioService.filtrarUsuarios(usuarios, 1, req.query.categoria_id);
            }
            if (req.query["curso_id"]) {
                usuarios = usuarioService.filtrarUsuarios(usuarios, 2, req.query.curso_id);
            }
            res.status(200).json({
                usuarios
            });
        }
        catch (e) {
            res.status(400).json({ Status: "Error", mensagem: e.message });
        }
    }
    filtrarUsuarioPorCPF(req, res) {
        try {
            const usuario = usuarioService.filtrarPorCPF(req.params.cpf);
            res.status(200).json({
                mensagem: "Usuário encontrado!",
                usuario: usuario
            });
        }
        catch (e) {
            res.status(400).json({ Status: "Error", mensagem: e.message });
        }
    }
    atualizarUsuario(req, res) {
        try {
            const usuario = usuarioService.atualizarUsuario(req.body, req.params.cpf);
            res.status(200).json({
                mensagem: "Usuário atualizado com sucesso!",
                usuario: usuario
            });
        }
        catch (e) {
            res.status(400).json({ Status: "Error", mensagem: e.message });
        }
    }
    apagarUsuario(req, res) {
        try {
            usuarioService.removerUsuario(req.params.cpf);
            res.status(200).json({
                mensagem: "Usuário removido com sucesso!"
            });
        }
        catch (e) {
            res.status(400).json({ Status: "Error", mensagem: e.message });
        }
    }
}
exports.UsuarioController = UsuarioController;
