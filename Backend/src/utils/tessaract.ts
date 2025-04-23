import Tesseract from "tesseract.js";

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
    return {data};
};
