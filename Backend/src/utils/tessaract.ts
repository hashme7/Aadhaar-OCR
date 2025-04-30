import Tesseract from "tesseract.js";
import fs from 'fs';

export const pageRecognize =async (page:string) => {
  const { data } = await Tesseract.recognize(
    `./sharpUploads/${page}`,
    "eng+hin",
    {
      tessedit_char_whitelist:
        "ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789:/- ",
      tessedit_pageseg_mode: "6",
    } as any
  );
  fs.unlink(`./sharpUploads/${page}`, (err) => {
    if (err) console.log("error on deleting file ", err);
    console.log(`file deleted successfully ${page}`);
  });
    return {data};
};
