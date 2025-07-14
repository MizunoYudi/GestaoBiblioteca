"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (this && this.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};
var __param = (this && this.__param) || function (paramIndex, decorator) {
    return function (target, key) { decorator(target, key, paramIndex); }
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.LivroController = void 0;
const tsoa_1 = require("tsoa");
const BasicResponseDto_1 = require("../model/dto/BasicResponseDto");
const LivroService_1 = require("../service/LivroService");
const LivroDto_1 = require("../model/dto/LivroDto");
let LivroController = class LivroController {
    livroService = new LivroService_1.LivroService();
    async novoLivro(dto, fail, sucess) {
        try {
            const livro = await this.livroService.cadastrarLivro(dto);
            return sucess(201, new BasicResponseDto_1.BasicResponseDto("Livro criado: ", livro));
        }
        catch (e) {
            return fail(400, new BasicResponseDto_1.BasicResponseDto(`Erro ao criar o Livro: \n${e.message}`, undefined));
        }
    }
    async exibirLivros(fail, sucess, titulo, autor, editora, edicao) {
        try {
            let livros = await this.livroService.listarLivros();
            if (titulo != undefined) {
                livros = this.livroService.filtrarLivros(livros, 1, titulo);
            }
            if (autor != undefined) {
                livros = this.livroService.filtrarLivros(livros, 2, autor);
            }
            if (editora != undefined) {
                livros = this.livroService.filtrarLivros(livros, 3, editora);
            }
            if (edicao != undefined) {
                livros = this.livroService.filtrarLivros(livros, 4, edicao);
            }
            return sucess(200, new BasicResponseDto_1.BasicResponseDto("Livros: ", livros));
        }
        catch (e) {
            return fail(400, new BasicResponseDto_1.BasicResponseDto(`Erro ao buscar Livros: \n${e.message}`, undefined));
        }
    }
    async filtrarLivroPorIsbn(isbn, fail, sucess) {
        try {
            const livro = await this.livroService.filtrarPorISBN(isbn);
            return sucess(200, new BasicResponseDto_1.BasicResponseDto("Livros encontrado!", livro));
        }
        catch (e) {
            return fail(400, new BasicResponseDto_1.BasicResponseDto(`Erro ao buscar Livro: \n${e.message}`, undefined));
        }
    }
    async atualizarLivro(dto, isbn, fail, sucess) {
        try {
            const livro = await this.livroService.atualizarLivro(dto, isbn);
            return sucess(200, new BasicResponseDto_1.BasicResponseDto("Livro atualizado!", livro));
        }
        catch (e) {
            return fail(400, new BasicResponseDto_1.BasicResponseDto(`Erro ao atualizar livro: \n${e.message}`, undefined));
        }
    }
    async apagarLivro(isbn, fail, sucess) {
        try {
            await this.livroService.removerLivro(isbn);
            return sucess(200, new BasicResponseDto_1.BasicResponseDto("Livro removido!", undefined));
        }
        catch (e) {
            return fail(400, new BasicResponseDto_1.BasicResponseDto(`Erro ao remover o livro: \n${e.message}`, undefined));
        }
    }
};
exports.LivroController = LivroController;
__decorate([
    (0, tsoa_1.Post)(),
    __param(0, (0, tsoa_1.Body)()),
    __param(1, (0, tsoa_1.Res)()),
    __param(2, (0, tsoa_1.Res)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [LivroDto_1.LivroDto, Function, Function]),
    __metadata("design:returntype", Promise)
], LivroController.prototype, "novoLivro", null);
__decorate([
    (0, tsoa_1.Get)(),
    __param(0, (0, tsoa_1.Res)()),
    __param(1, (0, tsoa_1.Res)()),
    __param(2, (0, tsoa_1.Query)()),
    __param(3, (0, tsoa_1.Query)()),
    __param(4, (0, tsoa_1.Query)()),
    __param(5, (0, tsoa_1.Query)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Function, Function, String, String, String, String]),
    __metadata("design:returntype", Promise)
], LivroController.prototype, "exibirLivros", null);
__decorate([
    (0, tsoa_1.Get)("{isbn}"),
    __param(0, (0, tsoa_1.Path)()),
    __param(1, (0, tsoa_1.Res)()),
    __param(2, (0, tsoa_1.Res)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [String, Function, Function]),
    __metadata("design:returntype", Promise)
], LivroController.prototype, "filtrarLivroPorIsbn", null);
__decorate([
    (0, tsoa_1.Put)("{isbn}"),
    __param(0, (0, tsoa_1.Body)()),
    __param(1, (0, tsoa_1.Path)()),
    __param(2, (0, tsoa_1.Res)()),
    __param(3, (0, tsoa_1.Res)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [LivroDto_1.LivroDto, String, Function, Function]),
    __metadata("design:returntype", Promise)
], LivroController.prototype, "atualizarLivro", null);
__decorate([
    (0, tsoa_1.Delete)("{isbn}"),
    __param(0, (0, tsoa_1.Path)()),
    __param(1, (0, tsoa_1.Res)()),
    __param(2, (0, tsoa_1.Res)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [String, Function, Function]),
    __metadata("design:returntype", Promise)
], LivroController.prototype, "apagarLivro", null);
exports.LivroController = LivroController = __decorate([
    (0, tsoa_1.Route)("livros"),
    (0, tsoa_1.Tags)("Livros")
], LivroController);
