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
Object.defineProperty(exports, "__esModule", { value: true });
exports.UserController = void 0;
class UserController {
    constructor(userService) {
        this.userService = userService;
    }
    upload(req, res) {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                const files = req.files;
                const filenames = [files.image1[0].filename, files.image2[0].filename];
                res.status(200).json({
                    message: "Images uploaded successfully",
                    fileNames: filenames,
                });
            }
            catch (error) {
                console.error("Upload error:", error);
                res.status(500).json({ message: `Internel server error: ${error}` });
            }
        });
    }
    getDetails(req, res) {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                const { frontSide, backSide } = req.params;
                const result = yield this.userService.extractAadhaarDetails(frontSide, backSide);
                res.status(200).json({
                    message: "Successfully extracted Aadhaar details",
                    result,
                });
            }
            catch (error) {
                console.error("Error getting Aadhaar details:", error);
                res.status(500).json({ message: "Internal server error" });
            }
        });
    }
}
exports.UserController = UserController;
