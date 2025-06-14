import { CursoRepository } from "../repository/CursoRepository";

export class CursoService {
    cursoRepository = CursoRepository.getInstance();

    listarCursos(){
        return this.cursoRepository.buscarCursos();
    }
}