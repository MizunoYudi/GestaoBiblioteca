import { Request, Response } from "express";
import { CategoriaUsuarioService } from "../service/CategoriaUsuarioService";

const categoriaUsuarioService = new CategoriaUsuarioService();

export class CategoriaUsuarioController {
    exibirCategoriaUsuario(req: Request, res: Response) {
        try {
            const categoria_usuarios = categoriaUsuarioService.listarCategoriaUsuario();
            res.status(200).json({
                categoria_usuarios
            });
        } catch (e: any) {
            res.status(400).json({ Status: "Error", mensagem: e.message });
        }
    }
}