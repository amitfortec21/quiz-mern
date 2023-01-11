import express from "express";
const adminRouter = express();

// import controllers
import { loadLogin, verifyLogin, loadDashboard, loadLogout } from "../controllers/adminController.js";

// import body-parser
import bodyParser from "body-parser";
adminRouter.use(bodyParser.json());
adminRouter.use(bodyParser.urlencoded({ extended: true }));

// import session
import session from "express-session";
const oneDay = 1000 * 60 * 60 * 24;
adminRouter.use(session({ secret: "AMITSHARMA", resave: false, saveUninitialized: true, cookie: { maxAge: oneDay } }));

// import cookie-parser
import cookieParser from "cookie-parser";
adminRouter.use(cookieParser());

// import middlewares
import { isAdminLogin, isAdminLogout } from "../middleware/auth.js"

// set template engine
adminRouter.set("view engine", "ejs");
adminRouter.set("views", "./views/admin");

adminRouter.get("/", isAdminLogout, loadLogin);
adminRouter.post("/", verifyLogin);
adminRouter.get("/home", isAdminLogin, loadDashboard);
adminRouter.get("/logout", isAdminLogin, loadLogout)
adminRouter.get("*", loadLogin);

export default adminRouter;