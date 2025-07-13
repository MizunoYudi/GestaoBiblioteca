import { executarComandoSQL } from "../database/mysql";
import { CategoriaLivroEntity } from "../model/entity/CategoriaLivroEntity";

export class CategoriaLivroRepository {
    private static instance: CategoriaLivroRepository;

    private constructor() {
        this.createTable();
    };

    private async createTable(){
        const query = `
            CREATE TABLE IF NOT EXISTS biblioteca.Categoria_Livro (
                id INT AUTO_INCREMENT PRIMARY KEY,
                nome VARCHAR(80) NOT NULL
            );
        `;
        try{
            const resultado = await executarComandoSQL(query, []);
            console.log('Tabela Categoria Livro criada: ', resultado);
        } catch(err: any) {
            console.log("Erro ao criar a tabela Categoria Livro: ", err);
        }
    }

    public static getInstance(): CategoriaLivroRepository {
        if (!this.instance) {
            this.instance = new CategoriaLivroRepository();
        }
        return this.instance;
    }

    async buscarCategorias(): Promise<CategoriaLivroEntity> {
        const query = `
            select * from biblioteca.Categoria_Livro;
        `;
        const resultado = await executarComandoSQL(query, []);
        return resultado;
    }

    async verificarCategoria(id: number): Promise<boolean> {
        const query = `
            select * from biblioteca.Categoria_livro where id = ?
        `
        const resultado = await executarComandoSQL(query, [id]);
        if(resultado[0] != undefined){
            return true;
        } else {
            return false;
        }
    }
}