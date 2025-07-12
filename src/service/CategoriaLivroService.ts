import { CategoriaLivroRepository } from "../repository/CategoriaLivroRepository";

export class CategoriaLivroService {
    private categoriaRepository = CategoriaLivroRepository.getInstance();

    listarCategoriaLivro() {
        return this.categoriaRepository.buscarCategorias();
    }

    validarCategoriaLivro(id_categoria: number): boolean{
        return this.categoriaRepository.verificarCategoria(id_categoria);
    }
}