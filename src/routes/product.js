import * as controllers from "../controllers";
import express from "express";
import verifyToken from "../middleware/verify_token";
import { isAdmin } from "../middleware/verify_role";
import uploadCloud from "../middleware/cloudinary.config";
const router = express.Router();

router.get("/", controllers.getAllproduct);
// router.get("/", verifyToken, controllers.getCurrent);
// router.use(isAdmin);
// router.use(verifyToken);
router.get("/:id", controllers.getProductById);

router.post(
  "/",
  uploadCloud.single("imageProduct"),
  controllers.createNewProduct
);
router.put(
  "/update",
  uploadCloud.single("imageProduct"),
  controllers.updateProduct
);
router.delete("/", controllers.delProduct);
module.exports = router;
