import express from "express";
import { CategoriaLivroController } from "./controller/CategoriaLivroController";
import { CategoriaUsuarioController } from "./controller/CategoriaUsuarioController";
import { CursoController } from "./controller/CursoController";
import { LivroController } from "./controller/LivroController";
import { UsuarioController } from "./controller/UsuarioController";
import { EstoqueController } from "./controller/EstoqueController";
const app = express();
const PORT = process.env.PORT ?? 3090 
app.use(express.json());

const categoriaLivroController = new CategoriaLivroController();
const categoriaUsuarioController = new CategoriaUsuarioController();
const cursoController = new CursoController();
const livroController = new LivroController();
const usuarioController = new UsuarioController();
const estoqueController = new EstoqueController();

app.get('/library/categorias-livro', categoriaLivroController.exibirCategoriaLivro);
app.get('/library/categorias-usuario', categoriaUsuarioController.exibirCategoriaUsuario);
app.get('/library/cursos', cursoController.exibirCursos);

app.post('/library/livros', livroController.novoLivro);
app.get('/library/livros', livroController.exibirLivros);
app.get('/library/livros/:isbn', livroController.filtrarLivroPorIsbn);
app.put('/library/livros/:isbn', livroController.atualizarLivro);
app.delete('/library/livros/:isbn', livroController.apagarLivro);

app.post('/library/usuarios', usuarioController.novoUsuario);
app.get('/library/usuarios', usuarioController.exibirUsuarios);
app.get('/library/usuarios/:cpf', usuarioController.filtrarUsuarioPorCPF);
app.put('/library/usuarios/:cpf', usuarioController.atualizarUsuario);
app.delete('/library/usuarios/:cpf', usuarioController.apagarUsuario);

app.post('/library/estoque', estoqueController.novoExemplar);
app.get('/library/estoque', estoqueController.exibirExemplares);
app.get('/library/estoque/:id', estoqueController.filtrarExemplarPorId);
app.put('/library/estoque/:id', estoqueController.atualizarDiponibilidade);
app.delete('/library/estoque/:id', estoqueController.apagarExemplar);


app.listen(PORT, () => console.log(`API em execução no URL: http://localhost:${PORT}`));