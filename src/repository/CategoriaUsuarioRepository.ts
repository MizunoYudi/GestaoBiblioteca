import { CategoriaUsuario } from "../model/entity/CategoriaUsuarioEntity";

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

    verificarCategoria(id: number): boolean {
        const indice = this.categoriaUsuarioList.findIndex(c => c.id == id);
        if (indice == -1) {
            return false;
        } else {
            return true;
        }
    }
}