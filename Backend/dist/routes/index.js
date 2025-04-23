"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = require("express");
const multer_1 = __importDefault(require("../middleware/multer"));
const controller_1 = __importDefault(require("../provider/controller"));
const routes = (0, express_1.Router)();
routes.post("/api", multer_1.default.fields([
    { name: "image1", maxCount: 1 },
    { name: "image2", maxCount: 1 },
]), controller_1.default.upload.bind(controller_1.default));
routes.get("/api/:frontSide/:backSide", controller_1.default.getDetails.bind(controller_1.default));
exports.default = routes;
