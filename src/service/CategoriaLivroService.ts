import { CategoriaLivroRepository } from "../repository/CategoriaLivroRepository";

export class CategoriaLivroService {
    categoriaRepository = CategoriaLivroRepository.getInstance();

    listarCategoriaLivro() {
        return this.categoriaRepository.buscarCategorias();
    }
}