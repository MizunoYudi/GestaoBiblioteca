"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.UsuarioService = void 0;
const Usuario_1 = require("../model/Usuario");
const CategoriaUsuarioRepository_1 = require("../repository/CategoriaUsuarioRepository");
const CursoRepository_1 = require("../repository/CursoRepository");
const EmprestimoRepository_1 = require("../repository/EmprestimoRepository");
const UsuarioRepository_1 = require("../repository/UsuarioRepository");
class UsuarioService {
    usuarioRepository = UsuarioRepository_1.UsuarioRepository.getInstance();
    categoriaUsuarioRepository = CategoriaUsuarioRepository_1.CategoriaUsuarioRepository.getInstance();
    cursoRepository = CursoRepository_1.CursoRepository.getInstance();
    emprestimoRepository = EmprestimoRepository_1.EmprestimoRepository.getInstance();
    cadastrarUsuario(usuarioData) {
        const { id, nome, cpf, ativo, categoria_id, curso_id } = usuarioData;
        if (!id || !nome || !cpf || !ativo || !categoria_id || !curso_id) {
            throw new Error("Informações incompletas para o cadastro do usuário");
        }
        const novoUsuario = new Usuario_1.Usuario(parseInt(id), nome, cpf, ativo, parseInt(categoria_id), parseInt(curso_id));
        if (this.validarCPF(novoUsuario.cpf) && this.validarUsuario(novoUsuario)) {
            this.usuarioRepository.inserirUsuario(novoUsuario);
            return novoUsuario;
        }
    }
    listarUsuarios(filtro, valor) {
        let usuarios = this.usuarioRepository.buscarUsuarios();
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
        const curso = this.cursoRepository.verificarCurso(usuario.curso_id);
        const categoria = this.categoriaUsuarioRepository.verificarCategoria(usuario.categoria_id);
        if (categoria) {
            if (curso) {
                return true;
            }
            else {
                throw new Error("Curso inválido");
            }
        }
        else {
            throw new Error("Categoria inválida");
        }
    }
    validarCPF(cpf) {
        if (cpf.length != 11) {
            throw new Error("CPF inválido: não possui 11 numeros");
        }
        else {
            const cpfNum = cpf.split('').map(Number);
            if (cpfNum.every(n => n == cpfNum[0])) {
                throw new Error("CPF inválido: é uma sequência de números repetidos");
            }
            const dig_10 = this.validarDigito(10, cpfNum);
            const copiaCPF = cpfNum;
            copiaCPF.push(dig_10);
            const dig_11 = this.validarDigito(11, copiaCPF);
            if (dig_10 == cpfNum[9] && dig_11 == cpfNum[10]) {
                return true;
            }
            else {
                throw new Error("CPF inválido: digitos de verificacao invalidos");
            }
        }
    }
    validarDigito(digito, cpfNum) {
        let soma = 0;
        for (let i = 0; i < digito - 1; i++) {
            soma += cpfNum[i] * (digito - i);
        }
        const divisao = soma % 11;
        if (divisao < 2) {
            return 0;
        }
        else {
            return 11 - divisao;
        }
    }
}
exports.UsuarioService = UsuarioService;
