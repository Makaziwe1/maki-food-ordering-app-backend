import express from "express";
import multer from "multer";
import MyRestaurantController from "../controllers/MyRestaurantController";
import { jwtCheck, jwtParse } from "../middleware/auth";
import { validateMyRestaurantRequest } from "../middleware/validation";

const router = express.Router();

const storage = multer.memoryStorage();
const upload = multer({
    storage: storage,
    limits: {
        fileSize: 10 * 1024 * 1024, //5mb
    },
});

// GET /api/my/restaurant
router.get("/", jwtCheck, jwtParse, MyRestaurantController.getMyRestaurant)

// /api/my/resturant
router.post(
    "/", 
    upload.single("imageFile"), 
    validateMyRestaurantRequest,
    jwtCheck,
    jwtParse,
    MyRestaurantController.createMyRestaurant
);

router.put(
    "/",    
    upload.single("imageFile"), 
    validateMyRestaurantRequest,
    jwtCheck,
    jwtParse,
    MyRestaurantController.updateMyRestaurant
);



// router.post("/", (req, res, next) => {
//     console.log('Headers:', req.headers);
//     console.log('Body:', req.body);
//     console.log('Files:', req.file);
//     next();
// }, upload.single('imageFile'), MyRestaurantController.createMyRestaurant);

export default router;