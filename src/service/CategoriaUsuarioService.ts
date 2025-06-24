import { CategoriaUsuarioRepository } from "../repository/CategoriaUsuarioRepository";

export class CategoriaUsuarioService {
    private categoriaRepository = CategoriaUsuarioRepository.getInstance();

    listarCategoriaUsuario() {
        return this.categoriaRepository.buscarCategorias();
    }
}