import { Request, Response } from "express";
import { preprocessImage } from "../utils/sharp";
import {
  parseAadhaarAddressInfo,
  parseAadhaarBasicInfo,
} from "../utils/parseAadhar";
import { pageRecognize } from "../utils/tessaract";

class userController {
  constructor() {}
  async upload(req: Request, res: Response) {
    try {
      const files = req.files as {
        image1: Express.Multer.File[];
        image2: Express.Multer.File[];
      };
      console.log(files, "files");
      res.status(200).json({
        message: "Images uploaded successfully",
        fileNames: [files.image1[0].filename, files.image2[0].filename],
      });
    } catch (error) {
      console.log("error on upload Image", error);
      res.redirect("/pageNotFound");
    }
  }
  async getDetails(req: Request, res: Response) {
    try {
      const { frontSide, backSide } = req.params;
      await preprocessImage(
        `./uploads/${frontSide}`,
        `./sharpUploads/${frontSide}`
      );
      await preprocessImage(
        `./uploads/${backSide}`,
        `./sharpUploads/${backSide}`
      );
      
      const { data: frontSideData } = await pageRecognize(frontSide);
      const { data: backSideData } = await pageRecognize(backSide);
      const result = {
        name: "",
        gender: "",
        dob: "",
        aadharNumber: "",
        address: "",
        pincode: "",
      };
      parseAadhaarBasicInfo(frontSideData.text, result);
      parseAadhaarAddressInfo(backSideData.text, result);
      console.log(result);
      res.status(200).json({ message: "successfully completed", result });
    } catch (error) {
      console.log("error on get Details", error);
      res.status(500).json({ message: "Internel server error" });
    }
  }
}

export default userController;
