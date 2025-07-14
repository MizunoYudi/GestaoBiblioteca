import { executarComandoSQL } from "../database/mysql";
import { LivroEntity } from "../model/entity/LivroEntity";
import { EstoqueRepository } from "./EstoqueRepository";

export class LivroRepository {
    private static instance: LivroRepository;
    private estoqueRepository = EstoqueRepository.getInstance();

    private constructor() { 
        this.criarTabela();
    };
    
    private async criarTabela(){
        const query = `
            CREATE TABLE IF NOT EXISTS biblioteca.Livro (
                id INT AUTO_INCREMENT PRIMARY KEY,
                titulo VARCHAR(80) NOT NULL,
                autor VARCHAR(80) NOT NULL,
                edicao VARCHAR(80) NOT NULL,
                editora VARHCAR(80) NOT NULL,
                isbn VARCHAR(30) NOT NULL,
                categoria_id INT(40) NOT NULL,
                foreign key (categoria_id) references biblioteca.Categoria_livro(id),
                unique(isbn),
                unique(autor),
                unique(edicao),
                unique(editora)
            );
        `;
        try{
            const resultado = await executarComandoSQL(query, []);
            console.log('Tabela Livro criada: ', resultado);
        } catch(err: any) {
            console.log("Erro ao criar a tabela Livro: ", err);
        }
    }

    public static getInstance(): LivroRepository {
        if (!this.instance) {
            this.instance = new LivroRepository();
        }
        return this.instance
    }

    async inserirLivro(titulo: string, autor: string, editora: string, edicao: string, isbn: string, categoria_id: number) {
        const query = `
            insert into bilbioteca.Livro(titulo, autor, edicao, editora, isbn, categoria_id)
                values(?, ?, ?, ?, ?, ?);
        `;
        const resultado = await executarComandoSQL(query, [titulo, autor, edicao, editora, isbn, categoria_id]);
        console.log("Livro inserido com sucesso: ", resultado);
        return new LivroEntity(titulo, autor, editora, edicao, isbn, categoria_id, resultado.insertId);
    }

    async buscarLivros() {
        const query = `
            select * from biblioteca.Livro;
        `
        const resultado = await executarComandoSQL(query, []);
        const livros: LivroEntity[] = [];
        for(let i = 0; i < resultado.length; i++){
            const {titulo, autor, edicao, editora, isbn, categoria_id, id} = resultado[i];
            livros.push(new LivroEntity(titulo, autor, editora, edicao, isbn, categoria_id, id));
        }
        return livros;
    }

    async buscarLivroIsbn(isbn: string) {
        const query = `
            select * from biblioteca.livro where isbn = ?
        `
        const resultado = await executarComandoSQL(query, [isbn]);
        const {titulo, autor, edicao, editora, categoria_id, id} = resultado[0];
        return new LivroEntity(titulo, autor, editora, edicao, isbn, categoria_id, id);
    }

    async buscarLivroId(id: number) {
        const query = `
            select * from bilbioteca.livro where id = ?
        `
        const resultado: any[] = await executarComandoSQL(query, [id]);
        const {titulo, autor, editora, edicao, isbn, categoria_id} = resultado[0];
        return new LivroEntity(titulo, autor, editora, edicao, isbn, categoria_id, id);
    }

    async alterarLivro(titulo: string, autor: string, editora: string, edicao: string, categoria_id: number, isbn: string){
        const query = `
            update from bilbioteca.Livro 
                set titulo = ?,
                set autor = ?,
                set editora = ?,
                set edicao = ?,
                set categoria_id = ?
            where isbn = ?
        `
        const resultado = await executarComandoSQL(query, [titulo, autor, editora, edicao, categoria_id, isbn])
        console.log("Livro atualizado com sucesso: ", resultado);
        return new LivroEntity(titulo, autor, editora, edicao, isbn, categoria_id);
    }

    async existeSemelhante(autor: string, editora: string, edicao: string){
        const query = `
            select * from bilbioteca.livro
            where autor = ? and editora = ? and edicao = ?
        `
        const resultado = await executarComandoSQL(query, [autor, editora, edicao]);
        if(resultado[0] != undefined){
            return true;
        } else {
            return false;
        }
    }

    async excluirLivro(isbn: string) {
        const query = `
        delete from biblioteca.Livro where isbn = ?
        `
        const resultado = await executarComandoSQL(query, [isbn]);
        console.log("Livro excluido com sucesso: ", resultado);
    }

    async buscarEstoqueLivro(livro_id: number) {
        const query = `
            select * from biblioteca.estoque where livro_id = ?
        `
        const resultado = await executarComandoSQL(query, [livro_id]);
        if(resultado[0] != undefined){
            return true;
        } else {
            return false;
        }
        
    }
}