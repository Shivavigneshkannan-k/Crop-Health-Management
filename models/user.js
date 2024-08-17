const mongoose = require("mongoose");
const Scheme = mongoose.Schema;

const UserScheme = new Scheme({
    email:{
        type:String,
        required:true
    },
    password:{
        type: String,
        required:true
    }
    },
    { timestamps:true }
);
const user = mongoose.model("user",UserScheme);

module.exports = user;
