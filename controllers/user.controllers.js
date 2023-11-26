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

const login =(req,res)=>{

}

const logout =(req,res)=>{

}

const getProfile =(req,res)=>{

}

export {
    register,
    login,logout,getProfile
}