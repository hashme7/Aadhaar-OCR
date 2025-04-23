import { Router } from "express";
import upload from "../middleware/multer";
import controller from "../provider/controller";

const routes = Router();

routes.post(
  "/api",
  upload.fields([
    { name: "image1", maxCount: 1 },
    { name: "image2", maxCount: 1 },
  ]),
  controller.upload.bind(controller)
);

routes.get("/api/:frontSide/:backSide", controller.getDetails.bind(controller));

export default routes;
