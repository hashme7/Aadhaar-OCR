import sharp from "sharp";
import fs from "fs";

export const preprocessImage = async (inputPath: any, outputPath: any) => {
  await sharp(inputPath)
    .resize(1500)
    .grayscale()
    .normalize()
    .threshold(140)
    .sharpen({ sigma: 1 })
    .flatten({ background: "#ffffff" })
    .blur(0.3)
    .toFile(outputPath);

  fs.unlink(`./uploads/${inputPath}`, (err) => {
    if (err) console.log("error on deleting file ", err);
    console.log(`file deleted successfully ${inputPath}`);
  });
};
