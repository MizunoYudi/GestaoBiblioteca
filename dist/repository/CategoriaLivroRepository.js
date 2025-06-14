"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.CategoriaLivroRepository = void 0;
class CategoriaLivroRepository {
    static instance;
    categoriaLivroList = [
        {
            id: 1,
            nome: "Romance"
        },
        {
            id: 2,
            nome: "Computação"
        },
        {
            id: 3,
            nome: "Letras"
        },
        {
            id: 4,
            nome: "Gestão"
        }
    ];
    constructor() { }
    ;
    static getInstance() {
        if (!this.instance) {
            this.instance = new CategoriaLivroRepository();
        }
        return this.instance;
    }
    buscarCategorias() {
        return this.categoriaLivroList;
    }
}
exports.CategoriaLivroRepository = CategoriaLivroRepository;
