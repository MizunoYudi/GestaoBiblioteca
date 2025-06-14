import { Request, Response } from "express";
import { CursoService } from "../service/CursoService";

const cursoService = new CursoService();

export class CursoController {

    exibirCursos(req: Request, res: Response) {
        try {
            const cursos = cursoService.listarCursos();
            res.status(200).json({
                cursos
            });
        } catch (e: any) {
            res.status(400).json({ Status: "Error", mensagem: e.message });
        }
    }
}