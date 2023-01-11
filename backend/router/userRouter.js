import express from "express";
const userRouter = express();

// import controllers
import { loadLogin, signinUser, loadSignup, signupUser, loadDashboard, loadLogout } from "../controllers/userController.js";

// import body-parser
import bodyParser from "body-parser";
userRouter.use(bodyParser.json());
userRouter.use(bodyParser.urlencoded({ extended: true }));

// import session
import session from "express-session";
const oneDay = 1000 * 60 * 60 * 24;
userRouter.use(session({ secret: "AMITSHARMA", resave: false, saveUninitialized: true, cookie: { maxAge: oneDay } }));

// import cookie-parser
import cookieParser from "cookie-parser";
userRouter.use(cookieParser());

// import middlewares
import { isUserLogin, isUserLogout } from "../middleware/auth.js";

// set template engine
userRouter.set("view engine", "ejs");
userRouter.set("views", "./views/user/");

userRouter.get("/", loadLogin);
userRouter.post("/", isUserLogout, signinUser);
userRouter.get("/signup", loadSignup);
userRouter.post("/signup", signupUser);
userRouter.get("/home", isUserLogin, loadDashboard);
userRouter.get("/logout", isUserLogin, loadLogout);
userRouter.get("*", loadLogin);

export default userRouter;