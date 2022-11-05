import bcrypt from "bcryptjs";
import jwt from "jsonwebtoken";

import UserModel from "../models/user.js"

const secret = 'MY_SUPER_DUPER_HIT_SECRET_KEY';

export const login = async (req, res) => {
    console.log("Login Called");
    const {email, password } = req.query;
    try {
        const userCheck = await UserModel.findOne({ email });
        if (!userCheck) return res.status(404).json({ message: "Incorrect Credentials!" });
        const passwordCheck = await bcrypt.compare(password, userCheck.password);
        if (!passwordCheck) return res.status(404).json({ message: "Incorrect Credentials!" });

        const token = jwt.sign({ email: userCheck.email, id: userCheck._id }, secret, { expiresIn: "2h" });

        console.log(userCheck.name + " Logged In Successfully!");
        // res.status(201).json({message: `${userCheck.name}`+" Logged In Successfully!"});
        res.status(200).json({ result: userCheck, token });

    } catch (error) {
        res.status(500).json({ message: "Internal Server Error!" });
        console.log(error);
    }
};

export const register = async (req, res) => {
    console.log("Register Called");
    const {name, email, password } = req.query;
    try {
        const userCheck = await UserModel.findOne({ email });
        if (userCheck) return res.status(400).json({ message: "Account with this email already exists!" });

        const hashedPassword = await bcrypt.hash(password, 12);
        const result = await UserModel.create({ name: `${name}`, email: email, password: hashedPassword });
        const token = jwt.sign( { email: result.email, id: result._id }, secret, { expiresIn: "2h" } );
        
        console.log("User Registered Successfully!");
        // res.status(201).json({message: "User Registered Successfully!"});
        res.status(201).json({ result, token });
    } catch (error) {
        res.status(500).json({ message: "Internal Server Error!" });
        console.log(error);
    }
    
};