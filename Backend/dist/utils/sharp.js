"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.preprocessImage = void 0;
const sharp_1 = __importDefault(require("sharp"));
const fs_1 = __importDefault(require("fs"));
const preprocessImage = (inputPath, outputPath) => __awaiter(void 0, void 0, void 0, function* () {
    yield (0, sharp_1.default)(inputPath)
        .resize(1500)
        .grayscale()
        .normalize()
        .threshold(140)
        .sharpen({ sigma: 1 })
        .flatten({ background: "#ffffff" })
        .blur(0.3)
        .toFile(outputPath);
    fs_1.default.unlink(`./uploads/${inputPath}`, (err) => {
        if (err)
            console.log("error on deleting file ", err);
        console.log(`file deleted successfully ${inputPath}`);
    });
});
exports.preprocessImage = preprocessImage;
