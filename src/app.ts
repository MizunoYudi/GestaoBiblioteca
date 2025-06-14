import express from "express";
import { exibirCategoriaLivro } from "./controller/CategoriaLivroController";
const app = express();
const PORT = process.env.PORT ?? 3090 
app.use(express.json());

app.get('/library/categorias-livro', exibirCategoriaLivro);

app.listen(PORT, () => console.log(`API em execução no URL: http://localhost:${PORT}`));