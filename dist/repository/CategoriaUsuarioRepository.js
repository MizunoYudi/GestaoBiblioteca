"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.CategoriaUsuarioRepository = void 0;
class CategoriaUsuarioRepository {
    static instance;
    categoriaUsuarioList = [
        {
            id: 1,
            nome: "Professor"
        },
        {
            id: 2,
            nome: "Aluno"
        },
        {
            id: 3,
            nome: "Bibliotecário"
        }
    ];
    constructor() { }
    ;
    static getInstance() {
        if (!this.instance) {
            this.instance = new CategoriaUsuarioRepository();
        }
        return this.instance;
    }
    buscarCategorias() {
        return this.categoriaUsuarioList;
    }
}
exports.CategoriaUsuarioRepository = CategoriaUsuarioRepository;
