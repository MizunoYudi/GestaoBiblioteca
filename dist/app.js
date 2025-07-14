"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = __importDefault(require("express"));
const routes_1 = require("./route/routes");
const swagger_1 = require("./config/swagger");
const app = (0, express_1.default)();
const PORT = 3090;
app.use(express_1.default.json());
const apiRouter = express_1.default.Router();
(0, routes_1.RegisterRoutes)(apiRouter);
app.use('/api', apiRouter);
(0, routes_1.RegisterRoutes)(app);
(0, swagger_1.setupSwagger)(app);
app.listen(PORT, () => console.log(`API em execução no URL: http://localhost:${PORT}`));
