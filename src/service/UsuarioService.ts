import { UsuarioEntity } from "../model/entity/UsuarioEntity";
import { CategoriaUsuarioService } from "../service/CategoriaUsuarioService";
import { UsuarioRepository } from "../repository/UsuarioRepository";
import { CursoService } from "./CursoService";
import { EmprestimoService } from "./EmprestimoService";

export class UsuarioService {
    private usuarioRepository = UsuarioRepository.getInstance();
    private categoriaUsuarioService = new CategoriaUsuarioService();
    private cursoService = new CursoService();

    async cadastrarUsuario(usuarioData: any) {
        const { nome, cpf, categoria_id, curso_id } = usuarioData;
        if (!nome || !cpf || !categoria_id || !curso_id) {
            throw new Error("Informações incompletas para o cadastro do usuário");
        }

        const novoUsuario = new UsuarioEntity(nome, cpf, parseInt(categoria_id), parseInt(curso_id));
        if (await this.validarUsuario(novoUsuario)) {
            return await this.usuarioRepository.inserirUsuario(novoUsuario);
        }
    }

    async listarUsuarios(): Promise<UsuarioEntity[]> {
        return await this.usuarioRepository.buscarUsuarios();
    }

    filtrarUsuarios(usuarios:UsuarioEntity[], filtro?: number, valor?: any) {
        if (filtro !== undefined && valor !== undefined) {
            switch (filtro) {
                case 1:
                    const categoria = parseInt(valor);
                    usuarios = usuarios.filter(u => u.categoria_id == categoria);
                    break;
                case 2:
                    const curso = valor;
                    usuarios = usuarios.filter(u => u.curso_id == curso);
                    break;
            }
        }
        return usuarios;
    }

    async filtrarPorCPF(cpf: string) {
        const usuario = await this.usuarioRepository.buscarUsuarioCPF(cpf);
        return usuario;
    }

    async atualizarUsuario(usuarioData: any, cpf: string): Promise<UsuarioEntity> {
        const { nome, ativo, categoria_id, curso_id } = usuarioData;
        return await this.usuarioRepository.alterarUsuario(nome, ativo, categoria_id, curso_id, cpf);
    }

    async removerUsuario(cpf: string) {
        const usuario = await this.filtrarPorCPF(cpf);
        if (await this.verificarEmprestimosAtivos(usuario.id)) {
            throw new Error("Usuário possui emprestimos pendentes no sistema");
        } else {
            await this.usuarioRepository.excluirUsuario(cpf);
        }
    }

    async verificarEmprestimosAtivos(usuario_id: number) {
        return await this.usuarioRepository.existeEmprestimosAtivos(usuario_id);
    }

    async validarUsuario(usuario: UsuarioEntity): Promise<boolean> {
        const curso = await this.cursoService.validarCurso(usuario.curso_id);
        const categoria = await this.categoriaUsuarioService.validarCategoriaUsuario(usuario.categoria_id);
        if (categoria) {
            if (curso) {
                return true;
            } else {
                throw new Error("Curso inválido");
            }
        } else {
            if (!curso) {
                throw new Error("Categoria e curso inválidos");
            } else {
                throw new Error("Categoria inválida");
            }
        }
    }
}