import { Router } from "express";
import authentication from "../middleware/authentication";
import productController from "../controller/product-controller";
import { upload } from "../middleware/upload";

const ProductRouter = Router();

ProductRouter.post("/product", upload.array("image"), productController.post);
ProductRouter.get("/product", authentication, productController.getAllProduct);
ProductRouter.put("/product/:productId", authentication, upload.array("image"), productController.putProduct);
ProductRouter.delete("/product/:productId", authentication, productController.deleteProduct);

export default ProductRouter;
