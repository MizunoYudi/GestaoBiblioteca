import { Request, Response } from "express";
import { CursoService } from "../service/CursoService";

export class CursoController {
    private cursoService = new CursoService();

    exibirCursos(req: Request, res: Response) {
        try {
            const cursos = this.cursoService.listarCursos();
            res.status(200).json({
                cursos
            });
        } catch (e: any) {
            res.status(400).json({ Status: "Error", mensagem: e.message });
        }
    }
}