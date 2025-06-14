import { CategoriaUsuario } from "../model/CategoriaUsuario";

export class CategoriaUsuarioRepository {
    private static instance: CategoriaUsuarioRepository;
    private categoriaUsuarioList: CategoriaUsuario[] =
        [
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

    private constructor() { };

    public static getInstance(): CategoriaUsuarioRepository {
        if (!this.instance) {
            this.instance = new CategoriaUsuarioRepository();
        }
        return this.instance;
    }

    buscarCategorias() {
        return this.categoriaUsuarioList;
    }
}