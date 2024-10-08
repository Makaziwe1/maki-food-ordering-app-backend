import express from "express";
import { param } from "express-validator";
import Restaurant from "../models/restaurant";
import RestaurantController from "../controllers/RestaurantController";

const router = express.Router();

// router.get(
//     "/search/:city", 
//     param("city")
//     .isString()
//     .trim()
//     .notEmpty()
//     .withMessage("City perimeter musr be a valid string"),
//     RestaurantController.searchRestaurant
// );

router.get("/search/:city", (req, res) =>{
    RestaurantController.searchRestaurant(req, res)
})

export default router;