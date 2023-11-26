import { token } from "morgan";
import User from "../models/user.model.js";
import AppError from "../utils/error.utill.js";


const cookieOPtions={
    maxAge: 7*24*60*60*1000,
    httpOnly:true,
    secure:true,
}

const register =  async (req,res,next)=>{


        const {fullName,email, password} = req.body;

        if(!fullName || !email || !password){
            return next( new AppError("All filed is required",400));
        }
        const userExists = await User.findOne({email});
        if(userExists){
            return next( new AppError("Email already Exists",400));
        }
        const user = await User.create({
            fullName,
            email,
            password,
            avater:
            {
                public_id:email,
                secure_url:"gdgdwdgwui"
            }
        });

        if(!user){
            return next(new AppError("User regisration faild,Please try again",400));

        }
        await User.save();

        user.password= undefined;

        const token = await user.generateJWToken();

        res.cookie('token',token,cookieOPtions);

        res.status(201).json({
            success:true,
            message: "User registered successfully",
            user,
        })

}

const login =  async (req,res,next)=>{
    try {
        const {email,password} = req.body;
    if(!email || !password){
        return next( new AppError("All filed is required",400));
    }

    const user = await User.findOne({
        email
    }).select('password');

    if(!user || !user.comparePassword(password)){
        return next(new AppError("Eamil pasword not mach",400));
    }

    const token = await user.generateJWToken();

    user.password= undefined;

    
    res.cookie('token',token,cookieOPtions);
    
    res.status(201).json({
        success:true,
        message: "User login  successfully",
        user,
    })
    } catch (e) {
        return next(new AppError(e.message,500));
    }
   
}

const logout =(req,res)=>{
    res.cookie('token',null,{
        secure:true,
        maxAge:0,
        httpOnly:true
    });
    res.status(200).json({
        success:true,
        message: "User logout   successfully",
        
    })


}

const getProfile = async (req,res,next)=>{
    try {
    const userId = req.user.id;
    const user = await User.findById(userId);

    res.status(200).json({
        success:true,
        message: "User details successfully",
        user,
    })
        
        
    } catch (error) {
        return next(new AppError("Failed to Facth the user details",500));
    }
    



}

export {
    register,
    login,logout,getProfile
}