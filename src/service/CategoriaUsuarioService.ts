import { CategoriaUsuarioRepository } from "../repository/CategoriaUsuarioRepository";

export class CategoriaUsuarioService {
    categoriaRepository = CategoriaUsuarioRepository.getInstance();

    listarCategoriaUsuario() {
        return this.categoriaRepository.buscarCategorias();
    }
}