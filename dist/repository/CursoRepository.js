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
}
exports.CursoRepository = CursoRepository;
