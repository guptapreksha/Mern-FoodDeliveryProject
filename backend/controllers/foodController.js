import foodModel from "../models/foodModel.js";
import fs from 'fs'



// add Food Item
const addFood = async (req,res)=>{
    
    let image_filename = `${req.file.filename}`;

    const food = new foodModel({
        name: req.body.name,
        price: req.body.price,
        image: image_filename,
        description: req.body.description,
        category: req.body.category,
    })

    try {
        await food.save();
        res.json({success:true,message:"Food Added"})
    } catch (error) {
        console.log(error);
        res.json({success:false,message:"Food Not Added"})
    }
}  


//all foodlist
const listFood = async (req,res)=>{
    try {
        const foods = await foodModel.find({});
        res.json({success:true,message:"Food List",data:foods})
    } catch (error) {
        console.log(error);
        res.json({success:false,message:"Error"})
    }
}


//remove food
const removeFood = async (req,res)=>{
   try {
    const food = await foodModel.findById(req.body.id);

    fs.unlink(`uploads/${food.image}`,()=>{})

    await foodModel.findByIdAndDelete(req.body.id);
    res.json({success:true,message:"Food Removed"})
   } catch (error) {
    console.log("erros: ",error);
    res.json({success:false,message:"Food Not Removed"})
   }
}


// update food
const updateFood = async (req, res) => {
    try {
      const { id, name, price, category } = req.body;
  
      const updatedFood = await foodModel.findByIdAndUpdate(
        id,
        { name, price, category },
        { new: true }
      );
  
      if (!updatedFood) {
        return res.status(404).json({ success: false, message: "Food not found" });
      }
  
      res.json({ success: true, message: "Food Updated", data: updatedFood });
    } catch (error) {
      console.log("error: ", error);
      res.status(500).json({ success: false, message: "Update failed" });
    }
  };
  

  export {addFood,listFood,removeFood , updateFood}