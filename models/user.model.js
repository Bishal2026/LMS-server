import { Schema, model } from "mongoose";
import bcrypt from "bcryptjs";
import jwt from "jsonwebtoken";

const userSchma = new Schema({
    fullName: {
        type: 'String',
        required: true,
        minLength:[ 5, "Name must be at least 5 charchter"],
        maxLength:[ 50, "Name should  be less then 50 charchter"],
        lowercase:true,
        trim:true,
    },
    email:{
        type:'String',
        required: [true,'Email is requird'],
        lowercase:true,
        trim:true,
        unique:true,
        match:[]
    },
    password:{
        type:'String',
        required: [true,'Password is required'],
        minLength:[ 8, "Name must be at least 8 charchter"],
        select:false,
    },
    avater:{
        pubilc_id:{
           type:'String' 
        },
        secure_url:{
            type:'String'
        }
    },
    role:{
        type:'String',
        enum:['USER','ADMIN'],
        default:"USER"
    },
    forgotPasswordToken:String,
    forgotPasswordExpiry :Date,


},{
    timestamps:true,
});

userSchma.pre('save', async function(next){

    if(!this.isModified('password')){
        return next();
    }
    this.password = await bcrypt.hash(this.password,10);

});

userSchma.method= {
    generateJWToken: async function(){
        return  await jwt.sign({
            id: this._id, email: this.email, subscription: this.subscription, role: this.role
        },
            process.env.JWT_SECRET, {
            expiresIn: process.env.JWT_EXPIRY,
        }
        )
    },
    comparePassword: async  function(plainTextPassword){
        return await bcrypt.compare(plainTextPassword,this.password);

    }
}

const User = model("User",userSchma);

export default User;