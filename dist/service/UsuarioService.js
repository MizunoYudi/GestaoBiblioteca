"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.UsuarioService = void 0;
const Usuario_1 = require("../model/Usuario");
const CategoriaUsuarioService_1 = require("../service/CategoriaUsuarioService");
const EmprestimoRepository_1 = require("../repository/EmprestimoRepository");
const UsuarioRepository_1 = require("../repository/UsuarioRepository");
const CursoService_1 = require("./CursoService");
class UsuarioService {
    usuarioRepository = UsuarioRepository_1.UsuarioRepository.getInstance();
    categoriaUsuarioService = new CategoriaUsuarioService_1.CategoriaUsuarioService();
    cursoService = new CursoService_1.CursoService();
    emprestimoRepository = EmprestimoRepository_1.EmprestimoRepository.getInstance();
    cadastrarUsuario(usuarioData) {
        const { nome, cpf, categoria_id, curso_id } = usuarioData;
        if (!nome || !cpf || !categoria_id || !curso_id) {
            throw new Error("Informações incompletas para o cadastro do usuário");
        }
        const novoUsuario = new Usuario_1.Usuario(nome, cpf, parseInt(categoria_id), parseInt(curso_id));
        if (this.validarUsuario(novoUsuario)) {
            this.usuarioRepository.inserirUsuario(novoUsuario);
            return novoUsuario;
        }
    }
    listarUsuarios() {
        return this.usuarioRepository.buscarUsuarios();
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
    filtrarPorCPF(cpf) {
        const usuario = this.usuarioRepository.buscarUsuarioCPF(cpf);
        return usuario;
    }
    atualizarUsuario(usuarioData, cpf) {
        const { nome, ativo, categoria_id, curso_id } = usuarioData;
        return this.usuarioRepository.alterarUsuario(nome, ativo, categoria_id, curso_id, cpf);
    }
    removerUsuario(cpf) {
        const usuario = this.filtrarPorCPF(cpf);
        if (this.verificarEmprestimo(usuario.id)) {
            throw new Error("Usuário possui emprestimos pendentes no sistema");
        }
        else {
            this.usuarioRepository.excluirUsuario(cpf);
        }
    }
    verificarEmprestimo(usuario_id) {
        if (this.emprestimoRepository.buscarUsuarioEmprestimo(usuario_id)) {
            return true;
        }
        else {
            return false;
        }
    }
    validarUsuario(usuario) {
        const curso = this.cursoService.validarCurso(usuario.curso_id);
        const categoria = this.categoriaUsuarioService.validarCategoriaUsuario(usuario.categoria_id);
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
