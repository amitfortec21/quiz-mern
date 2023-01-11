import User from "../models/userSchema.js";
import bcrypt from 'bcrypt';

const loadLogin = async (req, res) => {
    try {
        res.render('login');
    } catch (error) {
        console.log(error.message);
    }
}

const verifyLogin = async (req, res) => {
    try {
        // get data from client
        const { email, password } = req.body;

        // 1. existing user check
        const existingUser = await User.findOne({email: email})
        if(!existingUser){
            return res.status(404).json({message: "Invalid Credentials...!"});
        }

        // 2. match password
        const matchPassword = await bcrypt.compare(password, existingUser.password);
        if(!matchPassword){
            return res.status(400).json({message: "Invalid Credentials...!"});
        }

        // 3. verify is_admin
        if(existingUser.is_admin !== 1){
            return res.status(400).json({message: "Invalid Credentials...!"});
        }

        req.session.user_id = existingUser._id;
        res.status(201).json({ message: "Admin Logged in Successfully...!"});
        // res.render('home')

    } catch (error) {
        res.status(500).json({message: "Something went wrong...!"});
    }
}

const loadDashboard = async (req, res) => {
    try {
        res.render('home');
    } catch (error) {
        console.log(error.message);
}
}

const loadLogout = async (req, res) => {
    try {
        req.session.destroy(function(){
            console.log("Session destroyed")
        });
        res.render('/admin');
    } catch (error) {
        console.log(error.message);
}
}

export { loadLogin, verifyLogin, loadDashboard, loadLogout }