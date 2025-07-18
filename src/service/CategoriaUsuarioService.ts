import { CategoriaUsuarioRepository } from "../repository/CategoriaUsuarioRepository";

export class CategoriaUsuarioService {
    private categoriaRepository = CategoriaUsuarioRepository.getInstance();

    listarCategoriaUsuario() {
        return this.categoriaRepository.buscarCategorias();
    }

    validarCategoriaUsuario(id_categoria: number) {
        return this.categoriaRepository.verificarCategoria(id_categoria);
    }
}