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
const preprocessImage = (inputPath, outputPath) => __awaiter(void 0, void 0, void 0, function* () {
    yield (0, sharp_1.default)(inputPath)
        .resize(1500) // Resize for OCR clarity
        .grayscale() // Convert to grayscale
        .normalize() // Boost contrast
        .threshold(140) // Apply binary thresholding
        .sharpen({ sigma: 1 }) // Sharpen edges
        .flatten({ background: "#ffffff" }) // Remove alpha & set white bg
        .blur(0.3)
        .toFile(outputPath);
});
exports.preprocessImage = preprocessImage;
