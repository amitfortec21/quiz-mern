import express from "express";
import cors from "cors";
import router from "./router/route.js";
import userRouter from "./router/userRouter.js";
import adminRouter from "./router/adminRouter.js";

const app = express();

// define application port
const port = process.env.PORT || 7000;

// application middlewares
app.use(express.json());    // converts request body to json
app.use(cors());
app.use((req, res, next) => {
  console.log("HTTP Method - " + req.method + ", URL - " + req.url);
  next();
})

// import db connection file
import connect from "./database/conn.js";

// define routes
app.use("/api", router); // apis
app.use("/admin", adminRouter); //apis
app.use("/user", userRouter); //apis

app.get("/", (req, res) => {
  try {
    res.json("Welcome to the backend server!");
  } catch (error) {
    res.json(error);
  }
});

// start server only when we have valid connection
connect().then(() => {
  try {
    app.listen(port, () => {
      console.log(`Server is running on http://localhost:${port}`);
    });
  } catch (error) {
    console.log("Invalid Database Connection");
  }
});
