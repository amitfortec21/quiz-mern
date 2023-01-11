import jsonwebtoken from "jsonwebtoken";
const SECRET_KEY = "AMITSHARMA";

// jwt auth (temporary: not using in this project)
const auth = async (req, res, next) => {
    try {
        let token = req.headers.authorization;
        if(token){
            token = token.split(" ")[1];
            let user = jsonwebtoken.verify(token, SECRET_KEY)      // token verify 
            req.userId = user.id;
        }
        else{
            return res.status(401).json({ message: "Unauthorized User...!"})
        }
        next();
    } catch (error) {
        console.log(error.message)
        res.status(401).json({ message: "Unauthorized User...!"})
    }
}

const isAdminLogin = async (req, res, next) => {
    try {
        if(req.sessionID){
            return res.redirect('/admin');
        }
        next();
    } catch (error) {
        console.log(error.message)
    }
}

const isAdminLogout = async (req, res, next) => {
    try {
        if(!req.sessionID){
            return res.redirect('/admin/');
        }
        next();
    } catch (error) {
        console.log(error.message)
    }
}

const isUserLogin = async (req, res, next) => {
    try {
        if(req.sessionID){
            return res.redirect('/user');
        }
        next();
    } catch (error) {
        console.log(error.message)
    }
}

const isUserLogout = async (req, res, next) => {
    try {
        if(!req.sessionID){
            return res.redirect('/user/home');
        }
        next();
    } catch (error) {
        console.log(error.message)
    }
}

export { auth, isAdminLogin, isAdminLogout, isUserLogin, isUserLogout }