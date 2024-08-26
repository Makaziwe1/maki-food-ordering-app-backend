import express, {Request, Response} from "express";
import cors from "cors";
import "dotenv/config";
import mongoose from "mongoose";
import myUserRoute from "./routes/MyUserRoute";
import { v2 as cloudinary } from "cloudinary";
import MyRestaurantRoute from "./routes/MyRestaurantRoute";

mongoose.connect(process.env.MONGODB_CONNECTION_STRING as string)
    .then(()=> console.log("Connected to database!"));

cloudinary.config({
    cloud_name: process.env.CLOUDINARY_CLOUD_NAME,
    api_key: process.env.CLOUDINARY_API_KEY,
    api_secret: process.env.CLOUDINARY_API_SECRET,
});


const app = express();
app.use(cors());
app.use(express.json());
const bodyParser = require("body-parser")

app.use(bodyParser.urlencoded({extended:false}))

app.get("/health", async (req: Request, res: Response) =>{
    res.send({ message: "health OK!" });
});

app.use("/api/my/user", myUserRoute);
// app.use("/api/my/restaurant", (req, res) =>{
//     upload.single('imageFile')
//     console.log("requ -> ", req)
//     console.log('Received request: ', req.body, 'Response: ', res)
//     console.log('Files ->', req.files)
// }, MyRestaurantRoute);

app.use("/api/my/restaurant", MyRestaurantRoute)


app.listen(7000, ()=>{
    console.log("server started on localhost:7000");
});
