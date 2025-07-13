import { executarComandoSQL } from "../database/mysql";
import { CategoriaUsuarioEntity } from "../model/entity/CategoriaUsuarioEntity";

export class CategoriaUsuarioRepository {
    private static instance: CategoriaUsuarioRepository;

    private constructor() {
        this.criarTabela();
    };

    private async criarTabela(){
        const query = `
            CREATE TABLE IF NOT EXISTS biblioteca.Categoria_Usuario (
                id INT AUTO_INCREMENT PRIMARY KEY,
                nome VARCHAR(80) NOT NULL
            );
        `;
        try{
            const resultado = await executarComandoSQL(query, []);
            console.log('Tabela Categoria Usuario criada: ', resultado);
        } catch(err: any) {
            console.log("Erro ao criar a tabela Categoria Usuario: ", err);
        }
    }

    public static getInstance(): CategoriaUsuarioRepository {
        if (!this.instance) {
            this.instance = new CategoriaUsuarioRepository();
        }
        return this.instance;
    }

    async buscarCategorias() {
        const query = `
            select * from biblioteca.Categoria_Usuario;
        `
        const resultado = await executarComandoSQL(query, []);
        return resultado;
    }

    async verificarCategoria(id: number): Promise<boolean> {
        const query = `
            select * from biblioteca.Categoria_Usuario where id = ?;
        `;
        const resultado = await executarComandoSQL(query, [id]);
        if(resultado[0] != undefined){
            return true;
        } else {
            return false;
        }
    }
}