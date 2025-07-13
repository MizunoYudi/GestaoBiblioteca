import { Usuario } from "../model/entity/UsuarioEntity";
import { CategoriaUsuarioService } from "../service/CategoriaUsuarioService";
import { UsuarioRepository } from "../repository/UsuarioRepository";
import { CursoService } from "./CursoService";
import { EmprestimoService } from "./EmprestimoService";

export class UsuarioService {
    private usuarioRepository = UsuarioRepository.getInstance();
    private categoriaUsuarioService = new CategoriaUsuarioService();
    private cursoService = new CursoService();
    private emprestimoService = new EmprestimoService();

    cadastrarUsuario(usuarioData: any) {
        const { nome, cpf, categoria_id, curso_id } = usuarioData;
        if (!nome || !cpf || !categoria_id || !curso_id) {
            throw new Error("Informações incompletas para o cadastro do usuário");
        }

        const novoUsuario = new Usuario(nome, cpf, parseInt(categoria_id), parseInt(curso_id));
        if (this.validarUsuario(novoUsuario)) {
            this.usuarioRepository.inserirUsuario(novoUsuario);
            return novoUsuario;
        }
    }

    listarUsuarios(): Usuario[] {
        return this.usuarioRepository.buscarUsuarios();
    }

    filtrarUsuarios(usuarios: Usuario[], filtro?: number, valor?: any) {
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

    filtrarPorCPF(cpf: string) {
        const usuario = this.usuarioRepository.buscarUsuarioCPF(cpf);
        return usuario;
    }

    atualizarUsuario(usuarioData: any, cpf: string): Usuario {
        const { nome, ativo, categoria_id, curso_id } = usuarioData;
        return this.usuarioRepository.alterarUsuario(nome, ativo, categoria_id, curso_id, cpf);
    }

    removerUsuario(cpf: string) {
        const usuario = this.filtrarPorCPF(cpf);
        if (this.verificarEmprestimosAtivos(usuario.id)) {
            throw new Error("Usuário possui emprestimos pendentes no sistema");
        } else {
            this.usuarioRepository.excluirUsuario(cpf);
        }
    }

    verificarEmprestimosAtivos(usuario_id: number) {
        const emprestimos = this.emprestimoService.listarEmprestimos().filter(e => e.usuario_id == usuario_id);
        if (emprestimos.filter(e => e.data_entrega == undefined).length != 0) {
            return true;
        } else {
            return false;
        }
    }

    validarUsuario(usuario: Usuario): boolean {
        const curso = this.cursoService.validarCurso(usuario.curso_id);
        const categoria = this.categoriaUsuarioService.validarCategoriaUsuario(usuario.categoria_id);
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