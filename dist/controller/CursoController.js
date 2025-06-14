"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.CursoController = void 0;
const CursoService_1 = require("../service/CursoService");
class CursoController {
    cursoService = new CursoService_1.CursoService();
    exibirCursos(req, res) {
        try {
            const cursos = this.cursoService.listarCursos();
            res.status(200).json({
                cursos
            });
        }
        catch (e) {
            res.status(400).json({ Status: "Error", mensagem: e.message });
        }
    }
}
exports.CursoController = CursoController;
