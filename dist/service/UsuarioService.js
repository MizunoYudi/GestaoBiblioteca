"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.UsuarioService = void 0;
const UsuarioEntity_1 = require("../model/entity/UsuarioEntity");
const CategoriaUsuarioService_1 = require("../service/CategoriaUsuarioService");
const UsuarioRepository_1 = require("../repository/UsuarioRepository");
const CursoService_1 = require("./CursoService");
class UsuarioService {
    usuarioRepository = UsuarioRepository_1.UsuarioRepository.getInstance();
    categoriaUsuarioService = new CategoriaUsuarioService_1.CategoriaUsuarioService();
    cursoService = new CursoService_1.CursoService();
    async cadastrarUsuario(usuarioData) {
        const { nome, cpf, categoria_id, curso_id } = usuarioData;
        if (!nome || !cpf || !categoria_id || !curso_id) {
            throw new Error("Informações incompletas para o cadastro do usuário");
        }
        const novoUsuario = new UsuarioEntity_1.UsuarioEntity(nome, cpf, parseInt(categoria_id), parseInt(curso_id));
        if (await this.validarUsuario(novoUsuario)) {
            return await this.usuarioRepository.inserirUsuario(novoUsuario);
        }
    }
    async listarUsuarios() {
        return await this.usuarioRepository.buscarUsuarios();
    }
    filtrarUsuarios(usuarios, filtro, valor) {
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
    async filtrarPorCPF(cpf) {
        const usuario = await this.usuarioRepository.buscarUsuarioCPF(cpf);
        return usuario;
    }
    async atualizarUsuario(usuarioData, cpf) {
        const { nome, ativo, categoria_id, curso_id } = usuarioData;
        return await this.usuarioRepository.alterarUsuario(nome, ativo, categoria_id, curso_id, cpf);
    }
    async removerUsuario(cpf) {
        const usuario = await this.filtrarPorCPF(cpf);
        if (await this.verificarEmprestimosAtivos(usuario.id)) {
            throw new Error("Usuário possui emprestimos pendentes no sistema");
        }
        else {
            await this.usuarioRepository.excluirUsuario(cpf);
        }
    }
    async verificarEmprestimosAtivos(usuario_id) {
        return await this.usuarioRepository.existeEmprestimosAtivos(usuario_id);
    }
    async validarUsuario(usuario) {
        const curso = await this.cursoService.validarCurso(usuario.curso_id);
        const categoria = await this.categoriaUsuarioService.validarCategoriaUsuario(usuario.categoria_id);
        if (categoria) {
            if (curso) {
                return true;
            }
            else {
                throw new Error("Curso inválido");
            }
        }
        else {
            if (!curso) {
                throw new Error("Categoria e curso inválidos");
            }
            else {
                throw new Error("Categoria inválida");
            }
        }
    }
}
exports.UsuarioService = UsuarioService;
