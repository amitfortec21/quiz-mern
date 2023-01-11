import { mongoose } from "mongoose";

mongoose.set("strictQuery", false);

export default async function connect() {
    await mongoose.connect("mongodb://127.0.0.1:27017/quizapp")
    console.log("Database Connected")
}

// mongoose.connect("mongodb://127.0.0.1:27017/quizapp")
//   .then(() => {
//     console.log(`Database Connected`);
//   })
//   .catch(() => {
//     console.log(`Database Error: No Connection`);
//   });