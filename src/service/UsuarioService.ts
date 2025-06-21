import { Usuario } from "../model/Usuario";
import { UsuarioRepository } from "../repository/UsuarioRepository";

export class UsuarioService {
    usuarioRepository = UsuarioRepository.getInstance();

    cadastrarUsuario(usuarioData: any) {
        const { id, nome, cpf, ativo, categoria_id, curso_id } = usuarioData;
        if (!id || !nome || !cpf || !ativo || !categoria_id || !curso_id) {
            throw new Error("Informações incompletas para o cadastro do usuário");
        }

        const novoUsuario = new Usuario(parseInt(id), nome, cpf, ativo, parseInt(categoria_id), parseInt(curso_id));
        if(this.validarCPF(novoUsuario.cpf)){
            this.usuarioRepository.inserirUsuario(novoUsuario);
            return novoUsuario;
        }
    }

    validarCPF(cpf: string): boolean {
        if (cpf.length != 11) {
            throw new Error("CPF inválido: não possui 11 numeros")
        } else {
            const cpfNum = cpf.split('').map(Number);

            if (cpfNum.every(n => n == cpfNum[0])) {
                throw new Error("CPF inválido: é uma sequência de números repetidos");
            } else {
                const dig_10 = this.validarDigito(10, cpfNum);
                const dig_11 = this.validarDigito(11, cpfNum);

                if(dig_10 == cpfNum[10] && dig_11 == cpfNum[11]){
                    return true;
                } else {
                    throw new Error("CPF inválido: digitos de verificacao invalidos");
                }
            }
        }
        return false;
    }

    validarDigito(digito: number, cpfNum: number[]): number {
        let soma = 0;
        for (let i = 0; i < digito - 1; i++) {
            soma += cpfNum[i] * (digito - i);
        }
        const divisao = (soma * 100) % 11;
        if (divisao < 2 || divisao == 10) {
            return 0;
        } else {
            return 11 - divisao;
        }
    }

    listarUsuarios() {
        const usuarios = this.usuarioRepository.buscarUsuarios();
        return usuarios;
    }

    filtrarPorCPF(cpf: string) {
        const usuario = this.usuarioRepository.buscarUsuarioCPF(cpf);
        return usuario;
    }

    atualizarUsuario(usuarioData: any, cpf: string) {
        const { nome, ativo, categoria_id, curso_id } = usuarioData;
        this.usuarioRepository.alterarUsuario(nome, ativo, categoria_id, curso_id, cpf);
    }

    removerUsuario(cpf: string) {
        this.usuarioRepository.excluirUsuario(cpf);
    }
}