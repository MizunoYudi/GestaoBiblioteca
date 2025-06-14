"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = __importDefault(require("express"));
const CategoriaLivroController_1 = require("./controller/CategoriaLivroController");
const app = (0, express_1.default)();
const PORT = process.env.PORT ?? 3090;
app.use(express_1.default.json());
const categoriaLivroController = new CategoriaLivroController_1.CategoriaLivroController();
app.get('/library/categorias-livro', categoriaLivroController.exibirCategoriaLivro);
app.listen(PORT, () => console.log(`API em execução no URL: http://localhost:${PORT}`));
