import { executarComandoSQL } from "../database/mysql";
import { CursoEntity } from "../model/entity/CursoEntity";

export class CursoRepository {
    private static instance: CursoRepository;

    private constructor() {
        this.criarTabela();
    };

    private async criarTabela(){
        const query = `
            CREATE TABLE IF NOT EXISTS biblioteca.Curso (
                id INT AUTO_INCREMENT PRIMARY KEY,
                nome VARCHAR(80) NOT NULL
            );
        `;
        try{
            const resultado = await executarComandoSQL(query, []);
            console.log('Tabela Curso criada: ', resultado);
        } catch(err: any) {
            console.log("Erro ao criar a tabela Curso: ", err);
        }
    }

    public static getInstance(): CursoRepository {
        if (!this.instance) {
            this.instance = new CursoRepository();
        }
        return this.instance;
    }

    async buscarCursos() {
        const query = `
            select * from biblioteca.Curso;
        `;
        const resultado = await executarComandoSQL(query, []);
        return resultado;
    }

    async verificarCurso(id: number): Promise<boolean> {
        const query = `
            select * from biblioteca.Curso where id = ?;
        `
        const resultado = await executarComandoSQL(query, [id]);
        if(resultado[0] != undefined){
            return true;
        } else {
            return false;
        }
    }
}