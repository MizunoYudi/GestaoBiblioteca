import { CursoRepository } from "../repository/CursoRepository";

export class CursoService {
    private cursoRepository = CursoRepository.getInstance();

    listarCursos(){
        return this.cursoRepository.buscarCursos();
    }

    validarCurso(id_curso: number){
        return this.cursoRepository.verificarCurso(id_curso);
    }
}