"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = __importDefault(require("express"));
const CategoriaLivroController_1 = require("./controller/CategoriaLivroController");
const CategoriaUsuarioController_1 = require("./controller/CategoriaUsuarioController");
const CursoController_1 = require("./controller/CursoController");
const app = (0, express_1.default)();
const PORT = process.env.PORT ?? 3090;
app.use(express_1.default.json());
const categoriaLivroController = new CategoriaLivroController_1.CategoriaLivroController();
const categoriaUsuarioController = new CategoriaUsuarioController_1.CategoriaUsuarioController();
const cursoController = new CursoController_1.CursoController();
app.get('/library/categorias-livro', categoriaLivroController.exibirCategoriaLivro);
app.get('/library/categorias-usuario', categoriaUsuarioController.exibirCategoriaUsuario);
app.get('/library/cursos', cursoController.exibirCursos);
app.listen(PORT, () => console.log(`API em execução no URL: http://localhost:${PORT}`));
