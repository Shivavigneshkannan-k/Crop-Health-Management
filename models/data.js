const mongoose = require("mongoose");
const {Schema,Types}= mongoose;

const DataScheme = new Schema({
    userId:{
        type:Types.ObjectId,
        required:true
    },
    humidity:{
        type:Number,
        required:true
    },
    temperature:{
        type:Number,
        required:true
    },
    soilMoisture:{
        type:Number,
        required:true
    }
},{timestamps:true});

const Data = mongoose.model("Data",DataScheme);

module.exports = Data;
