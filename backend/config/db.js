import mongoose from "mongoose";

// export const connectDB = async ()=>{
//     await mongoose.connect('mongodb+srv://atishay027:atishayjain220@cluster0.vyhxvby.mongodb.net/FoodDeliveryProject').then(()=>console.log("DB Connected"));
// }

export const connectDB = async ()=>{
    await mongoose.connect('mongodb+srv://preksha15:wjBILdesjJq28y75@food-delivery.gr9qwu4.mongodb.net/').then(()=>console.log("DB Connected"));
}