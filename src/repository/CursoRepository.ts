import { Curso } from "../model/Curso";

export class CursoRepository {
    private static instance: CursoRepository;
    private cursoList: Curso[] =
        [
            {
                id: 1,
                nome: "ADS"
            },
            {
                id: 2,
                nome: "Pedagogia"
            },
            {
                id: 3,
                nome: "Administração"
            },
            {
                id: 4,
                nome: "Sem curso"
            }
        ];

    private constructor() { };

    public static getInstance(): CursoRepository {
        if (!this.instance) {
            this.instance = new CursoRepository();
        }
        return this.instance;
    }

    buscarCursos() {
        return this.cursoList;
    }

    verificarCurso(id: number): boolean {
        const indice = this.cursoList.findIndex(c => c.id == id);
        if (indice == -1) {
            return false;
        } else {
            return true;
        }
    }
}