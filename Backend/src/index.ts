import express from "express";
import cors from "cors";
import routes from "./routes";
import dotenv from "dotenv";

// Load env variables
dotenv.config();

const app = express();
const port = process.env.PORT || 3000;

app.use(cors());

export interface MulterImageFields {
  image1?: Express.Multer.File[];
  image2?: Express.Multer.File[];
}

app.use(routes);

app.listen(port, () => {
  return console.log(`Express is listening at http://localhost:${port}`);
});