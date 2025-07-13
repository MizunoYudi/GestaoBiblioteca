export class UsuarioEntity {
    id: number;
    nome: string;
    cpf: string;
    ativo: string;
    categoria_id: number;
    curso_id: number;

    constructor(
        nome: string,
        cpf: string,
        categoria_id: number,
        curso_id: number,
        id?: number,
        ativo?: string
    ) {
        if(!this.validarCPF(cpf)){
            throw new Error("CPF invalido");
        }
        this.nome = nome;
        this.cpf = cpf;
        this.categoria_id = categoria_id;
        this.curso_id = curso_id;
        this.id = id || 0;
        this.ativo = ativo || 'ativo';
    }

    private validarCPF(cpf: string): boolean {
        if (cpf.length != 11) {
            throw new Error("CPF inválido: não possui 11 numeros")
        } else {
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
            } else {
                throw new Error("CPF inválido: digitos de verificacao invalidos");
            }
        }
    }

    private validarDigito(digito: number, cpfNum: number[]): number {
        let soma = 0;
        for (let i = 0; i < digito - 1; i++) {
            soma += cpfNum[i] * (digito - i);
        }
        const divisao = soma % 11;
        if (divisao < 2) {
            return 0;
        } else {
            return 11 - divisao;
        }
    }
}