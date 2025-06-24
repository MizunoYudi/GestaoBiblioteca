import { CategoriaLivroRepository } from "../repository/CategoriaLivroRepository";

export class CategoriaLivroService {
    private categoriaRepository = CategoriaLivroRepository.getInstance();

    listarCategoriaLivro() {
        return this.categoriaRepository.buscarCategorias();
    }
}