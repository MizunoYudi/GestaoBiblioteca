import express, { Request, Response } from "express";
import { exibirCategoriaLivro } from "./controller/CategoriaLivroController";
const app = express();
const PORT = process.env.PORT ?? 3090 
app.use(express.json());

app.get('library/categorias-livro', exibirCategoriaLivro);