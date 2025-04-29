import { preprocessImage } from "../utils/sharp";
import { pageRecognize } from "../utils/tessaract";
import {
  parseAadhaarBasicInfo,
  parseAadhaarAddressInfo,
} from "../utils/parseAadhar";
import { IResult } from "../types";

export class UserService {
  async extractAadhaarDetails(
    frontSide: string,
    backSide: string
  ): Promise<IResult> {
    const result: IResult = {
      name: "",
      gender: "",
      dob: "",
      aadharNumber: "",
      address: "",
      pincode: "",
    };

    await preprocessImage(
      `./uploads/${frontSide}`,
      `./sharpUploads/${frontSide}`
    );
    await preprocessImage(
      `./uploads/${backSide}`,
      `./sharpUploads/${backSide}`
    );

    const { data: frontText } = await pageRecognize(frontSide);
    const { data: backText } = await pageRecognize(backSide);

    parseAadhaarBasicInfo(frontText.text, result);
    parseAadhaarAddressInfo(backText.text, result);

    return result;
  }
}
