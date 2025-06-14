import express from "express";
import { CategoriaLivroController } from "./controller/CategoriaLivroController";
import { CategoriaUsuarioController } from "./controller/CategoriaUsuarioController";
const app = express();
const PORT = process.env.PORT ?? 3090 
app.use(express.json());

const categoriaLivroController = new CategoriaLivroController();
const categoriaUsuarioController = new CategoriaUsuarioController();

app.get('/library/categorias-livro', categoriaLivroController.exibirCategoriaLivro);
app.get('/library/categorias-usuario', categoriaUsuarioController.exibirCategoriaUsuario);

app.listen(PORT, () => console.log(`API em execução no URL: http://localhost:${PORT}`));