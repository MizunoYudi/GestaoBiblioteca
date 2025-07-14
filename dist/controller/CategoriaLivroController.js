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
exports.CategoriaLivroController = void 0;
const tsoa_1 = require("tsoa");
const CategoriaLivroService_1 = require("../service/CategoriaLivroService");
const BasicResponseDto_1 = require("../model/dto/BasicResponseDto");
let CategoriaLivroController = class CategoriaLivroController {
    categoriaLivroService = new CategoriaLivroService_1.CategoriaLivroService();
    async exibirCategoriaLivro(fail, sucess) {
        try {
            const categorias = await this.categoriaLivroService.listarCategoriaLivro();
            return sucess(200, new BasicResponseDto_1.BasicResponseDto("Categorias: ", categorias));
        }
        catch (e) {
            return fail(404, new BasicResponseDto_1.BasicResponseDto(`Erro ao buscar categorias: \n${e.message}`, undefined));
        }
    }
};
exports.CategoriaLivroController = CategoriaLivroController;
__decorate([
    (0, tsoa_1.Get)(),
    __param(0, (0, tsoa_1.Res)()),
    __param(1, (0, tsoa_1.Res)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Function, Function]),
    __metadata("design:returntype", Promise)
], CategoriaLivroController.prototype, "exibirCategoriaLivro", null);
exports.CategoriaLivroController = CategoriaLivroController = __decorate([
    (0, tsoa_1.Route)("catalogos/categorias-livros"),
    (0, tsoa_1.Tags)("CategoriaLivro")
], CategoriaLivroController);
