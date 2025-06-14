import express from "express";
import { CategoriaLivroController } from "./controller/CategoriaLivroController";
import { CategoriaUsuarioController } from "./controller/CategoriaUsuarioController";
import { CursoController } from "./controller/CursoController";
const app = express();
const PORT = process.env.PORT ?? 3090 
app.use(express.json());

const categoriaLivroController = new CategoriaLivroController();
const categoriaUsuarioController = new CategoriaUsuarioController();
const cursoController = new CursoController();

app.get('/library/categorias-livro', categoriaLivroController.exibirCategoriaLivro);
app.get('/library/categorias-usuario', categoriaUsuarioController.exibirCategoriaUsuario);
app.get('/library/cursos', cursoController.exibirCursos);

app.listen(PORT, () => console.log(`API em execução no URL: http://localhost:${PORT}`));