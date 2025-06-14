import { CategoriaLivro } from "../model/CategoriaLivro";

export class CategoriaLivroRepository {
    private static instance: CategoriaLivroRepository;
    private categoriaLivroList: CategoriaLivro[] =
        [
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

    private constructor() {};

    public static getInstance(): CategoriaLivroRepository {
        if (!this.instance) {
            this.instance = new CategoriaLivroRepository();
        }
        return this.instance;
    }

    buscarCategorias() {
        return this.categoriaLivroList;
    }
}