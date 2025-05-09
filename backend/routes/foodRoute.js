import express from 'express'
import { addFood, listFood, removeFood, updateFood } from '../controllers/foodController.js'
import multer from 'multer'


const foodRouter = express.Router();

//Image storage Engine

const storage = multer.diskStorage({
    destination: "uploads" , filename:(req,file,cb)=> {
        return cb(null,`${Date.now()}${file.originalname}`)
    }
})


const upload = multer({storage:storage})


foodRouter.post('/add',upload.single("image"),addFood);

foodRouter.get("/foodlist",listFood);

foodRouter.post('/remove',removeFood);

foodRouter.put('/update', updateFood)   




export default foodRouter;