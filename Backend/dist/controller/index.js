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
const sharp_1 = require("../utils/sharp");
const parseAadhar_1 = require("../utils/parseAadhar");
const tessaract_1 = require("../utils/tessaract");
class userController {
    constructor() { }
    upload(req, res) {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                const files = req.files;
                console.log(files, "files");
                res.status(200).json({
                    message: "Images uploaded successfully",
                    fileNames: [files.image1[0].filename, files.image2[0].filename],
                });
            }
            catch (error) {
                console.log("error on upload Image", error);
                res.redirect("/pageNotFound");
            }
        });
    }
    getDetails(req, res) {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                const { frontSide, backSide } = req.params;
                yield (0, sharp_1.preprocessImage)(`./uploads/${frontSide}`, `./sharpUploads/${frontSide}`);
                yield (0, sharp_1.preprocessImage)(`./uploads/${backSide}`, `./sharpUploads/${backSide}`);
                const { data: frontSideData } = yield (0, tessaract_1.pageRecognize)(frontSide);
                const { data: backSideData } = yield (0, tessaract_1.pageRecognize)(backSide);
                const result = {
                    name: "",
                    gender: "",
                    dob: "",
                    aadharNumber: "",
                    address: "",
                    pincode: "",
                };
                (0, parseAadhar_1.parseAadhaarBasicInfo)(frontSideData.text, result);
                (0, parseAadhar_1.parseAadhaarAddressInfo)(backSideData.text, result);
                console.log(result);
                res.status(200).json({ message: "successfully completed", result });
            }
            catch (error) {
                console.log("error on get Details", error);
                res.status(500).json({ message: "Internel server error" });
            }
        });
    }
}
exports.default = userController;
