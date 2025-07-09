"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.CursoRepository = void 0;
class CursoRepository {
    static instance;
    cursoList = [
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
    constructor() { }
    ;
    static getInstance() {
        if (!this.instance) {
            this.instance = new CursoRepository();
        }
        return this.instance;
    }
    buscarCursos() {
        return this.cursoList;
    }
    verificarCurso(id) {
        const indice = this.cursoList.findIndex(c => c.id == id);
        if (indice == -1) {
            return false;
        }
        else {
            return true;
        }
    }
}
exports.CursoRepository = CursoRepository;
