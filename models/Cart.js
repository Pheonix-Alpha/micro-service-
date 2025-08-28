import mongoose, { Mongoose } from "mongoose";

const cartItemsSchema = new mongoose.Schema({
    productId:{type:mongoose.Schema.Types.ObjectId, ref:"Product", required:true},
    name:String,
    price:Number,
    qty:{type:Number,default:1},
});

const cardtSchema = new mongoose.Schema({
    userId:{type:mongoose.Schema.Types.ObjectId, ref:"User", unique:true},
    items:{cartItemsSchema},
    updatedAt:{type:Date,default:Date.now},
});

export default mongoose.model("Cart", cardtSchema);