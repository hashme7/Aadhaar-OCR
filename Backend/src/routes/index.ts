import { Router } from "express";
import upload from "../middleware/multer";
import controller from "../provider/controller";

const router = Router();

router.route("/api").post(
  upload.fields([
    { name: "image1", maxCount: 1 },
    { name: "image2", maxCount: 1 },
  ]),
  (req, res) => controller.upload(req, res)
);

router
  .route("/api/:frontSide/:backSide")
  .get((req, res) => controller.getDetails(req, res));

export default router;
