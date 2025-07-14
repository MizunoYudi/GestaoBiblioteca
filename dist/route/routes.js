"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.RegisterRoutes = RegisterRoutes;
const runtime_1 = require("@tsoa/runtime");
// WARNING: This file was auto-generated with tsoa. Please do not modify it. Re-run tsoa to re-generate this file: https://github.com/lukeautry/tsoa
const UsuarioController_1 = require("./../controller/UsuarioController");
// WARNING: This file was auto-generated with tsoa. Please do not modify it. Re-run tsoa to re-generate this file: https://github.com/lukeautry/tsoa
const LivroController_1 = require("./../controller/LivroController");
// WARNING: This file was auto-generated with tsoa. Please do not modify it. Re-run tsoa to re-generate this file: https://github.com/lukeautry/tsoa
const EstoqueController_1 = require("./../controller/EstoqueController");
// WARNING: This file was auto-generated with tsoa. Please do not modify it. Re-run tsoa to re-generate this file: https://github.com/lukeautry/tsoa
const EmprestimoController_1 = require("./../controller/EmprestimoController");
// WARNING: This file was auto-generated with tsoa. Please do not modify it. Re-run tsoa to re-generate this file: https://github.com/lukeautry/tsoa
const CursoController_1 = require("./../controller/CursoController");
// WARNING: This file was auto-generated with tsoa. Please do not modify it. Re-run tsoa to re-generate this file: https://github.com/lukeautry/tsoa
const CategoriaUsuarioController_1 = require("./../controller/CategoriaUsuarioController");
// WARNING: This file was auto-generated with tsoa. Please do not modify it. Re-run tsoa to re-generate this file: https://github.com/lukeautry/tsoa
const CategoriaLivroController_1 = require("./../controller/CategoriaLivroController");
// WARNING: This file was auto-generated with tsoa. Please do not modify it. Re-run tsoa to re-generate this file: https://github.com/lukeautry/tsoa
const models = {
    "UsuarioDto": {
        "dataType": "refObject",
        "properties": {
            "id": { "dataType": "double", "required": true },
            "nome": { "dataType": "string", "required": true },
            "cpf": { "dataType": "string", "required": true },
            "status": { "dataType": "string", "required": true },
            "categoria_id": { "dataType": "double", "required": true },
            "curso_id": { "dataType": "double", "required": true },
        },
        "additionalProperties": false,
    },
    // WARNING: This file was auto-generated with tsoa. Please do not modify it. Re-run tsoa to re-generate this file: https://github.com/lukeautry/tsoa
    "BasicResponseDto": {
        "dataType": "refObject",
        "properties": {
            "message": { "dataType": "string", "required": true },
            "object": { "dataType": "any", "required": true },
        },
        "additionalProperties": false,
    },
    // WARNING: This file was auto-generated with tsoa. Please do not modify it. Re-run tsoa to re-generate this file: https://github.com/lukeautry/tsoa
    "LivroDto": {
        "dataType": "refObject",
        "properties": {
            "id": { "dataType": "double", "required": true },
            "titulo": { "dataType": "string", "required": true },
            "autor": { "dataType": "string", "required": true },
            "editora": { "dataType": "string", "required": true },
            "edicao": { "dataType": "string", "required": true },
            "isbn": { "dataType": "string", "required": true },
            "categoria_id": { "dataType": "double", "required": true },
        },
        "additionalProperties": false,
    },
    // WARNING: This file was auto-generated with tsoa. Please do not modify it. Re-run tsoa to re-generate this file: https://github.com/lukeautry/tsoa
    "EstoqueDto": {
        "dataType": "refObject",
        "properties": {
            "id": { "dataType": "double", "required": true },
            "livro_id": { "dataType": "double", "required": true },
            "quantidade": { "dataType": "double", "required": true },
            "quantidade_emprestada": { "dataType": "double", "required": true },
            "disponivel": { "dataType": "boolean", "required": true },
        },
        "additionalProperties": false,
    },
    // WARNING: This file was auto-generated with tsoa. Please do not modify it. Re-run tsoa to re-generate this file: https://github.com/lukeautry/tsoa
    "EmprestimoDto": {
        "dataType": "refObject",
        "properties": {
            "id": { "dataType": "double", "required": true },
            "usuario_id": { "dataType": "double", "required": true },
            "estoque_id": { "dataType": "double", "required": true },
            "data_emprestimo": { "dataType": "union", "subSchemas": [{ "dataType": "datetime" }, { "dataType": "undefined" }], "required": true },
            "data_devolucao": { "dataType": "union", "subSchemas": [{ "dataType": "datetime" }, { "dataType": "undefined" }], "required": true },
            "data_entrega": { "dataType": "union", "subSchemas": [{ "dataType": "datetime" }, { "dataType": "undefined" }], "required": true },
            "dias_atraso": { "dataType": "double", "required": true },
            "suspensao_ate": { "dataType": "union", "subSchemas": [{ "dataType": "datetime" }, { "dataType": "undefined" }], "required": true },
        },
        "additionalProperties": false,
    },
    // WARNING: This file was auto-generated with tsoa. Please do not modify it. Re-run tsoa to re-generate this file: https://github.com/lukeautry/tsoa
};
const templateService = new runtime_1.ExpressTemplateService(models, { "noImplicitAdditionalProperties": "throw-on-extras", "bodyCoercion": true });
// WARNING: This file was auto-generated with tsoa. Please do not modify it. Re-run tsoa to re-generate this file: https://github.com/lukeautry/tsoa
function RegisterRoutes(app) {
    // ###########################################################################################################
    //  NOTE: If you do not see routes for all of your controllers in this file, then you might not have informed tsoa of where to look
    //      Please look into the "controllerPathGlobs" config option described in the readme: https://github.com/lukeautry/tsoa
    // ###########################################################################################################
    const argsUsuarioController_novoUsuario = {
        dto: { "in": "body", "name": "dto", "required": true, "ref": "UsuarioDto" },
        fail: { "in": "res", "name": "400", "required": true, "ref": "BasicResponseDto" },
        sucess: { "in": "res", "name": "201", "required": true, "ref": "BasicResponseDto" },
    };
    app.post('/usuarios', ...((0, runtime_1.fetchMiddlewares)(UsuarioController_1.UsuarioController)), ...((0, runtime_1.fetchMiddlewares)(UsuarioController_1.UsuarioController.prototype.novoUsuario)), async function UsuarioController_novoUsuario(request, response, next) {
        // WARNING: This file was auto-generated with tsoa. Please do not modify it. Re-run tsoa to re-generate this file: https://github.com/lukeautry/tsoa
        let validatedArgs = [];
        try {
            validatedArgs = templateService.getValidatedArgs({ args: argsUsuarioController_novoUsuario, request, response });
            const controller = new UsuarioController_1.UsuarioController();
            await templateService.apiHandler({
                methodName: 'novoUsuario',
                controller,
                response,
                next,
                validatedArgs,
                successStatus: undefined,
            });
        }
        catch (err) {
            return next(err);
        }
    });
    // WARNING: This file was auto-generated with tsoa. Please do not modify it. Re-run tsoa to re-generate this file: https://github.com/lukeautry/tsoa
    const argsUsuarioController_exibirUsuarios = {
        fail: { "in": "res", "name": "400", "required": true, "ref": "BasicResponseDto" },
        sucess: { "in": "res", "name": "200", "required": true, "ref": "BasicResponseDto" },
        categoria_id: { "in": "query", "name": "categoria_id", "dataType": "string" },
        curso_id: { "in": "query", "name": "curso_id", "dataType": "string" },
    };
    app.get('/usuarios', ...((0, runtime_1.fetchMiddlewares)(UsuarioController_1.UsuarioController)), ...((0, runtime_1.fetchMiddlewares)(UsuarioController_1.UsuarioController.prototype.exibirUsuarios)), async function UsuarioController_exibirUsuarios(request, response, next) {
        // WARNING: This file was auto-generated with tsoa. Please do not modify it. Re-run tsoa to re-generate this file: https://github.com/lukeautry/tsoa
        let validatedArgs = [];
        try {
            validatedArgs = templateService.getValidatedArgs({ args: argsUsuarioController_exibirUsuarios, request, response });
            const controller = new UsuarioController_1.UsuarioController();
            await templateService.apiHandler({
                methodName: 'exibirUsuarios',
                controller,
                response,
                next,
                validatedArgs,
                successStatus: undefined,
            });
        }
        catch (err) {
            return next(err);
        }
    });
    // WARNING: This file was auto-generated with tsoa. Please do not modify it. Re-run tsoa to re-generate this file: https://github.com/lukeautry/tsoa
    const argsUsuarioController_filtrarUsuarioPorCPF = {
        cpf: { "in": "path", "name": "cpf", "required": true, "dataType": "string" },
        fail: { "in": "res", "name": "400", "required": true, "ref": "BasicResponseDto" },
        sucess: { "in": "res", "name": "200", "required": true, "ref": "BasicResponseDto" },
    };
    app.get('/usuarios/:cpf', ...((0, runtime_1.fetchMiddlewares)(UsuarioController_1.UsuarioController)), ...((0, runtime_1.fetchMiddlewares)(UsuarioController_1.UsuarioController.prototype.filtrarUsuarioPorCPF)), async function UsuarioController_filtrarUsuarioPorCPF(request, response, next) {
        // WARNING: This file was auto-generated with tsoa. Please do not modify it. Re-run tsoa to re-generate this file: https://github.com/lukeautry/tsoa
        let validatedArgs = [];
        try {
            validatedArgs = templateService.getValidatedArgs({ args: argsUsuarioController_filtrarUsuarioPorCPF, request, response });
            const controller = new UsuarioController_1.UsuarioController();
            await templateService.apiHandler({
                methodName: 'filtrarUsuarioPorCPF',
                controller,
                response,
                next,
                validatedArgs,
                successStatus: undefined,
            });
        }
        catch (err) {
            return next(err);
        }
    });
    // WARNING: This file was auto-generated with tsoa. Please do not modify it. Re-run tsoa to re-generate this file: https://github.com/lukeautry/tsoa
    const argsUsuarioController_atualizarUsuario = {
        dto: { "in": "body", "name": "dto", "required": true, "ref": "UsuarioDto" },
        cpf: { "in": "path", "name": "cpf", "required": true, "dataType": "string" },
        fail: { "in": "res", "name": "400", "required": true, "ref": "BasicResponseDto" },
        sucess: { "in": "res", "name": "200", "required": true, "ref": "BasicResponseDto" },
    };
    app.put('/usuarios/:cpf', ...((0, runtime_1.fetchMiddlewares)(UsuarioController_1.UsuarioController)), ...((0, runtime_1.fetchMiddlewares)(UsuarioController_1.UsuarioController.prototype.atualizarUsuario)), async function UsuarioController_atualizarUsuario(request, response, next) {
        // WARNING: This file was auto-generated with tsoa. Please do not modify it. Re-run tsoa to re-generate this file: https://github.com/lukeautry/tsoa
        let validatedArgs = [];
        try {
            validatedArgs = templateService.getValidatedArgs({ args: argsUsuarioController_atualizarUsuario, request, response });
            const controller = new UsuarioController_1.UsuarioController();
            await templateService.apiHandler({
                methodName: 'atualizarUsuario',
                controller,
                response,
                next,
                validatedArgs,
                successStatus: undefined,
            });
        }
        catch (err) {
            return next(err);
        }
    });
    // WARNING: This file was auto-generated with tsoa. Please do not modify it. Re-run tsoa to re-generate this file: https://github.com/lukeautry/tsoa
    const argsUsuarioController_apagarUsuario = {
        cpf: { "in": "path", "name": "cpf", "required": true, "dataType": "string" },
        fail: { "in": "res", "name": "400", "required": true, "ref": "BasicResponseDto" },
        sucess: { "in": "res", "name": "200", "required": true, "ref": "BasicResponseDto" },
    };
    app.delete('/usuarios/:cpf', ...((0, runtime_1.fetchMiddlewares)(UsuarioController_1.UsuarioController)), ...((0, runtime_1.fetchMiddlewares)(UsuarioController_1.UsuarioController.prototype.apagarUsuario)), async function UsuarioController_apagarUsuario(request, response, next) {
        // WARNING: This file was auto-generated with tsoa. Please do not modify it. Re-run tsoa to re-generate this file: https://github.com/lukeautry/tsoa
        let validatedArgs = [];
        try {
            validatedArgs = templateService.getValidatedArgs({ args: argsUsuarioController_apagarUsuario, request, response });
            const controller = new UsuarioController_1.UsuarioController();
            await templateService.apiHandler({
                methodName: 'apagarUsuario',
                controller,
                response,
                next,
                validatedArgs,
                successStatus: undefined,
            });
        }
        catch (err) {
            return next(err);
        }
    });
    // WARNING: This file was auto-generated with tsoa. Please do not modify it. Re-run tsoa to re-generate this file: https://github.com/lukeautry/tsoa
    const argsLivroController_novoLivro = {
        dto: { "in": "body", "name": "dto", "required": true, "ref": "LivroDto" },
        fail: { "in": "res", "name": "400", "required": true, "ref": "BasicResponseDto" },
        sucess: { "in": "res", "name": "201", "required": true, "ref": "BasicResponseDto" },
    };
    app.post('/livros', ...((0, runtime_1.fetchMiddlewares)(LivroController_1.LivroController)), ...((0, runtime_1.fetchMiddlewares)(LivroController_1.LivroController.prototype.novoLivro)), async function LivroController_novoLivro(request, response, next) {
        // WARNING: This file was auto-generated with tsoa. Please do not modify it. Re-run tsoa to re-generate this file: https://github.com/lukeautry/tsoa
        let validatedArgs = [];
        try {
            validatedArgs = templateService.getValidatedArgs({ args: argsLivroController_novoLivro, request, response });
            const controller = new LivroController_1.LivroController();
            await templateService.apiHandler({
                methodName: 'novoLivro',
                controller,
                response,
                next,
                validatedArgs,
                successStatus: undefined,
            });
        }
        catch (err) {
            return next(err);
        }
    });
    // WARNING: This file was auto-generated with tsoa. Please do not modify it. Re-run tsoa to re-generate this file: https://github.com/lukeautry/tsoa
    const argsLivroController_exibirLivros = {
        fail: { "in": "res", "name": "400", "required": true, "ref": "BasicResponseDto" },
        sucess: { "in": "res", "name": "200", "required": true, "ref": "BasicResponseDto" },
        titulo: { "in": "query", "name": "titulo", "dataType": "string" },
        autor: { "in": "query", "name": "autor", "dataType": "string" },
        editora: { "in": "query", "name": "editora", "dataType": "string" },
        edicao: { "in": "query", "name": "edicao", "dataType": "string" },
    };
    app.get('/livros', ...((0, runtime_1.fetchMiddlewares)(LivroController_1.LivroController)), ...((0, runtime_1.fetchMiddlewares)(LivroController_1.LivroController.prototype.exibirLivros)), async function LivroController_exibirLivros(request, response, next) {
        // WARNING: This file was auto-generated with tsoa. Please do not modify it. Re-run tsoa to re-generate this file: https://github.com/lukeautry/tsoa
        let validatedArgs = [];
        try {
            validatedArgs = templateService.getValidatedArgs({ args: argsLivroController_exibirLivros, request, response });
            const controller = new LivroController_1.LivroController();
            await templateService.apiHandler({
                methodName: 'exibirLivros',
                controller,
                response,
                next,
                validatedArgs,
                successStatus: undefined,
            });
        }
        catch (err) {
            return next(err);
        }
    });
    // WARNING: This file was auto-generated with tsoa. Please do not modify it. Re-run tsoa to re-generate this file: https://github.com/lukeautry/tsoa
    const argsLivroController_filtrarLivroPorIsbn = {
        isbn: { "in": "path", "name": "isbn", "required": true, "dataType": "string" },
        fail: { "in": "res", "name": "400", "required": true, "ref": "BasicResponseDto" },
        sucess: { "in": "res", "name": "200", "required": true, "ref": "BasicResponseDto" },
    };
    app.get('/livros/:isbn', ...((0, runtime_1.fetchMiddlewares)(LivroController_1.LivroController)), ...((0, runtime_1.fetchMiddlewares)(LivroController_1.LivroController.prototype.filtrarLivroPorIsbn)), async function LivroController_filtrarLivroPorIsbn(request, response, next) {
        // WARNING: This file was auto-generated with tsoa. Please do not modify it. Re-run tsoa to re-generate this file: https://github.com/lukeautry/tsoa
        let validatedArgs = [];
        try {
            validatedArgs = templateService.getValidatedArgs({ args: argsLivroController_filtrarLivroPorIsbn, request, response });
            const controller = new LivroController_1.LivroController();
            await templateService.apiHandler({
                methodName: 'filtrarLivroPorIsbn',
                controller,
                response,
                next,
                validatedArgs,
                successStatus: undefined,
            });
        }
        catch (err) {
            return next(err);
        }
    });
    // WARNING: This file was auto-generated with tsoa. Please do not modify it. Re-run tsoa to re-generate this file: https://github.com/lukeautry/tsoa
    const argsLivroController_atualizarLivro = {
        dto: { "in": "body", "name": "dto", "required": true, "ref": "LivroDto" },
        isbn: { "in": "path", "name": "isbn", "required": true, "dataType": "string" },
        fail: { "in": "res", "name": "400", "required": true, "ref": "BasicResponseDto" },
        sucess: { "in": "res", "name": "200", "required": true, "ref": "BasicResponseDto" },
    };
    app.put('/livros/:isbn', ...((0, runtime_1.fetchMiddlewares)(LivroController_1.LivroController)), ...((0, runtime_1.fetchMiddlewares)(LivroController_1.LivroController.prototype.atualizarLivro)), async function LivroController_atualizarLivro(request, response, next) {
        // WARNING: This file was auto-generated with tsoa. Please do not modify it. Re-run tsoa to re-generate this file: https://github.com/lukeautry/tsoa
        let validatedArgs = [];
        try {
            validatedArgs = templateService.getValidatedArgs({ args: argsLivroController_atualizarLivro, request, response });
            const controller = new LivroController_1.LivroController();
            await templateService.apiHandler({
                methodName: 'atualizarLivro',
                controller,
                response,
                next,
                validatedArgs,
                successStatus: undefined,
            });
        }
        catch (err) {
            return next(err);
        }
    });
    // WARNING: This file was auto-generated with tsoa. Please do not modify it. Re-run tsoa to re-generate this file: https://github.com/lukeautry/tsoa
    const argsLivroController_apagarLivro = {
        isbn: { "in": "path", "name": "isbn", "required": true, "dataType": "string" },
        fail: { "in": "res", "name": "400", "required": true, "ref": "BasicResponseDto" },
        sucess: { "in": "res", "name": "200", "required": true, "ref": "BasicResponseDto" },
    };
    app.delete('/livros/:isbn', ...((0, runtime_1.fetchMiddlewares)(LivroController_1.LivroController)), ...((0, runtime_1.fetchMiddlewares)(LivroController_1.LivroController.prototype.apagarLivro)), async function LivroController_apagarLivro(request, response, next) {
        // WARNING: This file was auto-generated with tsoa. Please do not modify it. Re-run tsoa to re-generate this file: https://github.com/lukeautry/tsoa
        let validatedArgs = [];
        try {
            validatedArgs = templateService.getValidatedArgs({ args: argsLivroController_apagarLivro, request, response });
            const controller = new LivroController_1.LivroController();
            await templateService.apiHandler({
                methodName: 'apagarLivro',
                controller,
                response,
                next,
                validatedArgs,
                successStatus: undefined,
            });
        }
        catch (err) {
            return next(err);
        }
    });
    // WARNING: This file was auto-generated with tsoa. Please do not modify it. Re-run tsoa to re-generate this file: https://github.com/lukeautry/tsoa
    const argsEstoqueController_novoExemplar = {
        dto: { "in": "body", "name": "dto", "required": true, "ref": "EstoqueDto" },
        fail: { "in": "res", "name": "400", "required": true, "ref": "BasicResponseDto" },
        sucess: { "in": "res", "name": "201", "required": true, "ref": "BasicResponseDto" },
    };
    app.post('/estoque', ...((0, runtime_1.fetchMiddlewares)(EstoqueController_1.EstoqueController)), ...((0, runtime_1.fetchMiddlewares)(EstoqueController_1.EstoqueController.prototype.novoExemplar)), async function EstoqueController_novoExemplar(request, response, next) {
        // WARNING: This file was auto-generated with tsoa. Please do not modify it. Re-run tsoa to re-generate this file: https://github.com/lukeautry/tsoa
        let validatedArgs = [];
        try {
            validatedArgs = templateService.getValidatedArgs({ args: argsEstoqueController_novoExemplar, request, response });
            const controller = new EstoqueController_1.EstoqueController();
            await templateService.apiHandler({
                methodName: 'novoExemplar',
                controller,
                response,
                next,
                validatedArgs,
                successStatus: undefined,
            });
        }
        catch (err) {
            return next(err);
        }
    });
    // WARNING: This file was auto-generated with tsoa. Please do not modify it. Re-run tsoa to re-generate this file: https://github.com/lukeautry/tsoa
    const argsEstoqueController_exibirExemplares = {
        fail: { "in": "res", "name": "400", "required": true, "ref": "BasicResponseDto" },
        sucess: { "in": "res", "name": "200", "required": true, "ref": "BasicResponseDto" },
    };
    app.get('/estoque', ...((0, runtime_1.fetchMiddlewares)(EstoqueController_1.EstoqueController)), ...((0, runtime_1.fetchMiddlewares)(EstoqueController_1.EstoqueController.prototype.exibirExemplares)), async function EstoqueController_exibirExemplares(request, response, next) {
        // WARNING: This file was auto-generated with tsoa. Please do not modify it. Re-run tsoa to re-generate this file: https://github.com/lukeautry/tsoa
        let validatedArgs = [];
        try {
            validatedArgs = templateService.getValidatedArgs({ args: argsEstoqueController_exibirExemplares, request, response });
            const controller = new EstoqueController_1.EstoqueController();
            await templateService.apiHandler({
                methodName: 'exibirExemplares',
                controller,
                response,
                next,
                validatedArgs,
                successStatus: undefined,
            });
        }
        catch (err) {
            return next(err);
        }
    });
    // WARNING: This file was auto-generated with tsoa. Please do not modify it. Re-run tsoa to re-generate this file: https://github.com/lukeautry/tsoa
    const argsEstoqueController_filtrarExemplarPorId = {
        id: { "in": "path", "name": "id", "required": true, "dataType": "double" },
        fail: { "in": "res", "name": "400", "required": true, "ref": "BasicResponseDto" },
        sucess: { "in": "res", "name": "200", "required": true, "ref": "BasicResponseDto" },
    };
    app.get('/estoque/:id', ...((0, runtime_1.fetchMiddlewares)(EstoqueController_1.EstoqueController)), ...((0, runtime_1.fetchMiddlewares)(EstoqueController_1.EstoqueController.prototype.filtrarExemplarPorId)), async function EstoqueController_filtrarExemplarPorId(request, response, next) {
        // WARNING: This file was auto-generated with tsoa. Please do not modify it. Re-run tsoa to re-generate this file: https://github.com/lukeautry/tsoa
        let validatedArgs = [];
        try {
            validatedArgs = templateService.getValidatedArgs({ args: argsEstoqueController_filtrarExemplarPorId, request, response });
            const controller = new EstoqueController_1.EstoqueController();
            await templateService.apiHandler({
                methodName: 'filtrarExemplarPorId',
                controller,
                response,
                next,
                validatedArgs,
                successStatus: undefined,
            });
        }
        catch (err) {
            return next(err);
        }
    });
    // WARNING: This file was auto-generated with tsoa. Please do not modify it. Re-run tsoa to re-generate this file: https://github.com/lukeautry/tsoa
    const argsEstoqueController_atualizarDiponibilidade = {
        dto: { "in": "body", "name": "dto", "required": true, "dataType": "any" },
        id: { "in": "path", "name": "id", "required": true, "dataType": "double" },
        fail: { "in": "res", "name": "400", "required": true, "ref": "BasicResponseDto" },
        sucess: { "in": "res", "name": "200", "required": true, "ref": "BasicResponseDto" },
    };
    app.put('/estoque/:id', ...((0, runtime_1.fetchMiddlewares)(EstoqueController_1.EstoqueController)), ...((0, runtime_1.fetchMiddlewares)(EstoqueController_1.EstoqueController.prototype.atualizarDiponibilidade)), async function EstoqueController_atualizarDiponibilidade(request, response, next) {
        // WARNING: This file was auto-generated with tsoa. Please do not modify it. Re-run tsoa to re-generate this file: https://github.com/lukeautry/tsoa
        let validatedArgs = [];
        try {
            validatedArgs = templateService.getValidatedArgs({ args: argsEstoqueController_atualizarDiponibilidade, request, response });
            const controller = new EstoqueController_1.EstoqueController();
            await templateService.apiHandler({
                methodName: 'atualizarDiponibilidade',
                controller,
                response,
                next,
                validatedArgs,
                successStatus: undefined,
            });
        }
        catch (err) {
            return next(err);
        }
    });
    // WARNING: This file was auto-generated with tsoa. Please do not modify it. Re-run tsoa to re-generate this file: https://github.com/lukeautry/tsoa
    const argsEstoqueController_apagarExemplar = {
        id: { "in": "path", "name": "id", "required": true, "dataType": "double" },
        fail: { "in": "res", "name": "400", "required": true, "ref": "BasicResponseDto" },
        sucess: { "in": "res", "name": "200", "required": true, "ref": "BasicResponseDto" },
    };
    app.delete('/estoque/:id', ...((0, runtime_1.fetchMiddlewares)(EstoqueController_1.EstoqueController)), ...((0, runtime_1.fetchMiddlewares)(EstoqueController_1.EstoqueController.prototype.apagarExemplar)), async function EstoqueController_apagarExemplar(request, response, next) {
        // WARNING: This file was auto-generated with tsoa. Please do not modify it. Re-run tsoa to re-generate this file: https://github.com/lukeautry/tsoa
        let validatedArgs = [];
        try {
            validatedArgs = templateService.getValidatedArgs({ args: argsEstoqueController_apagarExemplar, request, response });
            const controller = new EstoqueController_1.EstoqueController();
            await templateService.apiHandler({
                methodName: 'apagarExemplar',
                controller,
                response,
                next,
                validatedArgs,
                successStatus: undefined,
            });
        }
        catch (err) {
            return next(err);
        }
    });
    // WARNING: This file was auto-generated with tsoa. Please do not modify it. Re-run tsoa to re-generate this file: https://github.com/lukeautry/tsoa
    const argsEmprestimoController_novoEmprestimo = {
        dto: { "in": "body", "name": "dto", "required": true, "ref": "EmprestimoDto" },
        fail: { "in": "res", "name": "400", "required": true, "ref": "BasicResponseDto" },
        sucess: { "in": "res", "name": "201", "required": true, "ref": "BasicResponseDto" },
    };
    app.post('/emprestimos', ...((0, runtime_1.fetchMiddlewares)(EmprestimoController_1.EmprestimoController)), ...((0, runtime_1.fetchMiddlewares)(EmprestimoController_1.EmprestimoController.prototype.novoEmprestimo)), async function EmprestimoController_novoEmprestimo(request, response, next) {
        // WARNING: This file was auto-generated with tsoa. Please do not modify it. Re-run tsoa to re-generate this file: https://github.com/lukeautry/tsoa
        let validatedArgs = [];
        try {
            validatedArgs = templateService.getValidatedArgs({ args: argsEmprestimoController_novoEmprestimo, request, response });
            const controller = new EmprestimoController_1.EmprestimoController();
            await templateService.apiHandler({
                methodName: 'novoEmprestimo',
                controller,
                response,
                next,
                validatedArgs,
                successStatus: undefined,
            });
        }
        catch (err) {
            return next(err);
        }
    });
    // WARNING: This file was auto-generated with tsoa. Please do not modify it. Re-run tsoa to re-generate this file: https://github.com/lukeautry/tsoa
    const argsEmprestimoController_exibirEmprestimos = {
        fail: { "in": "res", "name": "400", "required": true, "ref": "BasicResponseDto" },
        sucess: { "in": "res", "name": "200", "required": true, "ref": "BasicResponseDto" },
    };
    app.get('/emprestimos', ...((0, runtime_1.fetchMiddlewares)(EmprestimoController_1.EmprestimoController)), ...((0, runtime_1.fetchMiddlewares)(EmprestimoController_1.EmprestimoController.prototype.exibirEmprestimos)), async function EmprestimoController_exibirEmprestimos(request, response, next) {
        // WARNING: This file was auto-generated with tsoa. Please do not modify it. Re-run tsoa to re-generate this file: https://github.com/lukeautry/tsoa
        let validatedArgs = [];
        try {
            validatedArgs = templateService.getValidatedArgs({ args: argsEmprestimoController_exibirEmprestimos, request, response });
            const controller = new EmprestimoController_1.EmprestimoController();
            await templateService.apiHandler({
                methodName: 'exibirEmprestimos',
                controller,
                response,
                next,
                validatedArgs,
                successStatus: undefined,
            });
        }
        catch (err) {
            return next(err);
        }
    });
    // WARNING: This file was auto-generated with tsoa. Please do not modify it. Re-run tsoa to re-generate this file: https://github.com/lukeautry/tsoa
    const argsEmprestimoController_atualizarEmprestimo = {
        id: { "in": "path", "name": "id", "required": true, "dataType": "double" },
        fail: { "in": "res", "name": "400", "required": true, "ref": "BasicResponseDto" },
        sucess: { "in": "res", "name": "200", "required": true, "ref": "BasicResponseDto" },
    };
    app.put('/emprestimos/:id', ...((0, runtime_1.fetchMiddlewares)(EmprestimoController_1.EmprestimoController)), ...((0, runtime_1.fetchMiddlewares)(EmprestimoController_1.EmprestimoController.prototype.atualizarEmprestimo)), async function EmprestimoController_atualizarEmprestimo(request, response, next) {
        // WARNING: This file was auto-generated with tsoa. Please do not modify it. Re-run tsoa to re-generate this file: https://github.com/lukeautry/tsoa
        let validatedArgs = [];
        try {
            validatedArgs = templateService.getValidatedArgs({ args: argsEmprestimoController_atualizarEmprestimo, request, response });
            const controller = new EmprestimoController_1.EmprestimoController();
            await templateService.apiHandler({
                methodName: 'atualizarEmprestimo',
                controller,
                response,
                next,
                validatedArgs,
                successStatus: undefined,
            });
        }
        catch (err) {
            return next(err);
        }
    });
    // WARNING: This file was auto-generated with tsoa. Please do not modify it. Re-run tsoa to re-generate this file: https://github.com/lukeautry/tsoa
    const argsCursoController_exibirCursos = {
        fail: { "in": "res", "name": "404", "required": true, "ref": "BasicResponseDto" },
        sucess: { "in": "res", "name": "200", "required": true, "ref": "BasicResponseDto" },
    };
    app.get('/catalogos/cursos', ...((0, runtime_1.fetchMiddlewares)(CursoController_1.CursoController)), ...((0, runtime_1.fetchMiddlewares)(CursoController_1.CursoController.prototype.exibirCursos)), async function CursoController_exibirCursos(request, response, next) {
        // WARNING: This file was auto-generated with tsoa. Please do not modify it. Re-run tsoa to re-generate this file: https://github.com/lukeautry/tsoa
        let validatedArgs = [];
        try {
            validatedArgs = templateService.getValidatedArgs({ args: argsCursoController_exibirCursos, request, response });
            const controller = new CursoController_1.CursoController();
            await templateService.apiHandler({
                methodName: 'exibirCursos',
                controller,
                response,
                next,
                validatedArgs,
                successStatus: undefined,
            });
        }
        catch (err) {
            return next(err);
        }
    });
    // WARNING: This file was auto-generated with tsoa. Please do not modify it. Re-run tsoa to re-generate this file: https://github.com/lukeautry/tsoa
    const argsCategoriaUsuarioController_exibirCategoriaUsuario = {
        fail: { "in": "res", "name": "404", "required": true, "ref": "BasicResponseDto" },
        sucess: { "in": "res", "name": "200", "required": true, "ref": "BasicResponseDto" },
    };
    app.get('/catalogos/categorias-usuarios', ...((0, runtime_1.fetchMiddlewares)(CategoriaUsuarioController_1.CategoriaUsuarioController)), ...((0, runtime_1.fetchMiddlewares)(CategoriaUsuarioController_1.CategoriaUsuarioController.prototype.exibirCategoriaUsuario)), async function CategoriaUsuarioController_exibirCategoriaUsuario(request, response, next) {
        // WARNING: This file was auto-generated with tsoa. Please do not modify it. Re-run tsoa to re-generate this file: https://github.com/lukeautry/tsoa
        let validatedArgs = [];
        try {
            validatedArgs = templateService.getValidatedArgs({ args: argsCategoriaUsuarioController_exibirCategoriaUsuario, request, response });
            const controller = new CategoriaUsuarioController_1.CategoriaUsuarioController();
            await templateService.apiHandler({
                methodName: 'exibirCategoriaUsuario',
                controller,
                response,
                next,
                validatedArgs,
                successStatus: undefined,
            });
        }
        catch (err) {
            return next(err);
        }
    });
    // WARNING: This file was auto-generated with tsoa. Please do not modify it. Re-run tsoa to re-generate this file: https://github.com/lukeautry/tsoa
    const argsCategoriaLivroController_exibirCategoriaLivro = {
        fail: { "in": "res", "name": "404", "required": true, "ref": "BasicResponseDto" },
        sucess: { "in": "res", "name": "200", "required": true, "ref": "BasicResponseDto" },
    };
    app.get('/catalogos/categorias-livros', ...((0, runtime_1.fetchMiddlewares)(CategoriaLivroController_1.CategoriaLivroController)), ...((0, runtime_1.fetchMiddlewares)(CategoriaLivroController_1.CategoriaLivroController.prototype.exibirCategoriaLivro)), async function CategoriaLivroController_exibirCategoriaLivro(request, response, next) {
        // WARNING: This file was auto-generated with tsoa. Please do not modify it. Re-run tsoa to re-generate this file: https://github.com/lukeautry/tsoa
        let validatedArgs = [];
        try {
            validatedArgs = templateService.getValidatedArgs({ args: argsCategoriaLivroController_exibirCategoriaLivro, request, response });
            const controller = new CategoriaLivroController_1.CategoriaLivroController();
            await templateService.apiHandler({
                methodName: 'exibirCategoriaLivro',
                controller,
                response,
                next,
                validatedArgs,
                successStatus: undefined,
            });
        }
        catch (err) {
            return next(err);
        }
    });
    // WARNING: This file was auto-generated with tsoa. Please do not modify it. Re-run tsoa to re-generate this file: https://github.com/lukeautry/tsoa
    // WARNING: This file was auto-generated with tsoa. Please do not modify it. Re-run tsoa to re-generate this file: https://github.com/lukeautry/tsoa
    // WARNING: This file was auto-generated with tsoa. Please do not modify it. Re-run tsoa to re-generate this file: https://github.com/lukeautry/tsoa
}
// WARNING: This file was auto-generated with tsoa. Please do not modify it. Re-run tsoa to re-generate this file: https://github.com/lukeautry/tsoa
