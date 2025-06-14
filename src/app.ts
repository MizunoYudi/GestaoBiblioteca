import express from "express";
import { CategoriaLivroController } from "./controller/CategoriaLivroController";
const app = express();
const PORT = process.env.PORT ?? 3090 
app.use(express.json());

const categoriaLivroController = new CategoriaLivroController();

app.get('/library/categorias-livro', categoriaLivroController.exibirCategoriaLivro);

app.listen(PORT, () => console.log(`API em execução no URL: http://localhost:${PORT}`));