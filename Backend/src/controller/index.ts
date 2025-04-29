import { Request, Response } from "express";
import { UserService } from "../services/userServices";

export class UserController {
  constructor(private readonly userService: UserService) {}

  async upload(req: Request, res: Response) {
    try {
      const files = req.files as {
        image1: Express.Multer.File[];
        image2: Express.Multer.File[];
      };

      const filenames = [files.image1[0].filename, files.image2[0].filename];

      res.status(200).json({
        message: "Images uploaded successfully",
        fileNames: filenames,
      });
    } catch (error) {
      console.error("Upload error:", error);
      res.status(500).json({ message: `Internel server error: ${error}` });
    }
  }

  async getDetails(req: Request, res: Response) {
    try {
      const { frontSide, backSide } = req.params;
      const result = await this.userService.extractAadhaarDetails(
        frontSide,
        backSide
      );
      res.status(200).json({
        message: "Successfully extracted Aadhaar details",
        result,
      });
    } catch (error) {
      console.error("Error getting Aadhaar details:", error);
      res.status(500).json({ message: "Internal server error" });
    }
  }
}
