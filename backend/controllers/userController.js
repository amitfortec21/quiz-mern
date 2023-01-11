import User from "../models/userSchema.js";
import bcrypt from 'bcrypt';
import jsonwebtoken from "jsonwebtoken";
const SECRET_KEY = "AMITSHARMA"

const loadLogin = async (req, res) => {
    try {
        res.render('login');
    } catch (error) {
        console.log(error.message);
    }
}

const signinUser = async (req, res) => {  
    // get data from client
    const { email, password } = req.body; 
    try {
        // 1. existing user check
        const existingUser = await User.findOne({email: email});
        if(!existingUser){
            return res.status(404).json({message: "User not found...!"});
        }

        // 2. match password
        const matchPassword = await bcrypt.compare(password, existingUser.password);
        if(!matchPassword){
            return res.status(400).json({message: "Invalid Credentials"});
        }

        // 3. verify token
        const token = jsonwebtoken.sign({ email: existingUser.email, id: existingUser._id }, SECRET_KEY);

        // 4. verify is_admin
        if(existingUser.is_admin !== 0){
            return res.status(400).json({message: "Invalid Credentials...!"});
        }

        const sessionId = req.sessionID;
        // req.session.sessionID = existingUser._id;
        
        res.status(201).json({ message:"User Logged in Successfully...!", user: existingUser, token: token, sessionId: sessionId});
        // res.render('home');

    } catch (error) {
        res.status(500).json({message: "Something went wrong...!"});
    }
}

const loadSignup = async (req, res) => {
    try {
        res.render('signup');
    } catch (error) {
        console.log(error.message);
    }
}

const signupUser = async (req, res) => {  
    // get data from client
    const {name, email, password, mobile} = req.body; 
    try {
        // 1. existing user check
        const existingUser = await User.findOne({email: email});
        if(existingUser){
            return res.status(400).json({message: "User already exists...!"})
        }

        // 2. convert plain password to hashed password
        const hashedPassword = await bcrypt.hash(password, 10);

        // 3. user creation: save user data to backend
        const createUser = await User.create({
            email: email,
            password: hashedPassword,
            name: name,
            mobile: mobile
        });

        // 4. token generate
        const token = jsonwebtoken.sign({ email: createUser.email, id: createUser._id }, SECRET_KEY);

        res.status(201).json({message: "User signed up successfully...!", user: createUser, token: token});

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
        res.render('login');
    } catch (error) {
        console.log(error.message);
}
}

export { loadLogin, signinUser, loadSignup, signupUser, loadDashboard, loadLogout }