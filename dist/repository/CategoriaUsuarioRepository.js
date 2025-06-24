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
    verificarCategoria(id) {
        const indice = this.categoriaUsuarioList.findIndex(c => c.id == id);
        if (indice == -1) {
            return false;
        }
        else {
            return true;
        }
    }
}
exports.CategoriaUsuarioRepository = CategoriaUsuarioRepository;
