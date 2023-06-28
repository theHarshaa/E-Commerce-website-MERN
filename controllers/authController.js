import { hashPassword, comparePassword } from "../helpers/authHelper.js";
import userModel from "../models/userModel.js"
import orderModel from "../models/orderModel.js"
import JWT  from "jsonwebtoken";

export const registertController = async (req,res) => {
    try {
        const {name,email,password,phone,address,answer} = req.body
        //validation
        if(!name){
            return res.send({message: 'Name is required'})
        }
        if(!email){
            return res.send({message: 'Email is required'})
        }
        if(!password){
            return res.send({message: 'Password is required'})
        }
        if(!phone){
            return res.send({message: 'Phone is required'})
        }
        if(!address){
            return res.send({message: 'Address is required'})
        }
        if(!answer){
            return res.send({message: 'Answer is required'})
        }
        //check user
        const existingUser = await userModel.findOne({email})
        //existing user
        if(existingUser){
            return res.status(200).send({
                success:false,
                message: 'Already Register please login',
            })
        }
        //register user
        const hashedPassword = await hashPassword(password)
        //save
        const user = await new userModel({name,email,phone,address,password:hashedPassword,answer}).save()
        
        res.status(201).send({
            success:true,
            message: 'User Register Successfully',
            user
        })

    } catch (error) {
        console.log(error)
        res.status(500).send({
            success:false,
            message:'Error in Registeration',
            error
        })
    }
};

//POST LOGIN
export const loginController = async (req,res) => {
    try {
        const {email, password} = req.body
        //validation
        if( !email || !password){
            return res.status(404).send({
                success:false,
                message: 'Invalid email or password'
            })
        }
        //check user
        const user = await userModel.findOne({email})
        if(!user){
            return res.status(404).send({
                success:false,
                message:'Email is not register'
            })
        }
        const match = await comparePassword(password,user.password)
        if(!match){
            return res.status(200).send({
                success:false,
                message:'Invalid Password'
            })
        }
        //token
        const token = await JWT.sign({_id:user._id}, process.env.JWT_SECRET, {
            expiresIn: "7d",
        });
        res.status(200).send({
            success:true,
            message:'Login successfully',
            user:{
                id: user._id,
                name:user.name,
                email:user.email,
                phone:user.phone,
                address:user.address,
                role:user.role
            },
            token,
        })
    } catch (error) {
        console.log(error);
        res.status(500).send({
            success:false,
            message:"Error in Login",
            error
        })
    }
}

//forgetPasswordController
export const forgetPasswordController = async (req,res) => {
    try {
        const {email,answer, newPassword} = req.body;
        if(!email){
            res.status(400).send({message:"Email is required"})
        }
        if(!answer){
            res.status(400).send({message:"Answer is required"})
        }
        if(!newPassword){
            res.status(400).send({message:"New Password is required"})
        }
        //check
        const user = await userModel.findOne({email,answer})
        //validation
        if(!user){
            return res.status(404).send({
                success: false,
                message: "Wrong Email/Answer"
            })
        }
        const hashed = await hashPassword(newPassword)
        await userModel.findByIdAndUpdate(user._id,{password:hashed})
        res.status(200).send({
            success:true,
            message: "Password Reset Successfully"
        })
    } catch (error) {
        console.log(error);
        res.status(500).send({
            success:false,
            message:"Something Went Wrong",
            error
        })
    }
}

//test controller
export const testController = (req, res) => {
    res.send('Protected route')
}

//update profile
export const updateProfileController = async (req,res) => {
    try {
        const {name,email,phone,password,address} = req.body
        const user = await userModel.findById(req.user._id)
        //password
        if(password && password.length < 6){
            return res.json({error: 'Password is required and 6 character long '})
        }
        const hashedPassword = password ? await hashPassword(password) : undefined
        const updatedUser = await userModel.findByIdAndUpdate(req.user._id, {
            name: name || user.name,
            password: hashedPassword || user.password,
            phone: phone || user.phone,
            address: address || user.address,
        }, {new: true})
        res.status(200).send({
            success: true,
            message: "Profile Updated Successfully",
            updatedUser
        })
    } catch (error) {
        console.log(error);
        res.status(400).send({
            success: false,
            message: "Error while Updating Profile",
            error
        })
    }
}

//orders
export const getMyOrderController = async (req,res) => {
    try {
        const orders = await orderModel.find({buyer:req.user._id}).populate("products","-image").populate("buyer","name")
        res.json(orders)
    } catch (error) {
        res.status(500).send({
            message: "Error while getting my Orders",
            success:false,
            error
        })
    }
}

//get all orders
export const getAllOrderController = async (req,res) => {
    try {
        const orders = await orderModel.find({}).populate("products","-image").populate("buyer","name").sort({createdAt: "-1"})        
        res.json(orders)
    } catch (error) {
        res.status(500).send({
            message: "Error while getting my Orders",
            success:false,
            error
        })
    }
}

//Order Status
export const orderStatusController = async (req,res) => {
    try {
        const { orderId } = req.params;
        const { status } = req.body;
        const orders = await orderModel.findByIdAndUpdate(orderId, {status}, {new:true})
        res.json(orders)
    } catch (error) {
        console.log(error)
        res.status(500).send({
            success:false,
            message: "Error while Updating Status",
            error
        })
    }
}