import { Request, Response } from "express";
import { UsuarioService } from "../service/UsuarioService";

const usuarioService = new UsuarioService();

export class UsuarioController {
    novoUsuario(req: Request, res: Response) {
        try {
            const novoUsuario = usuarioService.cadastrarUsuario(req.body);
            res.status(201).json({
                mensagem: "Usuário cadastrado com sucesso!",
                usuario: novoUsuario
            });
        } catch (e: any) {
            res.status(400).json({ Status: "Error", mensagem: e.message });
        }
    }

    exibirUsuarios(req: Request, res: Response) {
        try {
            const usuarios = usuarioService.listarUsuarios();
            res.status(200).json({
                usuarios
            });
        } catch (e: any) {
            res.status(400).json({ Status: "Error", mensagem: e.message });
        }
    }

    filtrarUsuarioPorCPF(req: Request, res: Response) {
        try {
            const usuario = usuarioService.filtrarPorCPF(req.params.cpf);
            res.status(200).json({
                mensagem: "Usuário encontrado!",
                usuario: usuario
            });
        } catch (e: any) {
            res.status(400).json({ Status: "Error", mensagem: e.message });
        }
    }

    atualizarUsuario(req: Request, res: Response) {
        try {
            const usuario = usuarioService.atualizarUsuario(req.body, req.params.cpf);
            res.status(200).json({
                mensagem: "Usuário atualizado com sucesso!",
                usuario: usuario
            });
        } catch (e: any) {
            res.status(400).json({ Status: "Error", mensagem: e.message });
        }
    }

    apagarUsuario(req: Request, res: Response) {
        try {
            usuarioService.removerUsuario(req.params.cpf);
            res.status(200).json({
                mensagem: "Usuário removido com sucesso!"
            });
        } catch (e: any) {
            res.status(400).json({ Status: "Error", mensagem: e.message });
        }
    }
}