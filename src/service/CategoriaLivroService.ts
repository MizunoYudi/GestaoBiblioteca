import { CategoriaLivroRepository } from "../repository/CategoriaLivroRepository";

export class CategoriaLivroService {
    private categoriaRepository = CategoriaLivroRepository.getInstance();

    listarCategoriaLivro() {
        return this.categoriaRepository.buscarCategorias();
    }

    validarCategoriaLivro(id_categoria: number): Promise<boolean>{
        return this.categoriaRepository.verificarCategoria(id_categoria);
    }
}