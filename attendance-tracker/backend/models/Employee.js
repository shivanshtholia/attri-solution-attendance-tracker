const mongoose = require("mongoose");

const employeeSchema = new mongoose.Schema(
{
    user:{
        type:mongoose.Schema.Types.ObjectId,
        ref:"User",
        required:true
    },

    employeeId:{
        type:String,
        required:true,
        unique:true
    },

    department:{
        type:String,
        required:true
    },

    designation:{
        type:String,
        required:true
    },

    salary:{
        type:Number,
        default:0
    },

    phone:{
        type:String
    }

},
{
    timestamps:true
}
);

module.exports = mongoose.model("Employee",employeeSchema);